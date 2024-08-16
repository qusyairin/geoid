import "../style.css";
import React from "react";
import { useState, useRef } from "react";
import GoogleMap from 'google-maps-react-markers'

function Home() {
    const mapRef = useRef(null)
    const [mapReady, setMapReady] = useState(false)
  
    /**
     * @description This function is called when the map is ready
     * @param {Object} map - reference to the map instance
     * @param {Object} maps - reference to the maps library
     */
    const onGoogleApiLoaded = ({ map, maps }) => {
      mapRef.current = map
      setMapReady(true)
    }

    const Marker = ({ text }) => (
            <div
              style={{
                position: "absolute",
                transform: "translate(-50%, -100%)", // Center the marker horizontally and move it up above the coordinate point
                color: "black",
                textAlign: "center",
                width: "120px",
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {text}
                <span style={{ fontWeight: "normal" }}>View Model > </span>
              </div>
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTop: "10px solid white",
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: "100%",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              />
            </div>
          );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMap
        apiKey=""
        defaultCenter={{ lat: 3.166, lng: 101.7 }}
        defaultZoom={9}
        mapMinHeight="100vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={(map) => console.log('Map moved', map)}
      >
          <Marker
            text={'Kebun 500'}
            lat={3.166}
            lng={101.7}
            // onClick={onMarkerClick('hello', 3.166, 101.7)} // you need to manage this prop on your Marker component!
            // draggable={true}
            // onDragStart={(e, { latLng }) => {}}
            // onDrag={(e, { latLng }) => {}}
            // onDragEnd={(e, { latLng }) => {}}
          >HELLO</Marker>
      </GoogleMap>

       {/* Floating Filter Menu Box */}
       <div
        style={{
          position: "absolute",
          top: "6rem",
          right: "5rem",
          background: "white",
          padding: "10px 15px",
          borderRadius: "8px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
          background: "rgba(42, 157, 143, 0.5)", // Slightly transparent background
          zIndex: 1000, // Ensure it appears above the map
        }}
      >

        <div style={{display: 'flex'}}>
            <div style={{marginRight: '2rem'}}>
                <div>
                <label>
                    <select className="dropdown">
                        <option value="" selected>
                            Country
                        </option>
                        <option value="Malaysia">Malaysia</option>
                    </select>
                </label>
                </div>

                <div className="reset-button" style={{ marginTop: '20px'}}>
                  <button>Reset</button>
                 </div>
            </div>

            <div style={{marginRight: '2rem'}}>
                <div>
                <label>
                    <select className="dropdown">
                        <option value="" selected>
                            Formation
                        </option>
                        <option value="Malaysia">Malaysia</option>
                    </select>
                </label>
                </div>


                <div className="login-button" style={{ marginTop: '20px'}}>
                  <button>Apply Filter</button>
                 </div>
            </div>

            <div style={{marginRight: '2rem'}}>
                <div>
                <label>
                    <select className="dropdown">
                        <option value="" selected>
                            Age
                        </option>
                        <option value="Malaysia">Malaysia</option>
                    </select>
                </label>
                </div>


                <div style={{marginTop: '20px'}}>
                <label>
                    <select className="dropdown">
                        <option value="" selected>
                            Type of Rock
                        </option>
                        <option value="Malaysia">Malaysia</option>
                    </select>
                </label>
                </div>
            </div>

            <div>
                <div>
                <label>
                    <select className="dropdown">
                        <option value="" selected>
                            Major Lithology
                        </option>
                        <option value="Malaysia">Malaysia</option>
                    </select>
                </label>
                </div>


                <div style={{marginTop: '20px'}}>
                <label>
                    <select className="dropdown">
                        <option value="" selected>
                            Fossil
                        </option>
                        <option value="Malaysia">Malaysia</option>
                    </select>
                </label>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
