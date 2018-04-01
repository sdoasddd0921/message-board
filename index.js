const express = require('express');
const app = express();

app.use(express.static('app/build'));

app.get('*', (req, res) => {
  res.sendFile('app/build//index.html');
});

app.listen(3210);