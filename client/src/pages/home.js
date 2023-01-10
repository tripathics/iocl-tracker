import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const Home = () => {
    return (
        <Box className="home-component">
            <Box className="hero">
                <Container maxWidth="xl" sx={{
                    position: 'relative',
                    height: 'inherit'
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translate(0%, -50%)'
                    }}>
                        <Typography sx={{color: '#fff', textShadow: '0px 2px 3px black'}} variant="h1" component="h1">
                            Indian Oil Corp. Ltd.
                        </Typography>
                        <Typography variant="h4" sx={{
                            color: 'white',
                            margin: '2rem 0'
                        }}>
                            What do we do? What don't we do
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default Home