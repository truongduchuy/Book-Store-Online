const express = require('express');
const path = require('path');
require('./db/mongoose');
const userRouter = require('./routes/user');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/test', (req, res) => {
  res.send({ data: 'mock data' });
});

app.use('/api', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  console.log(path.join(__dirname, 'client', 'build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// start server
const port = process.env.PORT || '3001';

app.listen(port, () => console.log(`server is running on port ${port}`));
