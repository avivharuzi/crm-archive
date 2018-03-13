const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ds113019.mlab.com:13019/crm`);

const AuthHandler = require('./handlers/auth.handler');

const authRoute = require('./routes/auth.route');
const companyRoute = require('./routes/campany.route');
const countriesRoute = require('./routes/countries.route');
const recipeRoute = require('./routes/recipe.route');

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(fileUpload());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/', authRoute);
app.use('/api/countries', countriesRoute);
app.use('/api', AuthHandler.authenticate);
app.use('/api/company', companyRoute);
app.use('/api/recipe', recipeRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = app;
