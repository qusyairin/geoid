import "../style.css";
import React, { useState, useRef } from "react";
import GoogleMap from 'google-maps-react-markers';
import FilterMenu from "./FilterMenu";
import Artifacts from "./Artifacts";
import ResultModel from "./ResultModel";
import ResultButton from "./ResultButton";
import ResultReport from "./ResultReport";
import ResultMultimedia from "./ResultMultimedia";

function Home() {
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

    const Marker = ({ text }) => (
        <div
            style={{
                position: "absolute",
                transform: "translate(-50%, -100%)",
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
                />
            </GoogleMap>

            {/* Floating Filter Menu Box */}
            <FilterMenu onApplyFilter={handleApplyFilter} />

            {/* Search Results Placeholder */}
            {showResults && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "0",
                        left: "0",
                        width: "100%",
                        height: "50%",
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
