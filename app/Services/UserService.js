const User = require('../Models/User').User;
module.exports = {
  
    upsert: (req, res ) => {
        
        // confirm that user typed same password twice
        if (req.body.password !== req.body.passwordConfirm) {

            return false;
        }else{
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            });        
            newUser.save().then(user => {
                return true;
            });
        }
    }  
};
