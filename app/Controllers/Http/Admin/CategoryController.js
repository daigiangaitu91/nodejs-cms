const categoryService = require('../../../Services/CategoryService');
const Category = require('../../../Models/Category').Category;

module.exports = {


    /* ADMIN POSTS ENDPOINTS */

    index: async (req, res) => {
        Category.find()            
            .then(categories => {
                res.render('admin/category/index', {categories: categories});
            });      
    },

    create: async (req, res) => {
        if (req.method == 'POST') {            
            if(categoryService.upsert(req, '')){
                res.redirect('/');
            }
        }
            Category.find()            
            .then(categories => {
                res.render('admin/category/index', {categories: categories});
            }); 
        
    },

    edit: (req, res) => {
        const id = req.params.id;
        if (req.method == 'POST') {            
            if(categoryService.upsert(req, id)){
                res.redirect('/');
            }
        }
        Category.findById(id)
            .then(category => {
                res.render('admin/category/edit', {category: category});
            })
    },

    delete: (req, res) => {

        Category.findByIdAndDelete(req.params.id)
            .then(deletedCategory => {
                req.flash('success-message', `The post ${deletedCategory.title} has been deleted.`);
                res.redirect('/admin/category');
            });
    },
};    
    
