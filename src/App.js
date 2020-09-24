import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

import * as parkData from './data/skateboard-parks.json'

import skate from './skate.jpg'
import './App.css';

function App() {

  const [ viewport, setViewport ] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
  })

  const [ selectedPark, setSelectedPark ] = useState(null)

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedPark(null)
      }
    }
    window.addEventListener("keydown", listener)

    return () => {
      window.removeEventListener("keydown", listener)
    }

  }, [])

  return (
    <div className="App">
      <ReactMapGL 
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => setViewport(viewport)}
        mapStyle="mapbox://styles/ashishpokhrel27/ckfgbqe5e20wu1armms9qbd67"
      >
        {
          parkData.features.map(park => (
            <Marker 
              key={park.properties.PARK_ID} 
              latitude={park.geometry.coordinates[1]} 
              longitude={park.geometry.coordinates[0]}
            >
              <button 
                className="marker-btn"
                onClick={
                  e => {
                    e.preventDefault()
                    setSelectedPark(park)
                  }
                }
              >
                <img src={skate} alt="skate"/>
              </button>
            </Marker>
          ))
        }
        { selectedPark && (
          <Popup 
            className="popup"
            latitude={selectedPark.geometry.coordinates[1]} 
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => setSelectedPark(null)}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
          )
        }
      </ReactMapGL>
    </div>
  );
}

export default App;
