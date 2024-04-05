import mongoose from "mongoose"

const driverSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    license : {
        type : String,
        required : true
    },
    location : {
        type: {
            type: String,
            default: 'Point' 
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    }
})

const DriverModel = new mongoose.model('Drivers', driverSchema, 'driver');

export default DriverModel;