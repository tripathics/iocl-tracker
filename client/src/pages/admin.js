import { React, useEffect, useState } from "react"
import { Box, Container } from "@mui/system"
import { Divider, IconButton, List, ListItemButton, ListItemText, Paper, Skeleton, Tooltip, Typography } from "@mui/material"
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api"
import config from '../config/config'
import { Refresh as RefreshIcon } from "@mui/icons-material"

const VehicleMarker = ({ id, position, vehicleNo, icon }) => {
  const [pos, setPos] = useState(position);

  useEffect(() => {
    setInterval(() => {
      fetch(`${config.API_BASE_URL}/vehicles/${id}`)
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.coords) {
            setPos(jsonRes.coords);
          } else {
            console.log("Can't find vehicle with given ID");
          }
        }).catch(err => {
          console.log(err);
        })
    }, 10000)
  }, [])

  return (
    <Marker
      position={pos}
      icon={{ url: icon, scaledSize: new window.google.maps.Size(30, 70) }}
      label={vehicleNo}
      className="hello"
    />
  )
}

const Admin = () => {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    console.log('Fetching vehicles...')
    fetch(`${config.API_BASE_URL}/vehicles`)
      .then(res => res.json())
      .then((jsonResponse) => {
        setVehicles(jsonResponse.filter(vehicle => vehicle.pos));
      })
      .catch(err => {
        console.log(err);
      })
  }

  const center = { lat: 26.182808644471546, lng: 91.80385223005672 }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: config.GOOGLE_MAPS_API_KEY,
  })
  const icon1 = {
    url: "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/car.png",

    //scaledSize: GoogleMap.fontSize(30,30), //Size(30,30),
    //anchor: new window.google.maps.Point(20,20),
  };

  const icons = [
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/carImage.png",
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/ambulenceImage.png",
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/truck.png",
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/fireTruck.png",
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/bulldozer.png"
  ]

  return (
    <Box sx={{ minHeight: "inherit", position: "relative" }}>
      <Container maxWidth='xl' sx={{ height: 0 }}>
        <Paper elevation={5} sx={{
          top: '2rem',
          position: 'absolute',
          height: 'calc(100% - 4rem)',
          minWidth: 350,
          zIndex: 1,
        }}>
          <Box sx={{
            margin: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {!isLoaded ? <Skeleton variant="rounded" height={48} sx={{ width: '100%' }} /> : (<>
              <Typography variant="h6" component="h3">
                Registered vehicles
              </Typography>
              <Tooltip title="Refresh locations">
                <IconButton onClick={() => { fetchVehicles(); }}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </>)}
          </Box>

          <Divider variant="fullWidth" />

          <List sx={{
            overflow: "auto"
          }}>
            {!isLoaded ? (<>
              <Skeleton variant="rectangular" height={32} sx={{mt: 2}} />
              <Divider variant="middle" />
              <Skeleton variant="rectangular" height={32} />
            </>) : (<>
              {vehicles.map((vehicle, i) => (<>
                <ListItemButton key={`listItem${i}`}>
                  <ListItemText primary={vehicle.vehicleNo} />
                </ListItemButton>
                <Divider variant="middle" />
              </>))}
            </>)}
          </List>
        </Paper>
      </Container>

      {!isLoaded ? <Skeleton animation="wave" sx={{ height: '100%', width: '100%' }} /> : (
        <GoogleMap
          center={center}
          zoom={15}
          options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
          mapContainerStyle={{ minHeight: "inherit" }}
          onLoad={map => { console.log(`Map loaded`); fetchVehicles(); }}
        >
          {vehicles.map((vehicle) => (
            <VehicleMarker key={vehicle._id}
              id={vehicle._id}
              position={vehicle.pos.coords}
              icon={icons[0]}
              vehicleNo={vehicle.vehicleNo}
            />
          ))}
        </GoogleMap>
      )}

    </Box>
  )
}

export default Admin