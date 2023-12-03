const mongoose=require('mongoose')

const mongodb="mongodb+srv://harshi:harshi@cluster0.f0kxlzu.mongodb.net/?retryWrites=true&w=majority";
const connection=async()=>{
    try{
        const con=await mongoose.connect(mongodb,)
        console.log("Connected db");
    }catch(err){
        console.log(err);
    }
}
module.exports=connection;
