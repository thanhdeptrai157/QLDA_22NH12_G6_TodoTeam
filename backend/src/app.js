const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes')


// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
