const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema(
    {
        departmenrName: {
            type: String,
            required: true,
            unique: true
        },

        departmenrtHeadName: {
            type: String,
            required: true,
        },

        Description: {
            type: String,
            default: "Neeroga",

        },

        isAvailable: {
            type: Boolean,
            default: true
        },
    }, {
        timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
}
)

module.exports = mongoose.model('department', departmentSchema)