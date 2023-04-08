const app = require('./App');





//database connection
const connectDB =require('./configure/dbConnection');
 connectDB();


//configure cloudinary
const cloudinary =require('cloudinary');

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET

})
 
//const { addAirShippingDetails, addSeaShippingDetails } = require('./controller/adminController');
// setTimeout(()=>{
//      addAirShippingDetails()
// },5000)



const Port=process.env.PORT;
app.listen(Port,(req,res)=>{
    console.log("Server is running on PORT : "+Port);
})