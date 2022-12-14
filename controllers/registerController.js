const User = require('../models/User');

const handleNewUser = async (req, res) => {
    const { fName, lName, city, password, role } = req.body;
    // let payload = {};
    // payload["body"] = req.body;
    console.log(req.body);
    if (!fName || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ firstName: fName }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
       
        //create and store the new user
        const result = await User.create({
            "firstName": fName ,
            "lastName" : lName,
            "city" : city,
            "roles" : role,
            "password": password
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${fName} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };