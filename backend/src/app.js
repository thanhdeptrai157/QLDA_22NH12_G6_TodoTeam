const express = require('express');
const app = express();
const PORT = 3000;
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(express.json());

app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
