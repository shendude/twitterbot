const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname + '/../' + 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../' + 'public/index.html'))
})

app.listen(port, err => {
  if (err) {
    console.log('error: ', err);
  }
  console.log(`listening on port: ${port}`);
});