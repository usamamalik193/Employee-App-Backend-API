const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const userSchema= new Schema({
    firstName: String,
    lastName: String,
    city: String,
    roles: {
        Admin: Number,
        Employee: Number,
        Editor: Number,
        User: Number
    
    },
    password: String,
    refreshToken: String
})
module.exports= mongoose.model('User',userSchema)