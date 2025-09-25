export const USERS = {
    "sx20568P": {
        name: "john",
        roomId: "zxBC0",
        socketID: "socket-123",
        win: false,
        color: 'r'
    }
}

export const ROOMS = {
    "zxBC0": {
        createdBy: "john",
        createdAt: Date.now(),
        maxPlayer: 4,
        isMatchStarted: false,
        turnIndex: 0,
        winStatus: [],
        diceValue: null,
        players: [
            { userid: "sx20568P", name: "john", win: false, position: [0, 0], score: 0 }
        ],
        colors: ['r', 'g', 'b', 'y']
    }
}