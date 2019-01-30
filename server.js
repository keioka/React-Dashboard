const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist'));

const server = app.listen('3000', () => {
  console.log("Listening port 3000")
})
