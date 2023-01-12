import React, { useState } from "react";
import { Refresh as RefreshIcon, ArrowForwardIos as NextIcon } from "@mui/icons-material"
import { Button, Divider, IconButton, List, ListItem, Paper, Skeleton, Tooltip, Typography } from "@mui/material"
import { Container, Box } from "@mui/system"

const VehicleInfo = ({vehicle, close}) => {
  const { vehicleNo } = vehicle;

  return (
    <Box>
      <Typography variant="h6">
        {vehicleNo}
      </Typography>
      <Typography>Distance travelled</Typography>
      <Typography>Distance travelled</Typography>
      <Button onClick={() => {close()}}>Close</Button>
    </Box>
  )
}


const VehicleListItem = ({ vehicle, pan, setCurrVehicle }) => {
  return (
    <ListItem sx={{
      margin: 0, padding: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch'
    }}>
      <Button sx={{
        borderRadius: 0, paddingY: 1.3, paddingX: 2, flexGrow: 1,
        flexShrink: 0, justifyContent: 'flex-start'
      }}
        color="inherit" onClick={() => { pan(vehicle.pos.coords) }}>
        <Typography>
          {vehicle.vehicleNo}
        </Typography>
      </Button>
      <Tooltip title="Details">
        <IconButton sx={{ borderRadius: 0, paddingX: 1.5 }}
          onClick={() => { setCurrVehicle(vehicle) }}
        >
          <NextIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  )
}


const VehicleList = ({ vehicles, fetchVehicles, map, isLoaded }) => {
  const [currVehicle, setCurrVehicle] = useState(null);

  const closeInfo = () => {
    setCurrVehicle(null);
  }

  return (
    <Container maxWidth='xl' sx={{ height: 0 }}>
      <Paper elevation={3} sx={{
        top: '2rem',
        position: 'absolute',
        height: 'calc(100% - 4rem)',
        minWidth: 350,
        zIndex: 1,
        backdropFilter: 'blur(16px)',
        bgcolor: '#fffc'
      }}>
        <Box sx={{
          margin: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {!isLoaded ? <Skeleton variant="rounded" animation="wave" height={48} sx={{ width: '100%' }} /> : (<>
            <Typography variant="h6" component="h3">
              Registered vehicles
            </Typography>
            <Tooltip title="Refresh locations">
              <IconButton onClick={() => { fetchVehicles(); console.log('clicked'); }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </>)}
        </Box>

        <Divider variant="fullWidth" />
        
        {!currVehicle && (
          <List sx={{ overflow: "auto" }}>
            {!isLoaded ? (<>
              <Skeleton variant="text" animation="wave" height={36} sx={{ mt: 2, mx: 2 }} />
              <Divider variant="middle" />
              <Skeleton variant="text" animation="wave" height={36} sx={{ mx: 2 }} />
            </>) : (<>
              {vehicles.map((vehicle, i) => (<>
                <VehicleListItem map={map}
                  key={`listItem${i}`}
                  vehicle={vehicle}
                  pan={(p) => map.panTo(p)}
                  setCurrVehicle={(v) => {setCurrVehicle(v)}} 
                />
                <Divider key={`vehicleListDivider${i}`} variant="middle" />
              </>))}
            </>)}
          </List>
        )}

        {currVehicle && (
          <VehicleInfo vehicle={currVehicle} close={closeInfo} />
        )}
      </Paper>
    </Container>
  )
};


export { VehicleList };