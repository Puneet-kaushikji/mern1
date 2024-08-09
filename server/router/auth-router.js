
const express = require("express");
const router = express.Router();
const {home} = require("../controllers/auth-controller");




// router.get("/",(req,res) =>{
//     res.status(200).send("welcome to my world here and there with router");
// });


router.route("/").get(home);

router.route("/register").get((req,res) =>{
   
});

// app.get("/register",(req,res)=>{
//     res.status(200).send("welcome to registration page");
// });



module.exports = router;