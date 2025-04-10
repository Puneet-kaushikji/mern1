const User = require("../models/user-models");
const bcrypt = require("bcryptjs");



//###########    home route logic ######3
const home = async (req,res) =>{
    try{
        res
        .status(200).json({msg:"welcome here and there router page"});
    }
    catch(error){
        console.log(error);
    }
};

// ####### user Registration Logic  #######
 const register = async (req,res) =>{
    try{
        console.log(req.body);
        const {username,email,phone,password } = req.body;


        const userExist = await User.findOne({email:email});


        if(userExist){
            return res.status(400).json({msg:"email already exists"});
        }


       const userCreated = await User.create({username,email,phone,password});

        res.status(201).json({
            msg: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString()
        });
    }
    catch (error){
        res.status(500).send({msg:"internal server error"});
    }
 }


 //####### user Login Logic  #######
 const login = async (req,res) => {
    try{
        const {email,password} = req.body;

        const userExist = await User.findOne({email});
        
        if(!userExist){
            return res.status(400).json({message:"Invalid credentials"});
        }

        // const user = await bcrypt.compare(password,userExist.password);
         const user= await userExist.comparePassword(password);

        if(user){
            res.status(200).json({
                message:"Login Successful",
                token: await userExist.generateToken(),
                userId:userExist._id.toString(),
            });
        }
        else {
            res.status(401).json({message:"Invalid email or password"});
        }

    } catch(error){
        console.error(error);
        res.status(500).json({message:"Internal serve error"});
    }
 };


    //  user logic and send user data 

    const user = async (req, res) => {
        try {
          // const userData = await User.find({});
          const userData = req.user;
          console.log(userData);
          return res.status(200).json({ msg: userData });
        } catch (error) {
          console.log(` error from user route ${error}`);
        }
      };

module.exports = {home , register,login,user};