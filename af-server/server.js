require('dotenv').config();

const cors = require('cors');
const express = require('express');

const route4 = require('./api/send-congratulatory-email');
const route5 = require('./api/send-password-changed-alert');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(route4); 
app.use(route5);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
