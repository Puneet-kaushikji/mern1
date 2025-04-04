const User = require("../models/user-model");

const getAllUsers = async (req,res) => {
    try{

        const users = await User.find({} , {password:0});

        if(!users || users.length === 0) {
            return res.status(404).json({message : "No Users Found"});
        }
        
        return res.status(200).json(users);
    }
    catch(error){
        next(error);
    }
};

module.exports = getAllUsers;