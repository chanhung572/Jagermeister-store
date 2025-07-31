require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db'); 
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/products');
const authMiddleware = require('./middleware/auth');
const notificationRoutes = require('./routes/notification');

const app = express();
const PORT = process.env.PORT || 3000;

connection(); 

app.use(cors()); 
app.use(express.json());

app.use((req, res, next) => {
  const publicPaths = ['/api/auth', '/api/admin']; // Cho phép truy cập đăng nhập & đăng ký
  if (publicPaths.some(path => req.path.startsWith(path))) {
    return next();
  }
  authMiddleware(req, res, next);
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products',authMiddleware, productRoutes);
app.use('/api/notifications', notificationRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});