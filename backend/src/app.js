const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes')


// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
