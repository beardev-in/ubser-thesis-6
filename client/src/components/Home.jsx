import React, { useState } from "react";
import axios from 'axios'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { faker } from '@faker-js/faker';

import { LocateIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";

const Home = () => {
  const { toast } = useToast();
  const [position, setPosition] = useState({ latitude: "", longitude: "" });
  const [radius, setRadius] = useState(0);
  const [liveDrivers, setLiveDrivers] = useState([]);

  function onChangeHandler(event) {
    setRadius(event.target.value);
    /*
    spread operator is used to keep existing key value pairs
    - object computed property is used to select key state to update, and current event value is assigned to the same
    - react is holding this in a local state variable (snapshots being collected are instant)
    */
  }

  async function findNearbyCabs(event) {
    try {
        event.preventDefault();
        let res = await axios.post("/api/find-drivers", {position, radius});
        setLiveDrivers(res.data)
    } catch (error) {  
        console.log(error);
    }
}


  function getCurrentLocation() {
    toast({
      description: "📍 Fetching Your Location...",
    });
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid md:w-[450px]  w-[350px] gap-6">
          <div className=" gap-2 py-5 text-center flex flex-col items-center">
            <img src="./pwa-192x192.png" className="w-16" />
            <h1 className="text-3xl font-bold">Find Nearby Cabs</h1>
          </div>
          <div className="grid gap-2 grid-cols-12">
            <div className="grid gap-2 col-span-5">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                onChange={(e) =>
                  setPosition({ ...position, latitude: e.target.value })
                }
                name="latitude"
                value={position.latitude}
                type="latitude"
                required
              />
            </div>
            <div className="grid gap-2 col-span-5">
              <div className="flex items-center">
                <Label htmlFor="longitude">Longitude</Label>
              </div>
              <Input
                id="longitude"
                onChange={(e) =>
                  setPosition({ ...position, longitude: e.target.value })
                }
                value={position.longitude}
                type="longitude"
                name="longitude"
                required
              />
            </div>
            <div className="col-span-2 flex flex-col justify-end">
              <Button onClick={getCurrentLocation}>
                <LocateIcon />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-12 ">
            <select className="grid gap-2 col-span-12 h-10" name="proximity" value={radius} onChange={onChangeHandler}>
                  <option value="">set proximity</option>
                  <option value="2000">2000</option>
                  <option value="3000">3000</option>
                  <option value="5000">5000</option>
            </select>
          </div>
          <Button type="submit" className="w-full" onClick={findNearbyCabs}>
            Find
          </Button>
        </div>
        
      </div>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="p-4"></div>
        <div className="grid grid-cols-2 grid-rows-4 gap-4"></div>
          {liveDrivers.map((driver, index) => (
            <div key={index} className="flex items-center mb-2">
              <img src={faker.image.avatar()} alt="Driver Profile" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h3 className="text-xl">{driver.firstname} {driver.lastname}</h3>
                <p><strong>Driver License No:</strong> {driver.license}</p>
                <p><strong>distance:</strong> {driver.distance} </p>
                <p><strong>Coordinates:</strong> {driver.location.coordinates.latitude}, {driver.location.coordinates.longitude}</p>
              </div>
            </div>))}
        </div>
      </div>
  );
};

export default Home;


/*
<div className="grid gap-2 col-span-5">
     
                
    
            </div>

*/