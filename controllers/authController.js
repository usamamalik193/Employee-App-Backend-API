const User = require('../models/User');

//**For JSON file**//
// const usersDB = {
//     users: require('../models/users.json'),
//     setUsers: function (data) { this.users = data }
// }

const jwt=require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    //console.log(user)

    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({username:user}).exec();
    //console.log(foundUser);
    //const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401); 
    if (pwd===foundUser.password){
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );
    
    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    console.log(roles);

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    // Send authorization roles and access token to user
    res.json({ roles, accessToken });

       // res.json({ 'success': `User ${user} is logged in!` });
    }else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };