const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('app/build'));

app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(
      __dirname,
      'app/build//index.html'
    )
  );
});

app.listen(3210, (err) => {
  console.log('Listening at port: 3210');
  if (err) {
    console.log('Error hapened: ', err);
  }
});