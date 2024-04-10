import express from "express";
import "./utils/dbConnect.js"; 
import DriverModel from "./models/Drivers.js";

const app = express();

const httpPort = 8080;

app.use(express.urlencoded({ extended: true }));

app.use(express.json()); //json bodyparser

app.post("/drivers-distance", async (req, res)=>{
    try{
        let {latitude, longitude} = req.body;
        const result = await DriverModel.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    distanceField: "distance", // Field to store the calculated distance
                    spherical: true
                }
            }
        ]);
        res.status(200).json(result);
    }catch(error){
        console.log(error);
        res.status(500).send("internal error");
    }
})


app.post("/api/find-drivers", async (req, res)=>{
    try{
        let {position, radius} = req.body;
        let {latitude, longitude} = position;
        const result = await DriverModel.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    maxDistance: parseInt(radius),
                    distanceField: "distance",
                    spherical: true
                }
            }
        ]);   
        res.status(200).json(result);
    }catch(error){
        console.log(error);
        res.status(500).send("internal error");
    }
})

app.listen(httpPort, () => {
    console.log(`Server Started at ${httpPort}`);
});
