

const handleMessage = (req, res) => {
    console.log("im live");
  res.send({ response: "Connection is Live" }).status(200);
  


};
module.exports = { handleMessage };
