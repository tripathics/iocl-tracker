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
    url:"https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/car.png",

    //scaledSize: GoogleMap.fontSize(30,30), //Size(30,30),
    //anchor: new window.google.maps.Point(20,20),
  };

  const icons =[
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/car.png",
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/ambulence.png",
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/truck.png",
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/fireTruck.png",
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/bulldozer.png"
  ]

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
                //icon={{ url: "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/car.png", scaledSize: new window.google.maps.Size(30, 42) }} 
                //icon={icons[0]}
                icon={{url: icons[1], scaledSize: new window.google.maps.Size(30, 70)}}
                label={vehicle.driverName}
                className="hello"
              />
            ))}
          </GoogleMap>
        </div>
      )}
    </>
  )
}

export default Admin