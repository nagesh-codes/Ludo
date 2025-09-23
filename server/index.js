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
        const userid = generateRandomID();
        USERS[userid] = {
            name: data.username,
            roomId: data.roomID,
            socketID: socket.id,
            win: false,
            color: data.clr
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
            ]
        }
        console.table(USERS);
        console.table(ROOMS);
        io.to(socket.id).emit('RoomCreated');
    });

    socket.on('JoinUser', (data) => {
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
        console.table(ROOMS[data.roomID].players);
        ROOMS[data.roomID].players.map((pla)=>{
            io.to(USERS[pla.userid].socketID).emit('UserJoined',data.username);
        })
    })

    socket.on('GetStatus', (data) => {
        if (!ROOMS[data.roomid]) {
            io.to(socket.id).emit('GoToHome');
            return;
        }
    })

    socket.on('GetClr', (data) => {
        if (!ROOMS[data.roomID] || ROOMS[data.roomID].isMathStarted) {
            io.to(socket.id).emit('GoToHome');
        } else {
            const clr = [];
            ROOMS[data.roomID].players.map((pla) => {
                clr.push(USERS[pla.userid].color);
            })
        }
    })

})

server.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
})