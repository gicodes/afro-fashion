require('dotenv').config();

const cors = require('cors');
const express = require('express');
const apiRoutes = require('./api');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes); 

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
