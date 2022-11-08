const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
require('./server/database/connection')
const routes = require('./server/routes/router')
const axios = require('axios');

const port = process.env.Port || 3000;

app.use(morgan('tiny'));
app.use(bodyparser.urlencoded({ extended: true }));

// app.set('views', path.join(__dirname, 'views'));
const view_path = path.join(__dirname, '/templates/views');
const partials_path = path.join(__dirname, '/templates/partials');

hbs.handlebars.registerHelper('incremented', function (index) {
    index++;
    return index;
});

app.set('view engine', 'hbs');
app.set('views', view_path);
hbs.registerPartials(partials_path)

const cssPath = path.join(__dirname, '/assests');
const imgPath = path.join(__dirname, '/assests');
const jsPath = path.join(__dirname, '/assests');

app.use(express.static(cssPath));
app.use(express.static(imgPath));
app.use(express.static(jsPath));


//registering the router
app.use(routes);

app.listen(port, () => {
    console.log(`listening to port no ${port}`);
});