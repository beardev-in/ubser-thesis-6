import express from "express";
import "./utils/dbConnect.js"; 
import DriverModel from "./models/Drivers.js";

const app = express();

const httpPort = 8080;

app.use(express.json()); //json bodyparser

app.post("/find-drivers", async (req, res)=>{
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

app.listen(httpPort, () => {
    console.log(`Server Started at ${httpPort}`);
});
