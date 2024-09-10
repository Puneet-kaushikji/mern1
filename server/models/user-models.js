 const mongoose = require("mongoose");
 const bcrypt = require("bcryptjs");
 const jwt = require('jsonwebtoken');


 //define user schema
 const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
 });

 //during password Hashig : the pre middleware is defind within the userSchema before creating the user model . this ensures that the middleware is properly applied to user documents before they are saved to the database.

 // secure the password with bcrypt
 userSchema.pre("save",async function(){
    const user = this;
    console.log("actual data",this);

    if(!user.isModified){
        return next();
    }

    try{
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password,saltRound);
        user.password = hashedPassword;
      }
      catch(error){
        return next(error);
      }
 });


 //? generate JSON Web Token
 userSchema.methods.generateToken = async function () {
    console.log("I am Token");
    try{
        return jwt.sign(
            {
               userId: this._id.toString(),
               email:this.email,
               isAdmin: this.isAdmin, 
            },
            process.env.JWt_SECRET_KEY,
            {
                expiresIn:'30d',
            }
        );
    }
    catch(error){
        console.error("Token Error",error);
    }
 };


 //define the model or the collection name
 const User = new mongoose.model("User", userSchema);

 module.exports = User;