require('dotenv').config()
const express = require('express')
const winston = require('winston')
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')(app);
require('./startup/config')();


const port = process.env.PORT || 7000;
app.listen(port,()=>{winston.info(`listinng on port ${port}`)});
