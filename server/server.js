import express from 'express';
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import { generateRandomID, sortUsers } from './functions.js';
import { ROOMS, USERS } from './data.js';

dotenv.config()
const frontend_url = process.env.FRONTEND_URL
const app = express();
app.use(cors({
    origin: [frontend_url],
    credentials: true
}))

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [frontend_url],
        credentials: true
    }
})

const port = process.env.PORT || 5555

io.on('connection', (socket) => {
    console.log('client is connected');

    socket.on('GenerateNewRoomID', () => {
        const roomid = generateRandomID();
        io.to(socket.id).emit('takeID', roomid);
    });

    socket.on('CreateNewRoom', (data) => {
        try {
            const userid = generateRandomID();
            USERS[userid] = {
                name: data.username,
                roomId: data.roomID,
                socketID: socket.id,
                win: false,
                color: data.clr,
                unique_id: data.clr === 'red' ? 'A' : data.clr === 'green' ? 'B' : data.clr === 'yellow' ? 'C' : 'D'
            }

            const player_names = [data.username];
            for (let i = 1; i < data.maxplayer; i++) {
                player_names.push(NaN);
            }

            ROOMS[data.roomID] = {
                createdBy: data.username,
                createdAt: Date.now(),
                maxPlayer: data.maxplayer,
                isMatchStarted: false,
                turnIndex: 0,
                diceValue: null,
                players: [
                    { userid: userid, name: data.username, position: [10, 0, 20, 0], clr: data.clr, disableDice: true }
                ],
                player_names,
                colors: [data.clr]
            }
            io.to(socket.id).emit('RoomCreated');
            console.table(USERS);
        } catch (error) {
            console.error(error.message);
        }
    });

    socket.on('JoinUser', (data) => {
        try {
            if (!ROOMS[data.roomID] || ROOMS[data.roomID].isMatchStarted) {
                io.to(socket.id).emit('RoomNotAvailabel');
                return;
            }
            if (ROOMS[data.roomID].player_names.includes(data.username)) {
                io.to(socket.id).emit('NamePresent');
                return;
            }
            const userid = generateRandomID();
            USERS[userid] = {
                name: data.username,
                roomId: data.roomID,
                socketID: socket.id,
                win: false,
                color: data.clr,
                unique_id: data.clr === 'red' ? 'A' : data.clr === 'green' ? 'B' : data.clr === 'yellow' ? 'C' : 'D'
            }
            console.table(USERS);
            ROOMS[data.roomID].colors.push(data.clr);
            ROOMS[data.roomID].players.push({ userid, name: data.username, position: [13, 20, 1, 3], clr: data.clr, disableDice: true });
            ROOMS[data.roomID].player_names[ROOMS[data.roomID].player_names.findIndex(x => Number.isNaN(x))] = data.username;
            if (!ROOMS[data.roomID].player_names.includes(NaN)) {
                ROOMS[data.roomID].isMatchStarted = true;
                sortUsers(data);
            }
            ROOMS[data.roomID].players.map((pla) => {
                io.to(USERS[pla.userid].socketID).emit('UserJoined', { data: ROOMS[data.roomID].player_names, isMatchStarted: ROOMS[data.roomID].isMatchStarted });
            });
            io.to(socket.id).emit('Joined', { isMatchStarted: ROOMS[data.roomID].isMatchStarted, maxplayer: ROOMS[data.roomID].maxPlayer });
        } catch (error) {
            console.error(error.message)
        }
    });

    socket.on('DiceRolled', (data) => {
        try {
            ROOMS[data.roomID].players.forEach((pla) => {
                if (USERS[pla.userid].socketID !== socket.id) {
                    console.log('dice sended to = ', USERS[pla.userid].socketID);
                    console.table(USERS);
                    io.to(USERS[pla.userid].socketID).emit('DiceRolled', { data });
                }
            })
        } catch (error) {
            console.error(error.message)
        }
    })

    socket.on('GetPlayersStatus', (data) => {
        try {
            if (!ROOMS[data.roomID]) {
                io.to(socket.id).emit('GoToHome');
                return;
            }
            io.to(socket.id).emit('TakePlayersStatus', { data: ROOMS[data.roomID].player_names, isMatchStarted: ROOMS[data.roomID].isMatchStarted });
        } catch (error) {
            console.error(error.message);
        }
    })

    socket.on('GetClr', (data) => {
        try {
            if (!ROOMS[data.roomID] || ROOMS[data.roomID].isMatchStarted) {
                io.to(socket.id).emit('GoToHome');
            } else {
                let clr = [];
                if (ROOMS[data.roomID].maxPlayer === 2) {
                    const userColor = USERS[ROOMS[data.roomID].players[0].userid].color;
                    clr.push(userColor === 'red' ? 'yellow' : userColor === 'green' ? 'blue' : userColor === 'yellow' ? 'red' : userColor === 'blue' ? 'green' : '');
                } else {
                    clr = ['red', 'green', 'blue', 'yellow'];
                    ROOMS[data.roomID].players.map((id) => {
                        const ind = clr.indexOf(USERS[id.userid].color);
                        clr[ind] = '';
                    })
                    clr = clr.filter(col => col !== '');
                }
                io.to(socket.id).emit('TakeClr', clr);
            }
        } catch (error) {
            console.error(error.message);
        }
    });

    socket.on('GetGameStatus', (data) => {
        try {

            if (!ROOMS[data.roomID]) {
                io.to(socket.id).emit('GoToHome');
                return;
            }
            io.to(socket.id).emit('TakeGameStatus', {
                color: ROOMS[data.roomID].color,
                turnIndex: ROOMS[data.roomID].turnIndex,
                players_info: ROOMS[data.roomID].players
            });
        } catch (error) {
            console.error(error.message);
        }
    })

    socket.on('ChangeSocketID', (data) => {
        try {
            if (!ROOMS[data.roomID]) {
                io.to(socket.id).emit('GoToHome');
                return;
            }
            const ind = ROOMS[data.roomID].players.findIndex(p => p.name === data.username);
            USERS[ROOMS[data.roomID].players[ind].userid].socketID = socket.id;
        } catch (error) {
            console.error(error.message);
        }
    })

})

setInterval(()=>{
    console.table(USERS);
},5000)

server.listen(port, '0.0.0.0', () => {
    console.log(`server started on Port ${port}`);
})