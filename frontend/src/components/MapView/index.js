import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import { useParams } from "react-router-dom";
import { Icon } from "leaflet";
import Cookies from "js-cookie";
import "leaflet/dist/leaflet.css";
import "./index.css";

const statusObj = {
    success: "success",
    failed: "failed",
    loading: "loading"
};

const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

const createCustomIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38]
});
const createCustomIcon2 = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/14034/14034740.png",
    iconSize: [38, 38]
});
const MapView = () => {
    const [location, setLocation] = useState(null);
    const [apiLocation, setApiLocation] = useState(null);
    const [error, setError] = useState("");
    const [status, setStatus] = useState(statusObj.loading);
    const { id } = useParams();

    useEffect(() => {
        const token = Cookies.get("jwt_token");

        const fetchLocationDetails = async () => {
            if (!token) {
                setStatus(statusObj.failed);
                setError("User not logged in.");
                return;
            }

            const url = `https://mapapp-us5l.onrender.com/api/map/${id}`;
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            };

            try {
                const response = await fetch(url, options);
                console.log(response)
                const data = await response.json();
                 const {mapDetails}=data
                if (response.ok) {
                    setApiLocation({
                        lat: mapDetails.latitude,
                        lng: mapDetails.longitude,
                        zoom:mapDetails.zoom || 5,
                        title:mapDetails.title
                    });
                    setStatus(statusObj.success);
                } else {
                    setStatus(statusObj.failed);
                    setError(data.message || "Failed to fetch location.");
                }
            } catch (e) {
                setStatus(statusObj.failed);
                setError("Something went wrong. Please try again.");
            }
        };

        fetchLocationDetails();

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setLocation({ lat: coords.latitude, lng: coords.longitude });
            },
            () => {
                setError("Unable to fetch current location.");
            }
        );
    }, [id]);
  const  loadingView=()=>{
        return (
            <div data-testid="loader">
    <p>.....Loading</p>
</div>
        )
    }
    
 const   failedView=()=>{
        return (
            <div className="not-found-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
              alt="not-found"
              className="not-found-img"
            />
            {error&&<p className="erropara">{error}</p>}
          </div>
        )
    }
const sucessview=()=>{
    return (
    <div className="mapContainernavbar">
    <nav>
        <h1 className="navheadingMap">Map View</h1>
    </nav>

    {status === statusObj.success && apiLocation && (
        <MapContainer className="mapContainer" center={[apiLocation?.lat|| 20.5937, apiLocation?.lng || 78.9629]} zoom={apiLocation.zoom} style={{ height: "100vh", width: "100%" }}>
            <ChangeView center={[apiLocation?.lat|| 20.5937, apiLocation?.lng|| 78.9629]} zoom={apiLocation.zoom} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            <Marker position={[apiLocation?.lat || 20.5937, apiLocation?.lng || 78.9629]} icon={createCustomIcon}>
                <Popup>{apiLocation.title}</Popup>
            </Marker>
            {location && (
                <Marker position={[location.lat, location.lng]} icon={createCustomIcon2}>
                    <Popup>Your Current Location</Popup>
                </Marker>
            )}
        </MapContainer>
    )}
</div>)
}

               switch (status) {
                   case statusObj.success:
                     return  sucessview()
                       break;
                   case statusObj.loading:
                      return loadingView()
                       break;
                   default:
                      return failedView()
                       break;
               }

};

export default MapView;
