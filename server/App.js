const express = require('express');
const app = express();
const path = require('path')


//dot env configure
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, './configure/.env') })


//cookies setup
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require('cors');
app.use(cors({
    credentials: true,
    origin:'*',
}));



//middleware parses incoming requests with JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));


//setup user router
const userRouter =require('./router/userRouter')
app.use('/api/v1',userRouter)
//admin route
const adminRouter =require('./router/adminRouter')
app.use('/api/v1/admin',adminRouter)


app.get('*', (req, res) => {
    res.status(200).json({
        success:true,
        message:"Working fine"
    })
})











module.exports = app;