const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const articleRoutes = require('./routes/article');
app.use('/', articleRoutes);

app.listen(3025, () => {
  console.log('Server is running on http://localhost:3025');
});