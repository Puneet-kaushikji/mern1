
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

// ####### Registration Logic  #######
 const register = (req,res) =>{
    try{
        res.status(200).send("welcome to registration page");
    }
 }

module.exports = {home};