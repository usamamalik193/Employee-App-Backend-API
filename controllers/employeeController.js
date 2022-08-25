const Employee= require('../models/Employee');
const fs = require("fs");

//For Json FILE Acsess 
// const data = {
//   employees: require("../models/employee.json"),
//   setEmployees: function (data) {
//     this.employees = data;
//   },
// };

const getAllEmployees = async (req, res) => {
  //res.json(data.employees);
  const employees=await Employee.find();
  if(!employees) return res.status(204).json({'message':'No employee Found.'});
  res.json(employees);

};

const createNewEmployee = async(req, res) => {

  let date_ob = new Date();
  let hh = date_ob.getHours();
  let mm = date_ob.getMinutes();
  let ss = date_ob.getSeconds();

  // let payload = {};
  // payload["body"] = req.body;
  // payload["file"] = req.file;

  //console.log(req.body);

  if(!req?.body?.employeeName) return res.status(400).json({'message':'Employee Name is required.'})
  try{
        const result = await Employee.create({
          body: req.body,
          //file: req.file
        });

        res.status(201).json(result)
  }catch(err){
    console.error(err);
  }

  // data.setEmployees([...data.employees, payload]);

  // res.send(payload)
  //   res.status(201).json(data.employees);
  // fs.readFile(`${__dirname}/..\\models\\employee.json`, function (err, data) {
  //   var json = JSON.parse(data);

  //   json.data.push(payload);

  //   fs.writeFile(
  //     `${__dirname}/..\\models\\employee.json`,
  //     JSON.stringify(json, null, 2),
  //     function (err, data) {
  //       console.log(`data is written at:` + hh + "h:", mm + "m:", ss + "s");
  //     }
  //   );
  //   res.send(payload);
  // });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
};
