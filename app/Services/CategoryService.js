const Category = require('../Models/Category').Category;
const {isEmpty} = require('../../config/customConfig');
module.exports = {
  
    lists: (req, res) => {
        return new Promise(function(resolve, reject){
            resolve(Category.find());
        })        
           
    },
    upsert: (req, id ) => {
        return new Promise(function(resolve, reject){
            // confirm that user typed same password twice
            if (!isEmpty(id)) {
                const id = req.params.id;

                Category.findById(id)
                    .then(category => {
                        category.title = req.body.title;
                        resolve(category.save().then(updateCategory => {
                            return true;
                        }));
                    });
                resolve(false);    
            }else{
                // Check for any input file
            
                const newCategory = new Category({
                    title: req.body.title,                
                });

                resolve(newCategory.save().then(category => {      
                    console.log(category);              
                    return true;
                }));
            }
        });
    }
};
