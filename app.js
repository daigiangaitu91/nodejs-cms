
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const {selectOption} = require('./config/customConfig');
const app = express();

/* Routes */
const frontendRoutes = require('./routes/frontendRouter');

/* Setup View Engine To Use Handlebars */
app.engine('handlebars', hbs({defaultLayout: 'frontend', helpers: {select: selectOption}}));

app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine' , 'handlebars');

app.use('/', frontendRoutes);


/* Start The Server */
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
