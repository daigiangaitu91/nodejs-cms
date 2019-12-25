const userService = require('../../Services/UserService');
const postService = require('../../Services/PostService');
const Post = require('../../Models/Post').Post;
const Category = require('../../Models/Category').Category;
module.exports = {
  
    index:  async (req, res) => {                
        const posts = await postService.lists(req, res);
        const categories = await Category.find();        
        res.render('site/index', {posts: posts,categories:categories});
    },

    register:  async (req, res) => {
        if(req.method == 'POST'){
			if(userService.upsert(req, res)){
				res.redirect('/');
			}
        }
        res.render('site/register');
    },
};