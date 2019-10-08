const express = require('express');
const router = express.Router();
const postController = require('../app/Controllers/Http/Admin/PostController');


router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'admin';

    next();
})

///// Post controller ///
router.route('/post')
    .get(postController.index);

router.route('/post/create')
    .get(postController.create);
    
router.route('/post/create')
    .post(postController.create);

router.route('/post/edit/:id')
    .get(postController.edit);

module.exports = router;
