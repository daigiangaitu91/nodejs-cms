const Category = require('../../Models/Category').Category;
const Post = require('../../Models/Post').Post;

module.exports = {

    getSinglePost: (req, res) => {
        const id = req.params.id;

        Post.findById(id)
            .populate({path: 'comments', populate: {path: 'user', model: 'user'}})
            .then(post => {
            if (!post) {
                res.status(404).json({message: 'No Post Found'});
            }
            else {
                res.render('post/singlePost', {post: post, comments: post.comments});
            }
        })
    },
};    
    
