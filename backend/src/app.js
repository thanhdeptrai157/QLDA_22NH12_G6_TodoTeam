const express = require('express');
const app = express();
const PORT = 3000;

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
