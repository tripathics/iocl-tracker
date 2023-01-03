import { React, useEffect } from 'react';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Autocomplete } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../media/logo2.png'
import config from '../config/config';

const theme = createTheme()
export function Registration() {
  const addVehicle = async (vehicle) => {
    const response = await fetch(`${config.API_BASE_URL}/vehicles/add`, {
      method: 'POST',
      body: JSON.stringify(vehicle),
      headers: {
        'Content-type': 'application/json'
      },
    })

    if (!response.ok) alert(`An error occured: ${response.statusText}`);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newVehicle = {
      vehicleNo: data.get('vehicleNo'),
      vehicleName:data.get('vehicleName'),
      driverName: data.get('driverName'),
      phoneNumber: data.get('phoneNumber'),
      email: data.get('email'),
      password: data.get('password'),
    }
    addVehicle(newVehicle);
    console.log({
      vehicleNo: data.get('vehicleNo'),
      vehicleName:data.get('vehicleName'),
      driverName: data.get('driverName'),
      phoneNumber: data.get('phoneNumber'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const vehiclesList =[
    { label:"TATA Truck"},
    { label: "Mahindra Bolero"},
    { label: "Ashok Laylend"},
    {label: "Bolero Pickup"},
    {label: "Heavy Vehicles"},
    {label: "Tata Ultra Bus"},
    {label:"Others"},
  ]

  return (

    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <img src={logo} style={{ width: "50px", height: "auto" }} alt=""></img>

            <Typography component="h1" variant="h5">
              Vechicle Registration Forum
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>

                  <TextField
                    autoComplete="Vehicle Number"
                    name="vehicleNo"
                    required
                    fullWidth
                    id="vehicleNo"
                    label="Vehicle Registration Number"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <Autocomplete 
                    id="combo-box-demo"
                    options={vehiclesList}
                    renderInput={(params) => <TextField {...params} 
                    autoComplete="Vehicle Name"
                    name="vehicleName"
                    required
                    fullWidth
                    id="vehicleName"
                    label="Vehicle Name"
                    />}                  
                  />
                
                  </Grid>

                <Grid item xs={12}>

                  <TextField
                    autoComplete="Driver Name"
                    name="driverName"
                    required={true}
                    fullWidth
                    id="DriverName"
                    label="Driver Full Name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    autoComplete="Phone Number"
                    name="phoneNumber"
                    required={true}
                    type="number"
                    fullWidth
                    id="phoneNumber"
                    label="Mobile Number"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required={true}
                    fullWidth
                    id="email"
                    type="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="By signing this document, you agree to the terms and conditions."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register Vehicle
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

        </Container>
      </ThemeProvider>
    </>

  )
}

export default Registration