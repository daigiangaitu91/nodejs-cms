const categoryService = require('../../../Services/CategoryService');
const Category = require('../../../Models/Category').Category;

module.exports = {


    /* ADMIN POSTS ENDPOINTS */

    index: async (req, res) => {
        categoryService.lists(req,res).then(function(result){
                res.render('admin/category/index', {categories: result});
            });      
    },

    create: async (req, res) => {
        if (req.method == 'POST') { 

            let result = await categoryService.upsert(req, '').then(function(result){          
                return result;
            });

            if(result){
                res.redirect('/admin/category');
                return;
            }
        }
        res.render('admin/category/create', {category: ''});
        
    },

    edit: async (req, res) => {
        const id = req.params.id;
        if (req.method == 'POST') {        

            let result = await categoryService.upsert(req, id).then(function(result){          
                return result;
            });

            if(result){
                res.redirect('/admin/category/edit/'+id);
                return;
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
                res.redirect('/admin/category');
            });
    },
};    
    
