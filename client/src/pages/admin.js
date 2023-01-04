import { React, useState } from "react"
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api"
import config from '../config/config'

const Admin = () => {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    console.log('Fetching vehicles...')
    const response = await fetch(`${config.API_BASE_URL}/vehicles`);
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
    googleMapsApiKey: config.GOOGLE_MAPS_API_KEY,
  })
  const icon1 ={
    url:"https://img.icons8.com/color/30/null/car-top-view.png",
    //scaledSize: GoogleMap.fontSize(30,30), //Size(30,30),
    //anchor: new window.google.maps.Point(20,20),
    //scale :0.7,
  };

  const icon2 ={
    url:"..\media\Icons\truck.png",
    scale:0.7,
  }
  if (!isLoaded) {
    return <div style={{
      width: "fit-content",
      margin: "auto",
      fontSize: "4rem"
    }}>Loading...</div>
  }

  return (
    <>
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
            onLoad={map => { console.log(`Map loaded`); fetchVehicles(); }}
          >
            {vehicles.map((vehicle, i) => (
              <Marker key={i}
                position={vehicle.pos.coords}
                icon={icon1}
                label={vehicle.driverName}
              />
            ))}
          </GoogleMap>
        </div>
      )}
    </>
  )
}

export default Admin