const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const sideBarDataSchema = new Schema({
    title: String,
    path: String,
    cName: String
})
module.exports= mongoose.model('sidebardata',sideBarDataSchema)