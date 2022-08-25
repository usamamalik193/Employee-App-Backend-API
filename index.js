require('dotenv').config();
const express = require("express");
const https = require("https");
const mongoose = require('mongoose');
const fs = require("fs");
const app = express();
const port = 3000;
const cors = require("cors");
const corsOptions = require('./config/corsOption')
const connectDB = require('./config/dbConn');
const verifyJWT= require('./middleware/verifyJWT');
const cookieParser= require('cookie-parser');

//Connect to MongoDB
connectDB();

app.use(cookieParser());

// app.use(express.static('uploads'))
const path = require("path"); 
app.use("/uploads", express.static(path.join("employee/uploads")));  
//console.log(express.static(path.join("employee-api/uploads")))

app.use(express.json())
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  next();
});



app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
//app.use(verifyJWT);
app.use('/employee', require('./routes/api/employeeRoutes'))

// app.post("/employee", upload.single('picture'), (req,res) =>{

//   let payload = {};
//   payload["body"] = req.body;
//   payload["file"] = req.file;

//   // data.setEmployees([...data.employees, payload]);
//   // res.send(payload)
//   //   res.status(201).json(data.employees);
//   console.log({__dirname})
//   fs.readFile(`${__dirname}\\models\\employee.json`, function (err, data) {
//     console.log({data});
//     var json = JSON.parse(data);

//     json.data.push(payload);
   
//     fs.writeFile(
//       `${__dirname}\\models\employee.json`,
//       JSON.stringify(json, null, 2),
//       function (err, data) {
//         console.log(`data is written at:` + hh + "h:", mm + "m:", ss + "s");
//       }
//     );
//     res.send(payload);
//   });

// })

mongoose.connection.once('open',()=>{
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`app listening at http://localhost:${port}`));
})
