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
const categoryRoutes = require('./routes/category.routers')
const postRoutes = require('./routes/post.routes')
const placeRoutes = require('./routes/place.routers')
const searchRoutes = require('./routes/search.routes')


// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/categories', categoryRoutes);
app.use('/places', placeRoutes);
app.use('/search', searchRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
