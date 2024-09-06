
const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");




router.route("/").get(authcontrollers.home);


router.route("/register").post(authcontrollers. register);
router.route("/login").post(authcontrollers. login);



// app.get("/register",(req,res)=>{
//     res.status(200).send("welcome to registration page");
// });



module.exports = router;