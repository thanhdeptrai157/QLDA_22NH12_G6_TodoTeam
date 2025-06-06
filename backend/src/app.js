const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true 
}));

const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routers')
const postRoutes = require('./routes/post.routes')
const placeRoutes = require('./routes/place.routers')
const searchRoutes = require('./routes/search.routes');
const commentRoutes = require('./routes/comment.routes');
const likeRoutes = require('./routes/like.routes');
// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/categories', categoryRoutes);
app.use('/places', placeRoutes);
app.use('/search', searchRoutes);
app.use('/comments', commentRoutes);
app.use('/likes', likeRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
