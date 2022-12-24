import React from "react"
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api"

const Admin = () => {
  const center = { lat: 48.8584, lng: 2.2945 }

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
      <h1>Vehicles live</h1>
      <a href="/">Back to home</a>
      <div style={{ height: "80vh" }}>
        <GoogleMap center={center} zoom={15} mapContainerStyle={{
          width: "100%", height: "100%"
        }}>
        </GoogleMap>
      </div>
    </>
  )
}

export default Admin