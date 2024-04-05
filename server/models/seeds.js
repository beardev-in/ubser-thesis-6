import fs from "fs"
import DriverModel from "./Drivers.js";
import "../utils/dbConnect.js"; 

async function insertDrivers(){
    try{
        let driversData = JSON.parse(fs.readFileSync('../seeds/uberdata.json'));
        await DriverModel.insertMany(driversData);
    }catch(error){
        console.log(error);
    }
}

insertDrivers()