import React, { useState } from 'react'
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
} from '@chakra-ui/react'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api'


const center = { lat: 48.8584, lng: 2.2945 }

const Index = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDz9cjpAun4rIs4B00tsYndFRPYOLUVoFc",
        libraries: ['places'],
    })

    const [map,setMap] = useState(null)
    return (
        <>
            <Flex
                position='relative'
                flexDirection='column'
                alignItems='center'
                h='100vh'
                w='100vw'
            >
            <Box position ='absolute' left={0} top ={0} h='100%' w='100%' >
                <GoogleMap 
                center={center}
                zoom={15}
                mapContainerStyle={{width: '100%', height:'100%'}}
                options={{
                    zoomControl :false,
                    streetViewControl:false,
                    mapTypeControl:false,
                    fullscreenControl:false,
                }}
                onLoad={map => setMap(map)} >

                 <Marker position={center} />
                 {directionResponse && (
                    <DirectionsRenderer directions={directionResponse} />
                 )

                 }

                </GoogleMap>
            </Box>


            </Flex>
        </>
    )
}

export default Index