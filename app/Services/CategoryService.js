const Category = require('../Models/Category').Category;
const {isEmpty} = require('../../config/customConfig');
module.exports = {
  
    lists: (req, res) => {
        return Category.find();            
           
    },
    upsert: (req, id ) => {
        
        // confirm that user typed same password twice
        if (!isEmpty(id)) {
            const id = req.params.id;

            Category.findById(id)
                .then(category => {
                    category.title = req.body.title;
                    category.save().then(updateCategory => { return true });
                });
        }else{
            // Check for any input file
        
            const newCategory = new Category({
                title: req.body.title,                
            });

            newCategory.save().then(category => {
                return true;
            });
        }
    }
};
