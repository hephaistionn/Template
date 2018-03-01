const socketio = require('socket.io');

module.exports = function socket(serveur) {
    const io = socketio(serveur);

    io.on('connection', (socket) => {
        const room = socket.handshake.query.room;
        
        socket.join(room);

        socket.on('send', (message) => {
            socket.to(room).emit('receives', message);
        });
    });
};
