const AirShipping = require("../Models/shippingmodel_air");
const SeaShipping = require("../Models/shippingmodel_sea");
const User = require("../Models/usermodel");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary= require('cloudinary');

//activate user
const activateUser = async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id)
            throw new ErrorHandler("User id required to activate user", 404);
        const user = await User.findById(_id);
        if (!user)
            throw new ErrorHandler("User not found", 404);

        user.isActivate = true
        await user.save();
        res.status(200).json({
            success: true,
            message: "User activated successfully"
        })

    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}

//change role of user admin to user and user to admin
const changeAdminRole = async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id)
            throw new ErrorHandler("User id required to change user role", 404);
        const user = await User.findById(_id);
        if (!user)
            throw new ErrorHandler("User not found", 404);

        user.isAdmin = !user.isAdmin
        await user.save();
        res.status(200).json({
            success: true,
            message: "User role change successfully"
        })
    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}

//getUser

const getUser = async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id)
            throw new ErrorHandler("User id required to find user", 404);
        const user = await User.findById(_id);
        if (!user)
            throw new ErrorHandler("User not found", 404);

        res.status(200).json({
            success: true,
            user,
            message: "User details found"
        })
    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}
//getAllUsers
const getAllUsers = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json({
            success: true,
            user,
            message: " All Users"
        })
    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}


//delete user
const deleteUser = async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id)
            throw new ErrorHandler("User id required to delete user", 404);


        const deletedUser = await User.findOneAndRemove(_id);
        if(deletedUser.avatar.public_id){
        const imageId = deletedUser.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
    }

        res.status(200).json({
            success: true,
            deletedUser,
            message: "User deleted successfully"
        })
    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}
//getAllSeaShippingDetails
const getAllSeaShippingDetails = async (req, res) => {
    try {
        const AllSeaShippingDetails = await SeaShipping.find({});
        res.status(200).json({
            success: true,
            AllSeaShippingDetails

        })
    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}
//getAllAirShippingDetails
const getAllAirShippingDetails = async (req, res) => {
    try {
        const AllAirShippingDetails = await AirShipping.find({});
        res.status(200).json({
            success: true,
            AllAirShippingDetails
        })
    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}
//getSeaShippingDetails

const getSeaShippingDetails = async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id)
            throw new ErrorHandler("Id required", 404);
        const seaShipping = await SeaShipping.findById(_id);
        if (!seaShipping)
            throw new ErrorHandler("No shipping details found", 404);

        res.status(200).json({
            success: true,
            seaShipping,
            message: "Shipping details found"
        })
    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}

//getAirShippingDetails
const getAirShippingDetails = async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id)
            throw new ErrorHandler("Id required", 404);
        const airShipping = await AirShipping.findById(_id);
        if (!airShipping)
            throw new ErrorHandler("No shipping details found", 404);

        res.status(200).json({
            success: true,
            airShipping,
            message: "Shipping details found"
        })
    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}


//deleteSeaShippingDetails 
const deleteSeaShippingDetails = async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id)
            throw new ErrorHandler("Id required", 404);


        await SeaShipping.findOneAndRemove(_id);


        res.status(200).json({
            success: true,

            message: "SeaShipping deleted successfully"
        })
    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}





//deleteAirShippingDetails
const deleteAirShippingDetails = async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id)
            throw new ErrorHandler("Id required", 404);


        await AirShipping.findOneAndRemove(_id);


        res.status(200).json({
            success: true,

            message: "AirShipping deleted successfully"
        })
    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}

// //add deatils through sea
//const data = require('../data')
const addAirShippingDetails = async (req, res) => {
    const { origin, destination, cmb, gross_weight, cargo_type, valid_till_date, price } = req.body
    try {
        if (!origin || !destination || !cmb, !gross_weight || !cargo_type || !valid_till_date || !price)
            throw new ErrorHandler("All fildes are required", 404);


        const shippingDetail = await AirShipping.create(req.body);


        res.status(200).json({
            success: true,
            message: "Successfully added",
            shippingDetail
        })


    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
        console.log(error.message)
    }

}
// //add multiple deatils through sea

const addMultipleAirShippingDetails = async (req, res) => {
    
    try {
       
        const shippingDetail = await AirShipping.insertMany(req.body);


        res.status(200).json({
            success: true,
            message: "Successfully inserted",
            shippingDetail
        })


    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
        console.log(error.message)
    }

}

//updateAirShippingDetails
const updateAirShippingDetails = async (req, res) => {
    const { origin, destination, cmb, gross_weight, cargo_type, valid_till_date, price } = req.body
    try {

        const shippingDetailUpdated = await AirShipping.findById(req.params._id);
        if(!shippingDetailUpdated)
            throw new ErrorHandler("Not found",404);

        shippingDetailUpdated.origin=origin?origin:shippingDetailUpdated.origin;
        shippingDetailUpdated.destination=destination?destination:shippingDetailUpdated.destination;
        shippingDetailUpdated.cmb=cmb?cmb:shippingDetailUpdated.cmb;
        shippingDetailUpdated.gross_weight=gross_weight?gross_weight:shippingDetailUpdated.gross_weight;
        shippingDetailUpdated.cargo_type=cargo_type?cargo_type:shippingDetailUpdated.cargo_type;
        shippingDetailUpdated.valid_till_date=valid_till_date?valid_till_date:shippingDetailUpdated.valid_till_date;
        
        shippingDetailUpdated.price=price?price:shippingDetailUpdated.price;

        await shippingDetailUpdated.save();


        res.status(200).json({
            success: true,
            message: "Successfully updated",
            shippingDetailUpdated
        })


    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
        console.log(error.message)
    }
}
//updateSeaShippingDetails
const updateSeaShippingDetails = async (req, res) => {
    const { origin, destination, container_type, gross_weight, cargo_type, valid_till_date, price } = req.body
    try {
        const shippingDetailUpdated = await SeaShipping.findById(req.params._id);
        if(!shippingDetailUpdated)
            throw new ErrorHandler("Not found",404);

        shippingDetailUpdated.origin=origin?origin:shippingDetailUpdated.origin;
        shippingDetailUpdated.destination=destination?destination:shippingDetailUpdated.destination;
        shippingDetailUpdated.container_type=container_type?container_type:shippingDetailUpdated.container_type;
        shippingDetailUpdated.gross_weight=gross_weight?gross_weight:shippingDetailUpdated.gross_weight;
        shippingDetailUpdated.cargo_type=cargo_type?cargo_type:shippingDetailUpdated.cargo_type;
        shippingDetailUpdated.valid_till_date=valid_till_date?valid_till_date:shippingDetailUpdated.valid_till_date;
      
        shippingDetailUpdated.price=price?price:shippingDetailUpdated.price;

        await shippingDetailUpdated.save();


        res.status(200).json({
            success: true,
            message: "Successfully updated",
            shippingDetailUpdated
        })


    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
        console.log(error.message)
    }
}
//addAirShippingDetails
const addSeaShippingDetails = async (req, res) => {
    const { origin, destination, container_type, gross_weight, cargo_type, valid_till_date, price } = req.body
    try {
        if (!origin || !destination || !container_type, !gross_weight || !cargo_type || !valid_till_date || !price)
            throw new ErrorHandler("All fildes are required", 404);


        const shippingDetail = await SeaShipping.create(req.body);


        res.status(200).json({
            success: true,
            message: "Successfully added",
            shippingDetail
        })


    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
        console.log(error.message)
    }

}

//addAirShippingDetails
const addMultipleSeaShippingDetails = async (req, res) => {
    
    try {
       


        const shippingDetail = await SeaShipping.insertMany(req.body);


        res.status(200).json({
            success: true,
            message: "Successfully inserted",
            shippingDetail
        })


    } catch (error) {
        const statusCode = error.statusCode ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
        console.log(error.message)
    }

}

module.exports = {
    changeAdminRole, activateUser, getAllUsers, getUser, deleteUser, getAllSeaShippingDetails, getAllAirShippingDetails,
    getSeaShippingDetails, getAirShippingDetails, deleteSeaShippingDetails, deleteAirShippingDetails, addSeaShippingDetails,
    updateAirShippingDetails, updateSeaShippingDetails, addAirShippingDetails,addMultipleAirShippingDetails,addMultipleSeaShippingDetails
}