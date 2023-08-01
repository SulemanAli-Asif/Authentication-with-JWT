const mongoose=require('mongoose');
const {isEmail}=require('validator')
const bcrypt=require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please enter an email"],
        unique:true,
        lowercase:true,
        validate:[//(val)=>{  } this is one approach that you can validate the value through a function
        isEmail,"Please enter a valid email"]//val is the value of email passed through the body
    },
    password:{
        type:String,
        required:[true,"Please enter Password"],
        minlength:[6,'Minimum password length less than 8 characters']
    },
})

//fire a function before doc saved to db
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt);
    next();
})

//static method to login a user

userSchema.statics.login = async function(email,password){
    const user=await this.findOne({email});

    if(user)
    {
      const auth =  await bcrypt.compare(password,user.password);
      if(auth){
        return user;
      }
      throw Error('Incorrect Password')
    }
    throw Error('Incorrect Email')

}

const User=mongoose.model("user",userSchema)//the first is the collection name is always singular wheter you type a plural or not
module.exports=User;