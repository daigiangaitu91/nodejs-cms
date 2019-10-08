const postService = require('../../../Services/PostService');
const Category = require('../../../Models/Category').Category;
const Post = require('../../../Models/Post').Post;

module.exports = {


    /* ADMIN POSTS ENDPOINTS */

    index: async (req, res) => {
        Post.find()
            .populate('category')
            .then(posts => {
                res.render('admin/post/index', {posts: posts});
            });      
    },

    create: async (req, res) => {
        if (req.method == 'POST') {            
            if(postService.upsert(req, '')){
                res.redirect('/');
            }
        }
            Category.find().then(cats => {

                res.render('admin/post/create', {categories: cats});
            });
        
    },

    edit: (req, res) => {
        const id = req.params.id;

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
                req.flash('success-message', `The post ${deletedPost.title} has been deleted.`);
                res.redirect('/admin/posts');
            });
    },
};    
    
