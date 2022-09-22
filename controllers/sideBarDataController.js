const sidebar= require('../models/sideBarData');

const getSidebarData = async (req, res)=>{
    const data=await sidebar.find();
    if(!data) return res.status(204).json({'message':'No SideBar data Found.'});
    res.json(data);
}
module.exports = {getSidebarData};