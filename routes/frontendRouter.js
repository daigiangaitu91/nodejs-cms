const express = require('express');
const router = express.Router();
const siteController = require('../app/Controllers/Http/SiteController');
const postController = require('../app/Controllers/Http/PostController');


router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'frontend';

    next();
})

router.route('/')
    .get(siteController.index);

router.route('/post/:id')
    .get(postController.getSinglePost)    

router.route('/register')
    .get(siteController.register);

router.route('/register')
    .post(siteController.register);    

module.exports = router;
