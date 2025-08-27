const mongoose = require("mongoose");

const {Schema} = mongoose;

const tweetSchema = new Schema({
    description:{
        type:String,
        require:true
    },
    like:{
        type:Array,
        default:[]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    comment:{
        type:Array,
        default:[]
    },
    userDetails:{
        type:Array,
        default:[]
    },
},{timestamps:true});

const TweetModel = mongoose.model("tweets",tweetSchema);
module.exports = TweetModel;