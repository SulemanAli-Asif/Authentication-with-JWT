const mongoose=require('mongoose');

const connectDB=async()=>{
  await mongoose.connect(process.env.MONGO_URI, {
     useNewUrlParser: true,
      useUnifiedTopology: true,
       useCreateIndex:true
     })
     .then(()=>{
        console.log("Connection to the database Successfull")
     })
     .catch(err=>{
        console.log(err);
     })
}
module.exports=connectDB