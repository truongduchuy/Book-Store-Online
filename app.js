const express = require('express');
const path = require('path');
require('./db/mongoose');
require('./config/cloudinary');
const userRouter = require('./routes/user');
const genreRouter = require('./routes/genre');
const bookRouter = require('./routes/book');
const customerRouter = require('./routes/customer');
const reviewRouter = require('./routes/review');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/test', (req, res) => {
  res.send({ data: 'mock data' });
});

app.use('/api', userRouter);
app.use('/api/genres', genreRouter);
app.use('/api/books', bookRouter);
app.use('/api/customers', customerRouter);
app.use('/api/reviews', reviewRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  console.log(path.join(__dirname, 'client', 'build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// const transporter = require('./config/transporter');
// const Email = require('email-templates');

// const email = new Email({
//   views: {
//     options: {
//       extension: 'ejs', // <---- HERE
//     },
//   },
// });

// email
//   .render(path.join(__dirname, '/views/mailTemplate2'), {
//     appName: 'Huy tru Store',
//     recipientName: 'Toan',
//     body: 'some text',
//     subject: 'Thanks',
//     cart: [
//       {
//         title: 'The Alchemist',
//         price: 15,
//         quantity: 2,
//         subtotal: 30,
//       },
//     ],
//   })
//   .then(html =>
//     transporter.sendMail(
//       {
//         from: 'huy0935903718@gmail.com', // sender address
//         to: '16k4081030@hce.edu.vn', // list of receivers
//         subject: 'test4', // Subject line
//         html, // html body
//       },
//       (error, info) => {
//         if (error) {
//           return console.log(error);
//         }
//         console.log('sent message successul!');
//       },
//     ),
//   )
//   .catch(console.error);

// start server
const port = process.env.PORT || '3001';

app.listen(port, () => console.log(`server is running on port ${port}`));
