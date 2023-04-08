const crypto =require('crypto');
const HashServices=require('./hash-services')
class OtpServices{


    //generate 6-digit otp
    async generateOtp(){
       const otp=await  crypto.randomInt(100000,999999);
        return otp;
    }

    //verify otp
    async match_otp(hash,otp){
        return hash== await HashServices.hashotp(otp);
    }
}
module.exports=new OtpServices();