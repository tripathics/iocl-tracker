import { React, useEffect, useState } from "react"
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api"
import LayoutComponent from "../layout/layoutcomponent"

const Admin = () => {
  const [vehiclePositions, setVehiclePositions] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch('http://192.168.26.39:5000/vehicles');
      if (!response.ok) {
        alert(`An error occured: ${response.statusText}`) 
        return;
      }
      const vehicles = await response.json();
      setVehiclePositions(vehicles);
      console.log(vehiclePositions);
    }

    fetchLocations();
  }, [])

  const center = { lat: 26.182808644471546, lng: 91.80385223005672 }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDz9cjpAun4rIs4B00tsYndFRPYOLUVoFc"
  })

  if (!isLoaded) {
    return <div style={{
      width: "fit-content",
      margin: "auto",
      fontSize: "4rem"
    }}>Loading...</div>
  }

  return (
    <>
      <LayoutComponent>
      <h1>Vehicles live</h1>
      <a href="/">Back to home</a>
      <div style={{ height: "60vh" }}>
        <GoogleMap center={center} zoom={15} mapContainerStyle={{
          width: "100%", height: "100%"
        }}>
        </GoogleMap>
      </div>
      </LayoutComponent>
    </>
  )
}

export default Admin