const express = require('express');
const router = express.Router();
const postController = require('../app/Controllers/Http/Admin/PostController');
const categoryController = require('../app/Controllers/Http/Admin/CategoryController');


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

router.route('/post/edit/:id')
    .post(postController.edit);

router.route('/post/delete/:id')
    .post(postController.delete);

///// Categort controller ///
router.route('/category')
    .get(categoryController.index);

router.route('/category/create')
    .get(categoryController.create);
    
router.route('/category/create')
    .post(categoryController.create);

router.route('/category/edit/:id')
    .get(categoryController.edit);

router.route('/category/edit/:id')
    .post(categoryController.edit);

router.route('/category/delete/:id')
    .post(categoryController.delete);

module.exports = router;
