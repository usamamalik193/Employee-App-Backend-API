const User = require('../models/User');

const getAllUsers = async (req,res) => {
    const users = await User.find();
    if(!users) return res.status(204).json({'message':'No Users Found'});
    res.json(users);

};
const updateUser = async (req,res) =>{
    const newRoll=req.body.roles;
    console.log(newRoll);
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const user = await User.findOne({ _id: req.body.id }).exec();
    console.log(user.firstName);
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.body.id}.` });
    }
    if (req.body?.roles) { user.roles = newRoll;
       const result = await user.save();
       res.json(result);
    }
};
module.exports={getAllUsers, updateUser};