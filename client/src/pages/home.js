import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const Home = () => {
    return (
        <Box className="home-component">
            <Box className="hero">
                <Container maxWidth="xl">
                    <Typography>IOCL Tracker</Typography>
                </Container>
            </Box>
        </Box>
    )
}

export default Home