const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const chatSchema= new Schema({
     room: String,
     author: String, 
     message: String, 
     time: String 
})
module.exports= mongoose.model('chat',chatSchema)