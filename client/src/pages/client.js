import { React, useState, useEffect } from "react";
import LayoutComponent from "../layout/layoutcomponent"

const Client = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            if (pos) {
                setLocation(pos.coords)
                console.log(location);
            }
        })
    }, [])

    return (
        <>  <LayoutComponent>
            <h2>Hello client</h2>
            {location && (
                <h3>{location.latitude} {location.longitude}</h3>
            )}
            <a href="/">Back to home</a>

            </LayoutComponent>
        </>
    )
}

export default Client