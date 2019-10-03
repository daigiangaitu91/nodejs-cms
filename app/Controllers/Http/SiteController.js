const userService = require('../../Services/UserService');

module.exports = {
  
    index:  async (req, res) => {        
        res.render('site/index');
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