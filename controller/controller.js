const User=require('../model/schema')
const jwt=require('jsonwebtoken')
//handle errors
const errorHandler = (err) => {
    console.log(err.message, err.code);
    let error={email:'',password:''};

    //incorrect email
    if(err.message==='Incorrect Email'){
        error.email='That email is not registered';
    }
       //incorrect password
       if(err.message==='Incorrect Password'){
        error.password='That password is not incorrect';
    }

    //duplicate error
    if(err.code===11000)
    {
        error.email='That email is already registered'
    }

    //validation errors
    if(err.message.includes('user validation failed')){
        console.log(Object.values(err.errors).forEach(({properties})=>{
            error[properties.path]=properties.message;
        }))
    }
    return error
}
const maxAge=3*24*60*60;

const createToken = (id) => {
    return jwt.sign({id},'this is my secret',{
        expiresIn: maxAge
    });//(payload,secret,optionObject)
}

module.exports.signup_get = (req,res)=>{
    res.render('signup')
}

module.exports.signup_post = async (req,res)=>{
    const {email,password}=req.body;
    try{
       const user = await User.create({email,password})
       const token=createToken(user._id);
       res.cookie('jwt', token ,{httpOnly:true,maxAge:maxAge*1000});
       res.status(200).json({user:user._id});
    }

catch(err){
   const error= errorHandler(err);
   res.status(400).json({error})
    

}

}

module.exports.login_get = (req,res)=>{
    res.render('login')
}

module.exports.login_post = async (req,res)=>{
    const {email,password} = req.body;

try{

    const user = await User.login(email,password);
    const token=createToken(user._id);
    res.cookie('jwt', token ,{httpOnly:true,maxAge:maxAge*1000});
    res.status(200).send({user:user._id})

}
catch(err){

    const error=errorHandler(err); 
    res.status(400).json({error})

}
}

module.exports.logout_get=(req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/')
}
