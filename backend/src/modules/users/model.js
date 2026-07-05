const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userName : {
            type : String,
            required : true,
            unique : true,
            trim : true
        },

        role : {
            type : String,
            trim : true,
            required : true,
        },

        password : {
            type : String,
            required : true,
        },

        isVarified : {
            type : Boolean,
            required : true,
            default : true,
        }
    },{timestamps : true,
        toJSON:{
            transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            }
        }
    }
)

const User = mongoose.model("user", userSchema)

module.exports = User