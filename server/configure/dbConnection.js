const mongoose = require('mongoose');

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology:false
        });
        console.log("Database connected")
    } catch (error) {
        console.log("Error in connecting with DB : "+error.message)
    }
}
module.exports=connectDB;