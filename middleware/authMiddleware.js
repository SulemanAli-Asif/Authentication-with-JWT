const jwt=require('jsonwebtoken');
const User = require('../model/schema');

const requireAuth=(req,res,next)=>{

    const token=req.cookies.jwt;

    //checking if jwt exists
    if(token){
        jwt.verify(token, 'this is my secret',(err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login')
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }

}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'this is my secret', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };
  

module.exports={requireAuth,checkUser};
