const mongoose = require('mongoose');

const masterDrugSchema = new mongoose.Schema(
    {
        drugName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        drugId: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('MasterDrug', masterDrugSchema);