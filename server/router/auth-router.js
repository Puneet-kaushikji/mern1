
const express = require("express");
const router = express.Router();




router.get("/",(req,res) =>{
    res.status(200).send("welcome to my world here and there with router");
});

// app.get("/register",(req,res)=>{
//     res.status(200).send("welcome to registration page");
// });



module.exports = router;