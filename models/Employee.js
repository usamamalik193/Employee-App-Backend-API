const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const employeeSchema= new Schema({
    body:{    
    "employeeName": String,
        "employeeAddress": String,
        "employeeStatus": String,
        "gender": String,
        "empPhone": Number,
        "picture" : String
    },
    // file:{
    //     "fieldname": String,
    //     "originalname": String,
    //     "encoding": String,
    //     "mimetype": String,
    //     "destination": String,
    //     "filename": String,
    //     "path": String,
    //     "size": Number
    // }
})
module.exports= mongoose.model('Employee', employeeSchema)