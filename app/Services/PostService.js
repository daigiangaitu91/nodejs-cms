const Post = require('../Models/Post').Post;
const {isEmpty} = require('../../config/customConfig');
module.exports = {
  
    lists: (req, res) => {
        return new Promise(function(resolve, reject){
            resolve(Post.find().populate('category'));
        })
           
    },
    upsert: (req, id ) => {
        return new Promise(function(resolve, reject){
            // confirm that user typed same password twice
            if (!isEmpty(id)) {
                const id = req.params.id;

                Post.findById(id)
                    .then(post => {
                        post.title = req.body.title;
                        post.status = req.body.status;                    
                        post.description = req.body.description;
                        post.category = req.body.category;
                        resolve(post.save().then(updatePost => {
                            return true ;
                        }));
                        resolve(false);
                    });
            }else{
                // Check for any input file
                let filename = '';        
                if(!isEmpty(req.files)) {
                   let file = req.files.uploadedFile;
                   filename = Date.now() + file.name;
                   let uploadDir = './public/uploads/';            
                   file.mv(uploadDir+filename, (err) => {
                       if (err)
                           throw err;
                   });
                }

                const newPost = new Post({
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status,                
                    category: req.body.category,
                    file: `/uploads/${filename}`
                });

                resolve(newPost.save().then(post => {
                    return true ;
                }));
                resolve(false);
            }
        })
    }
};
