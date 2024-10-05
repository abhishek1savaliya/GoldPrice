const express = require('express');
const http = require('http'); 
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['*'],
  },
});

let goldPrice = 78025.00; // Initial gold price

const updateGoldPrice = () => {
  const change = (Math.random() - 0.5) * 10; // Simulate gold price fluctuations
  goldPrice = +(goldPrice + change).toFixed(2);
  return goldPrice;
};


setInterval(() => {
  const newPrice = updateGoldPrice();
  io.emit('goldPriceUpdate', { price: newPrice, timestamp: new Date() });
  console.log(`Broadcasted new gold price: $${newPrice}`);
}, 1000);

io.on('connection', (socket) => {

  socket.emit('goldPriceUpdate', { price: goldPrice, timestamp: new Date() });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});