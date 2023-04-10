const mongoose = require('mongoose');


const shippingSchema_sea = new mongoose.Schema({

    origin: {
        type: String,
        required: [true, "Origin is required"],
        uppercase: true,
    },
    destination: {
        type: String,
        required: [true, "Destination is required"],
        uppercase:true
    },
    container_type: {
        type: String,
        required: [true, "Container type is required"]
    },
    gross_weight: {
        type: Number,
        required: [true, "Gross weight is required"]
    },
    cargo_type: {
        type: String,
        required: [true, "Cargo type is required"]
    },
    valid_till_date: {
        type: Date,
        required: [true, "Valid till date is required"]
    },
    price:{
        type:Number,
        required:[true,"price is required"]
    }
}
)

const SeaShipping = mongoose.model("SeaShipping", shippingSchema_sea);
module.exports = SeaShipping;