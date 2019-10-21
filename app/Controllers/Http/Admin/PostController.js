const postService = require('../../../Services/PostService');
const Category = require('../../../Models/Category').Category;
const Post = require('../../../Models/Post').Post;

module.exports = {


    /* ADMIN POSTS ENDPOINTS */

    index: async (req, res) => {
        postService.lists(req, res).then(function(result){            
            res.render('admin/post/index', {posts: result});
        });
    },

    create: async (req, res) => {
        if (req.method == 'POST') {            
            
            let result = await postService.upsert(req, '').then(function(result){          
                return result;
            });

            if(result){
                res.redirect('/admin/post');
                return;
            }
        }
        Category.find().then(cats => {
            res.render('admin/post/create', {categories: cats});
        });
        
    },

    edit: async (req, res) => {
        const id = req.params.id;

        if(req.method == 'POST'){
            
            let result = await postService.upsert(req, id).then(function(result){          
                return result;
            });

            if(result){
                res.redirect('/admin/post/edit/'+id);
                return;
            }
        }    
        Post.findById(id)
            .then(post => {
                Category.find().then(cats => {
                    res.render('admin/post/edit', {post: post, categories: cats});
                });
            })
    },

    delete: (req, res) => {

        Post.findByIdAndDelete(req.params.id)
            .then(deletedPost => {                
                res.redirect('/admin/posts');
            });
    },
};    
    
