const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/authMiddleware');
const { authorizeRoles } = require('./middleware/roleMiddleware');
const businessRoutes = require('./routes/businessRoutes');
const financialRoutes = require('./routes/financialRoutes');
const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');
const http = require('http');
const { Server } = require('socket.io');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // In production, limit this
    methods: ["GET", "POST"]
  }
});
// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected: ' + socket.id);

  socket.on('join', (userId) => {
    socket.join(userId); // Join a room for that user
  });

  socket.on('sendMessage', (data) => {
    const { receiverId, messageData } = data;
    io.to(receiverId).emit('receiveMessage', messageData); // Send to receiver
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(5000, () => console.log('Server with WebSocket running on port 5000'));
app.use(cors());
app.use(express.json());
app.use('/api/financials', financialRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/products', productRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api', userRoutes); 
// Dummy RBAC test routes
app.get('/api/business-only', protect, authorizeRoles('business'), (req, res) => {
  res.json({ message: 'Hello Business, you are authorized!' });
});

app.get('/api/user-only', protect, authorizeRoles('user'), (req, res) => {
  res.json({ message: 'Hello General User, you are authorized!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
