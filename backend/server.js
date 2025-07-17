const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const ip = require('ip');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let queue = [];
let current = null;

// Get server IP address
const serverIP = ip.address();
const PORT = 3000;

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// HTTP endpoint to check server status
app.get('/', (req, res) => {
  res.json({
    status: 'Server is running',
    ip: serverIP,
    port: PORT,
    currentTicket: current,
    queueLength: queue.length,
    queue: queue
  });
});

// HTTP endpoint to get server info for clients
app.get('/server-info', (req, res) => {
  res.json({
    ip: serverIP,
    port: PORT
  });
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Initial sync
  socket.emit('queue-update', queue);
  socket.emit('current-ticket', current);

  socket.on('add-ticket', (ticket) => {
    console.log('Adding ticket:', ticket);
    if (typeof ticket === 'string' && ticket.trim()) {
      queue.push(ticket.trim());
      io.emit('queue-update', queue);
    }
  });

  socket.on('call-next', () => {
    console.log('Calling next ticket');
    current = queue.shift() || null;
    io.emit('current-ticket', current);
    io.emit('queue-update', queue);
  });

  socket.on('close-ticket', () => {
    console.log('Closing current ticket');
    current = null;
    io.emit('current-ticket', current);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
  Server running!
  Local: http://localhost:${PORT}
  Network: http://${serverIP}:${PORT}
  
  You can access the server info at:
  http://${serverIP}:${PORT}/server-info
  `);
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  io.close(() => {
    console.log('Socket.IO server closed');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });
});