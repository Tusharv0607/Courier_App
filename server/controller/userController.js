const AirShipping = require('../Models/shippingmodel_air');
const SeaShipping = require('../Models/shippingmodel_sea');
const User = require('../Models/usermodel');
const HashServices = require('../services/hash-services');
const OtpServices = require('../services/otp-services');
const Apifeaturesair = require('../utils/Apifeaturesair');
const Apifeaturessea = require('../utils/Apifeaturessea');
const cloudinary = require('cloudinary');

const ErrorHandler = require('../utils/ErrorHandler');
const { sendEmail } = require('../utils/sendEmail');


const send_otp = async (req, res) => {
    try {

        const { email } = req.body;
        if (!email)
            throw new ErrorHandler("Email not found", 404);

        //generate otp 
        const otp = await OtpServices.generateOtp();
        //hash otp

        const hashOtp = await HashServices.hashotp(`${otp}`);
        //console.log(hashOtp)
        const message = `Your verification OTP is : ${otp} valid for ${process.env.otp_expire_time} minutes`;
        const subject = "OTP Verification."
        await sendEmail({ email, subject, message })
        const expireTime = Date.now() + (1000 * 60 * process.env.otp_expire_time)

        res.status(200).json({
            success: true,
            message: "Otp successfully send on your email",
            hash: `${hashOtp}.${expireTime}`
        })

    } catch (error) {
        statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}

const verify_otp = async (req, res) => {
    try {

        const { email, otp, hash } = req.body;
        if (!email || !hash || !otp)
            throw new ErrorHandler("All fildes required", 400);


        const hashdata = hash.split('.');
        const hashotp = hashdata[0];
        const expireTime = hashdata[1];

        if (Date.now() > expireTime)
            throw new ErrorHandler("OTP expired", 400);

        const isvarified = await OtpServices.match_otp(hashotp, otp);
        if (!isvarified)
            throw new ErrorHandler("Invalid OTP", 400);

        //check user if already exist then send it otherwise craate a new user
        let user = await User.findOne({ email });
        if (!user)
            user = await User.create({ email });

        //generate jwt token and set it in user browser as cookie   
        const accessToken = await user.getJwtToken(user._id);
        //  console.log(accessToken)
        //set it in cookies
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * (process.env.cookie_expire),
            httpOnly: true,
            sameSite: process.env.dev === "development" ? true : "none",
            secure: process.env.dev === "development" ? false : true,
        })

        res.status(200).json({
            success: true,
            message: "Otp verified successfully",
            user

        })

    } catch (error) {
        statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}

//load user
const loadUser = async (req, res) => {
    try {

        const { _id } = req.user;

        if (!_id) {
            throw new ErrorHandler("Please login to access recourse", 400);
        }
        const user = await User.findById(_id);
        if (!user)
            throw new ErrorHandler("User not found", 400);

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: true,
            message: error.message
        })
    }
}
//logout user
const logoutUser = async (req, res) => {
    try {
        res.cookie('accessToken', null, {
            expireIn: Date.now(),

            httpOnly: true,
            sameSite: process.env.dev === "development" ? true : "none",
            secure: process.env.dev === "development" ? false : true,
        })
        res.status(200).json({
            success: true,
            message: "User logout successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message
        })
    }
}


//get shipping throw sea details

const get_sea_details = async (req, res) => {
    try {

        const query = req.query;
        // console.log(query.origin)
        const que = Apifeaturessea(query);
        //console.log(que)
        const seaPath = await SeaShipping.find(que);

        res.status(200).json({
            success: true,
            seaPath


        })

    } catch (error) {
        statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}



//get shipping throw Air details
const get_air_details = async (req, res) => {
    try {
        
        let query = req.query;

        const que = Apifeaturesair(query)


       // console.log(que)
        const airPath = await AirShipping.find(que);

        res.status(200).json({
            success: true,
        airPath


        })
    } catch (error) {
        statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}

//add user name and profile
const addNameImg = async (req, res) => {
    try {
        const { name, avatar } = req.body;
        if (!name || !avatar)
            throw new ErrorHandler("All fildes required", 404);

        const user = await User.findById(req.user._id);
        if (!user)
            throw new ErrorHandler("User not found", 404);

        //upload image on cloudinary
        let myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: 'scale'
        })
        user.name = name;
        user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }

        await user.save();
        res.status(200).json({
            success:true,
            message:" Profile updated successfully",
            user
        })


    }
    catch (error) {
        statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}




module.exports = { send_otp, verify_otp, logoutUser, loadUser, get_sea_details, get_air_details, addNameImg };