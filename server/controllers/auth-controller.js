
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
 const register = async (req,res) =>{
    try{
        console.log(req.body);
        res
        .status(200)
        .json({message:req.body});
    }
    catch (error){
        res.status(400).send({msg:"page not found"})
    }
 }

module.exports = {home , register};