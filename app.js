const express = require('express');
const path = require('path');

const app = express();

app.get('/api/test', (req, res) => {
    res.send({data: "mock data"})
});

app.use(express.static(path.join(__dirname, 'client', 'build')));
console.log(path.join(__dirname, 'client', 'build'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// start server
const port = process.env.PORT || '3001';

app.listen(port, () =>
  console.log(`server is running on port ${port}`),
);