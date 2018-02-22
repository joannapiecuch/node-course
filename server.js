const express = require('express');
const hbs = require('hbs');
const fs = require ('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

app.use((req, res, next) => {
    res.render('maintance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'HomePage',
        welcomeMessage: 'Welcome to my website',
    })
});

app.get('/about', (req,res) => {
   res.render('about.hbs', {
       pageTitle: 'About page',
   });
});


app.get('/bad', (req, res) => {
    res.send({
       errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
