import { AdvancedMarker, APIProvider, InfoWindow, Map, useMap } from "@vis.gl/react-google-maps"
import { useState } from "react"

import heroImg from '../assets/img/HERO_IMG.png'

const API_KEY = 'AIzaSyA21hcZ9kRsmfWvUfKP6kaUUWkOwiaOSw4'
const MAP_ID = '763da2a91e00557410ade55a'

const BRANCHES = [
    { id: 'store1', name: 'Main Branch', position: { lat: 32.0853, lng: 34.7818 }, info: 'Tel Aviv Branch' },
    { id: 'store2', name: 'North Branch', position: { lat: 32.7940, lng: 34.9896 }, info: 'Haifa Branch' },
    { id: 'store3', name: 'South Branch', position: { lat: 31.2505, lng: 34.7818 }, info: 'Beersheba Branch' },
]

function MapContent() {
    const map = useMap()
    const [infoWindow, setInfoWindow] = useState(null)

    const handleMarkerClick = (branch) => {
        if (infoWindow?.id === branch.id) {
            setInfoWindow(null)
        } else {
            setInfoWindow(branch)
            if (map) {
                map.panTo(branch.position)
            }
        }
    }

    const handleInfoWindowClose = () => {
        setInfoWindow(null);
    }

    return (
        <>
            {BRANCHES.map(branch => (
                <AdvancedMarker
                    key={branch.id}
                    position={branch.position}
                    onClick={() => handleMarkerClick(branch)}
                >
                    <img style={{ width: '3.5em' }} src={heroImg} alt={branch.name} />
                </AdvancedMarker>
            ))}

            {infoWindow && (
                <InfoWindow
                    position={infoWindow.position}
                    onCloseClick={handleInfoWindowClose}
                    pixelOffset={{ y: -45 }}
                >
                    <div>
                        <h3>{infoWindow.name}</h3>
                        <p>{infoWindow.info}</p>
                    </div>
                </InfoWindow>
            )}
        </>
    )
}

export function BranchesMap() {
    return (
        <section className="google-map">
            <h1>Our Branches:</h1>
            <APIProvider apiKey={API_KEY}>
                <div className="map-container">
                    <Map
                        defaultCenter={BRANCHES[0].position}
                        defaultZoom={10}
                        mapId={MAP_ID}
                    >
                        <MapContent />
                    </Map>
                </div>
            </APIProvider>
        </section>
    )
}