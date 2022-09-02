const User = require('../models/User');

const handleNewUser = async (req, res) => {
    const { fName, lName, city, password, role } = req.body;
    // let payload = {};
    // payload["body"] = req.body;
    console.log(req.body);
    if (!fName || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    
    let roleNo;
    switch(role) {
        case "Admin":
          roleNo=1000;
          break;
        case "Employee":
            roleNo=2000;
          break;
          case "Editor":
            roleNo=3000;
          break;
          case "User":
            roleNo=4000;
          break;
        default:
            roleNo=4000;
      }
        console.log(`Assigned RoleNo is: ${roleNo}`);
    try {
       
        //create and store the new user
        const result = await User.create({
            "firstName": fName ,
            "lastName" : lName,
            "city" : city,
            "roles" : roleNo,
            "password": password
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${fName} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };