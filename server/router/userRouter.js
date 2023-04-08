const router = require('express').Router();

const{send_otp,verify_otp, loadUser, logoutUser,get_sea_details,get_air_details,addNameImg} =require('../controller/userController');
const Auth = require('../middleware/Auth');



//user signup-login,
router.route('/send-otp').post(send_otp);
//verify-otp
router.route('/verify-otp').post(verify_otp);
//add img and name
router.route('/add-img-name').post(Auth.isAuth,Auth.isActivate,addNameImg);
//load-user
router.route('/load-user').get(Auth.isAuth,loadUser);
//logout-user
router.route('/logout-user').get(Auth.isAuth,logoutUser);


//get details by sea
router.route('/get-sea-details').get(Auth.isAuth,get_sea_details)
//get details by air
router.route('/get-air-details').get(Auth.isAuth,get_air_details)


 











module.exports=router;