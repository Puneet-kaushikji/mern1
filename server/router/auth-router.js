
const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");



router.route("/").get(authcontrollers.home);

router
    .route("/register")
    .post(validate(signupSchema), authcontrollers.register);
router.route("/login").post(authcontrollers.login);

router.route("/user").get(authMiddleware, authcontrollers.user);

// app.get("/register",(req,res)=>{
//     res.status(200).send("welcome to registration page");
// });




module.exports = router;