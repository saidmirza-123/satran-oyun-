const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Dosyalarımızı "public" klasöründen sunacağız

io.on('connection', (socket) => {
    console.log('Bir oyuncu bağlandı:', socket.id);

    // Bir odaya katılma
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`Oyuncu ${socket.id}, ${roomId} odasına girdi.`);
    });

    // Hamle yapıldığında diğer oyuncuya gönder
    socket.on('move', (data) => {
        // data: { roomId: 'oda1', move: 'e2e4' }
        socket.to(data.roomId).emit('move', data.move);
    });
});

server.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor: http://localhost:3000');
});