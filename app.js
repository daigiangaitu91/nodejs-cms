
const {PORT} = require('./config/globalVariables');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const {mongoDbUrl} = require('./config/database');
const flash = require('connect-flash');
const session = require('express-session');
const {selectOption} = require('./config/customConfig');
const app = express();


// Configure Mongoose to Connect to MongoDB
mongoose.connect(mongoDbUrl, { useNewUrlParser: true })
    .then(response => {
        console.log("MongoDB Connected Successfully.");
    }).catch(err => {
        console.log("Database connection failed.");
});

/* Setup View Engine To Use Handlebars */
app.engine('handlebars', hbs({defaultLayout: 'frontend', helpers: {select: selectOption}}));
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine' , 'handlebars');

/*  Flash and Session*/
app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}));


//app.use(globalVariables);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* Routes */
const frontendRoutes = require('./routes/frontendRouter');
app.use('/', frontendRoutes);


/* Start The Server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
