const mongoose = require('mongoose');


const shippingSchema_Air = new mongoose.Schema({

    origin: {
        type: String,
        required: [true, "Origin is required"],
        uppercase: true,
        trim:true
    },
    destination: {
        type: String,
        required: [true, "Destination is required"],
        uppercase: true,
        trim:true
    },
    cmb: {
        type: Number,
        required: [true, "CMB is required"]
    },
    gross_weight: {
        type: Number,
        required: [true, "Gross weight is required"]
    },
    cargo_type: {
        type: String,
        required: [true, "Cargo type is required"],
        trim:true
    },
    valid_till_date: {
        type: Date,
        required: [true, "Valid till date is required"],
        trim:true
    },
    price:{
        type:Number,
        required:[true,"price is required"]
    }
}
)

const AirShipping = mongoose.model("AirShipping", shippingSchema_Air);
module.exports = AirShipping;