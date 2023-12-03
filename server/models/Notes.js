const mongoose=require('mongoose');

const schema2=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tags:{
        type:String,
        default:"General",
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const notes=mongoose.model('notes',schema2);
module.exports=notes;