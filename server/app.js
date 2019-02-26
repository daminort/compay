
const express       = require('express');
const path          = require('path');
const cors          = require('cors');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const opn           = require('opn');
const chalk         = require('chalk');

const config        = require('./config');
const routerMain    = require('./routes/main');
const routerDB      = require('./routes/db');
const routerService = require('./routes/service');
const routerRate    = require('./routes/rate');
const routerScale   = require('./routes/scale');
const routerCalc    = require('./routes/calculation');

// Variables --------------------------------------------------------------------------------------
const app       = express();
const port      = config.port;
const mongoPath = config.mongoPath;

// MongoDB ----------------------------------------------------------------------------------------
mongoose.connect(mongoPath, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Use --------------------------------------------------------------------------------------------
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

// Routes -----------------------------------------------------------------------------------------
app.use('/api/db', routerDB);
app.use('/api/service', routerService);
app.use('/api/rate', routerRate);
app.use('/api/scale', routerScale);
app.use('/api/calculation', routerCalc);
app.use('/', routerMain);

// Listening --------------------------------------------------------------------------------------
app.listen(port, () => {
  const link = `http://localhost:${port}`;
  console.clear();
  console.log(chalk.blue.bold('COMPAY') + chalk.green(' application succesfully started'));
  console.log('It will be opened in your favorite browser automatically');
  console.log('If not, you can navigate to ' + chalk.cyan.underline(link) + ' manually to get started');
  opn(link);
});
