const express = require('express');
const router = express.Router();
const siteController = require('../app/Controllers/Http/SiteController');


router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'frontend';

    next();
})

router.route('/')
    .get(siteController.index);

router.route('/register')
    .get(siteController.register);

router.route('/register')
    .post(siteController.register);    

module.exports = router;
