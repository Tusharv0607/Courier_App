const jwt = require('jsonwebtoken');
const User = require('../Models/usermodel');
class Auth{

    async isAuth(req,res,next){
        try {
            const {accessToken} =req.cookies;
          
        if(!accessToken||accessToken.length<=6)
            throw new Error("Please login to access resource");

           const {_id}=  await jwt.verify(accessToken,process.env.JWT_SECRET);

           const user=await User.findById(_id);
           if(!user)
           throw new Error("User not found");
           
           req.user=user;
          // console.log(accessToken)
           next();
        } catch (error) {
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    }

    //check user is admin or not
    async isAdmin(req,res,next){
        try {
          
           if(!req.user.isAdmin)
           throw new Error("User not allowed to access admin resourse");

           next();
        } catch (error) {
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    }


 //check user is activated or not
 async isActivate(req,res,next){
    try {
      
       if(!req.user.isActivate)
       throw new Error("Your profile is not activated");

       next();
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
}

module.exports=new Auth();