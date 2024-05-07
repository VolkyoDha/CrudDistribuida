const { name } = require('ejs');
const mongoose=require('mongoose');
const { emit } = require('nodemon');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true, 
        required:true
    },
    email:{
        type:String,
        required:true, 
        required:true
    },
    phone:{
        type:String,
        required:true, 
        required:true
    },
    Image:{
        type:String,
        required:true,  
        required:true
    },
    created:{
        type:Date,
        required:true,
        default:Date.now
    }
});

module.exports=mongoose.model('User',userSchema);