const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const userSchema= new Schema({
    username: String,
    roles:{
        Employee: Number,
        Admin: Number 
    },
    password: String,
    refreshToken: String
})
module.exports= mongoose.model('User',userSchema)