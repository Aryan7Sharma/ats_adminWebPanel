import { useState } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import { Button } from '@material-ui/core';
import './SiteLocator.css';


function SiteLocator({ selectedLocation,setSelectedLocation,searchBox,setSearchBox,handleaddNewSite }) {
    const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

    const handleLoad = (ref) => {
        setSearchBox(ref);
    };

    const handlePlacesChanged = () => {
        if (searchBox) {
            const places = searchBox.getPlaces();
            if (places.length > 0) {
                const location = places[0];
                setSelectedLocation(location);
                setMapCenter({ lat: location.geometry.location.lat(), lng: location.geometry.location.lng() });
            }
        }
    };

    return (
        <div>
            <LoadScript
                googleMapsApiKey={""}
                libraries={["places"]}
            >

                <StandaloneSearchBox onLoad={handleLoad} onPlacesChanged={handlePlacesChanged}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '70vw', alignItems: 'center', marginLeft: '15vw', marginBlock: '20px' }}>
                        <input
                            type="text"
                            placeholder="Search for a location (e.g., sites, etc.)"
                            className="zomato-search-input"
                        />
                    </div>

                </StandaloneSearchBox>
                {selectedLocation && (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '70vw', alignItems: 'center', marginLeft: '15vw', marginBlock: '20px' }}>
                        <div>
                            <p>Selected Location: {selectedLocation?.name}</p>
                            <p>Latitude: {selectedLocation?.geometry?.location?.lat()}</p>
                            <p>Longitude: {selectedLocation?.geometry?.location?.lng()}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color="primary"
                                style={{ marginRight: '10px' }}
                                onClick={() => handleaddNewSite()}
                            >
                                Create
                            </Button>
                            <Button variant="contained" color="default"
                                onClick={() => setSelectedLocation(null)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )
                }
                <GoogleMap mapContainerStyle={{ height: '70vh', width: '96%', marginLeft: '2vw' }} center={mapCenter} zoom={15}>
                    {selectedLocation && (
                        <Marker position={{ lat: selectedLocation.geometry.location.lat(), lng: selectedLocation.geometry.location.lng() }} icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }} />
                    )}
                </GoogleMap>
            </LoadScript >
        </div >
    );
}

export default SiteLocator;
