const postService = require('../../../Services/PostService');
const Category = require('../../../Models/Category').Category;
const Post = require('../../../Models/Post').Post;

module.exports = {


    /* ADMIN POSTS ENDPOINTS */

    index: async (req, res) => {                
        res.render('admin/index');
    },

};    
    
