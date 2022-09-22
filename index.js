require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const connectDB = require("./config/dbConn");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const http = require("http");
const {Server} = require("socket.io");
const chat = require('./models/chat');


//Connect to MongoDB
connectDB();

app.use(cookieParser());

app.use(express.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3006", "http://localhost:8080");
  next();
});


const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3006",
      meathods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", async(data)=>{

        try{
          let result= await chat.find({"room":data});
          
          socket.join(data);
         //console.log(data);
         // console.log(result);
        
          await socket.emit("joined", result);
        }catch (e){
          console.error(e);
        }
        // socket.join(data);
        console.log(`User with id: ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message", (data)=>{
      chat.create({
        room: data.room,
        author: data.author, 
        message: data.message, 
        time: data.time });
      console.log(data);
      socket.to(data.room).emit("receive_message", data)
    })
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });

  server.listen(8080);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/navBarData", require("./routes/navBar"));
app.use("/chat", require("./routes/chat"));
app.use(verifyJWT);
app.use("/employee", require("./routes/api/employeeRoutes"));
app.use("/users", require("./routes/api/usersRoutes"));



mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () =>
    console.log(`app listening at http://localhost:${port}`)
  );
});
