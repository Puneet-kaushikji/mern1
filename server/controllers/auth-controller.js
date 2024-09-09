const User = require("../models/user-models");



//###########    home route logic ######3
const home = async (req,res) =>{
    try{
        res
        .status(200)
        .send("welcome here and there router page") 
    }
    catch(error){
        console.log(error);
    }
}

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
            userId: userCreated._id.toString(),


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

        //const user = await bcrypt.compare(password,userExist.password);
        const isPasswordValid = await userExist.comparePassword(password);

        if(isPasswordValid){
            register.status(200).json({
                message:"Login Successful",
                token: await userExist.generateToken(),
                userId:userExist._idtoString(),
            });
        }
        else {
            res.status(401).json({message:"Invalid email or password"});
        }

    } catch(error){
        res.status(500).json({message:"Internal serve error"});
    }
 };

module.exports = {home , register};