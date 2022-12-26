import { React, useEffect, useState } from "react"
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api"
import LayoutComponent from "../layout/layoutcomponent"

const Admin = () => {
  const [vehicles, setVehicles] = useState([]);
  const [map, setMap] = useState(null);

  const fetchVehicles = async () => {
    console.log('Fetching vehicles...')
    const response = await fetch('http://192.168.26.39:5000/vehicles');
    if (!response.ok) {
      alert(`An error occured: ${response.statusText}`)
      return;
    }
    /** @type {[]} */
    const vehicles = await response.json();
    setVehicles(vehicles.filter(vehicle => vehicle.pos))
  }

  const center = { lat: 26.182808644471546, lng: 91.80385223005672 }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDz9cjpAun4rIs4B00tsYndFRPYOLUVoFc",
  })

  if (!isLoaded) {
    return <div style={{
      width: "fit-content",
      margin: "auto",
      fontSize: "4rem"
    }}>Loading...</div>
  }

  return (
    <LayoutComponent>
      {!isLoaded ? (<div style={{
        width: "fit-content",
        margin: "auto",
        fontSize: "4rem"
      }}>Loading...</div>) : (
        <div style={{ minHeight: "inherit" }}>
          <GoogleMap
            center={center}
            zoom={15}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false
            }}
            mapContainerStyle={{
              width: "100%", height: "100%", minHeight: "inherit"
            }}
            onLoad={map => { setMap(map); fetchVehicles(); }}
          >
            {vehicles.map((vehicle, i) => (
              <Marker key={i}
                position={vehicle.pos.coords}
                label={vehicle.driverName}
              />
            ))}
          </GoogleMap>
        </div>
      )}
    </LayoutComponent>
  )
}

export default Admin