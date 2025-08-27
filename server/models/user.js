const mongoose = require("mongoose");

const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    bookmarks:{
        type:Array,
        default:[]  
    }
})
const userModel = mongoose.model("users",userSchema);
module.exports=userModel;
