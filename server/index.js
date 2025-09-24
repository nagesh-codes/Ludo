import express from 'express';
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import { generateRandomID } from './functions.js';
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
                color: data.clr
            }

            const player_names = [data.username];
            for (let i = 1; i < data.maxplayer; i++) {
                player_names.push(NaN);
            }

            ROOMS[data.roomID] = {
                createdBy: data.username,
                createdAt: Date.now(),
                maxPlayer: data.maxplayer,
                isMathStarted: false,
                turnIndex: 0,
                diceValue: null,
                players: [
                    { userid: userid, name: data.username, position: [0, 0, 0, 0] }
                ],
                player_names
            }
            console.table(USERS);
            console.table(ROOMS);
            io.to(socket.id).emit('RoomCreated');
        } catch (error) {
            console.error(error.message);
        }
    });

    socket.on('JoinUser', (data) => {
        try {
            if (!ROOMS[data.roomID] || ROOMS[data.roomID].isMathStarted) {
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
                color: data.clr
            }
            ROOMS[data.roomID].players.push({
                userid, name: data.username, position: [0, 0, 0, 0]
            });
            ROOMS[data.roomID].player_names[ROOMS[data.roomID].player_names.findIndex(x => Number.isNaN(x))] = data.username;
            console.table(ROOMS[data.roomID].players);
            if (!ROOMS[data.roomID].player_names.includes(NaN)) {
                ROOMS[data.roomID].isMathStarted = true;
            }
            ROOMS[data.roomID].players.map((pla) => {
                io.to(USERS[pla.userid].socketID).emit('UserJoined', { data: ROOMS[data.roomID].player_names, isMatchStarted: ROOMS[data.roomID].isMathStarted });
            });
            io.to(socket.id).emit('Joined', { isMatchStarted: ROOMS[data.roomID].isMathStarted, maxplayer: ROOMS[data.roomID].maxPlayer });
        } catch (error) {
            console.error(error.message)
        }
    })

    socket.on('GetStatus', (data) => {
        try {
            if (!ROOMS[data.roomid]) {
                io.to(socket.id).emit('GoToHome');
                return;
            }
            io.to(socket.id).emit('TakeStatus', { data: ROOMS[data.roomid].player_names });
        } catch (error) {
            console.log(error.message);
        }
    })

    socket.on('GetClr', (data) => {
        try {
            if (!ROOMS[data.roomID] || ROOMS[data.roomID].isMathStarted) {
                io.to(socket.id).emit('GoToHome');
            } else {
                let clr = [];
                if (ROOMS[data.roomID].maxPlayer === 2) {
                    const userColor = USERS[ROOMS[data.roomID].players[0].userid].color;
                    clr.push(userColor === 'r' ? 'y' : userColor === 'g' ? 'b' : userColor === 'y' ? 'r' : userColor === 'b' ? 'g' : '');
                } else {
                    clr = ['r', 'g', 'b', 'y'];
                    ROOMS[data.roomID].players.map((id) => {
                        const ind = clr.indexOf(USERS[id.userid].color);
                        clr[ind] = '';
                    })
                    clr = clr.filter(col => col !== '');
                }
                console.log(clr);
                io.to(socket.id).emit('TakeClr', clr);
            }
        } catch (error) {
            console.error(error.message);
        }
    })

})

server.listen(port, '0.0.0.0', () => {
    console.log(`server started on http://localhost:${port}`);
})