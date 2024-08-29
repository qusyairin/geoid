import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "../style.css";
import GoogleMap from 'google-maps-react-markers';
import FilterMenu from "./FilterMenu";
import Artifacts from "./Artifacts";
import ResultModel from "./ResultModel";
import ResultButton from "./ResultButton";
import ResultReport from "./ResultReport";
import ResultMultimedia from "./ResultMultimedia";

function Home() {
    const navigate = useNavigate();
    const mapRef = useRef(null);
    const [mapReady, setMapReady] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [currentView, setCurrentView] = useState('model');

    /**
     * @description This function is called when the map is ready
     * @param {Object} map - reference to the map instance
     * @param {Object} maps - reference to the maps library
     */
    const onGoogleApiLoaded = ({ map, maps }) => {
        mapRef.current = map;
        setMapReady(true);
    };

    const handleApplyFilter = () => {
        setShowResults(true);
    };

    const handleCloseResults = () => {
        setShowResults(false);
    };

    const handleButtonClick = (view) => {
        setCurrentView(view);
    };

    const handleMarkerClick = (path) => {
        navigate(path); // Navigate to the specified path
    };

    const Marker = ({ text, path }) => (
        <div
            style={{
                position: "absolute",
                transform: "translate(-50%, -100%)",
                color: "black",
                textAlign: "center",
                width: "120px",
                cursor: "pointer" // Add cursor style to indicate it's clickable
            }}
            onClick={() => handleMarkerClick(path)} // Handle marker click
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
                defaultCenter={{ lat: 6.156156, lng: 100.502969 }}
                defaultZoom={7}
                mapMinHeight="100vh"
                onGoogleApiLoaded={onGoogleApiLoaded}
                onChange={(map) => console.log('Map moved', map)}
            >
                <Marker
                    text={'Kebun 500'}
                    lat={6.156156}
                    lng={100.502969}
                    path='/model/view-model' // Pass path to navigate to
                />

                <Marker
                    text={'Pulau Bidong'}
                    lat={5.621574}
                    lng={103.055531}
                    path='/model/view-model' // Pass path to navigate to
                />  
            </GoogleMap>

            {/* Floating Filter Menu Box */}
            <div style={{overflow: 'hidden'}}>
                <FilterMenu onApplyFilter={handleApplyFilter}/>
            </div>

            {/* Search Results Placeholder */}
            {showResults && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "0",
                        left: "0",
                        width: "100%",
                        height: "37%",
                        background: "white",
                        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
                        padding: "20px",
                        zIndex: 1000,
                        overflowY: "auto",
                        backgroundColor: '#F5F7FA' // Allow scrolling if content overflows
                    }}
                >
                    <div>
                        <ResultButton onClose={handleCloseResults} onButtonClick={handleButtonClick} />
                        {currentView === 'model' && <ResultModel />}
                        {currentView === 'reports' && <ResultReport />}
                        {currentView === 'multimedia' && <ResultMultimedia />}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
