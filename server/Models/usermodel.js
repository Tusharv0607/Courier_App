const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        require: [true, "Email required"]
    },
    name: {
        type: String

    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActivate: {
        type: Boolean,
        default: false
    }
},

    { timestamps: true }

)


//generate jwt token
userSchema.methods.getJwtToken = async (_id) => {

    return jwt.sign({ _id: _id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}
const User = mongoose.model("User", userSchema);
module.exports = User;