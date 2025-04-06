const express = require('express');
const app = express();
const PORT = 3000;
const { User } = require('./models')
app.get('/',async(req, res) => {
  const user = await User.findAll()
  res.send({
    'User': user
  }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
