import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "../style.css";
import GoogleMap from 'google-maps-react-markers';
import FilterMenu from "./FilterMenu";
import ResultModel from "./ResultModel";
import ResultButton from "./ResultButton";
import ResultReport from "./ResultReport";
import ResultMultimedia from "./ResultMultimedia";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState(location.state?.keyword || ""); 
    const [filteredMarker, setFilteredMarker] = useState([]);
    const mapRef = useRef(null);
    const [mapReady, setMapReady] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [resultCount, setResultCount] = useState(null);
    const [currentView, setCurrentView] = useState('model');
    const [selectedCategory, setSelectedCategory] = useState('');

    const markerData = [
        {
            text: 'Kebun 500',
            lat: 6.156156,
            lng: 100.502969,
            path: '/model/view-model',
            type: 'geology',
            keyword: 'kebun 500'
        },
        {
            text: 'Pulau Bidong',
            lat: 5.621574,
            lng: 103.055531,
            path: '/model/view-model',
            type: 'archaeology',
            keyword: 'pulau bidong'
        }
    ];

    const onGoogleApiLoaded = ({ map, maps }) => {
        mapRef.current = map;
        setMapReady(true);
    };

    const handleApplyFilter = (category) => {
        if (category === '') {
            setFilteredMarker(markerData);
        } else {
            setFilteredMarker(markerData.filter(marker => marker.type.toLowerCase() === category.toLowerCase()));
        }
        setSelectedCategory(category);
        setShowResults(true);
    };

    const handleReset = () => {
        setFilteredMarker(markerData);
        setSelectedCategory('');
        setKeyword(''); // Reset keyword on filter reset
        navigate('/home'); // Navigate to home to clear state if needed
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

    useEffect(() => {
        if (keyword) {
            setFilteredMarker(markerData.filter(marker => marker.keyword.toLowerCase() === keyword.toLowerCase()));
            if (markerData.filter(marker => marker.keyword.toLowerCase() === keyword.toLowerCase()).length === 0){
                toast.error("0 result found. Please click reset search on Filter Menu!", {
                    position: "top-center"
                });
            } else {
                toast.info(`${markerData.filter(marker => marker.keyword.toLowerCase() === keyword.toLowerCase()).length} location found.`, {
                    position: "top-center"
                  });
            }
        } else {
            setFilteredMarker(markerData);
        }
    }, [keyword]);

    useEffect(() => {
        setResultCount(filteredMarker.length);
    }, [filteredMarker]);

    const Marker = ({ text, path, type }) => (
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
                    background: type === 'geology' ? "yellow" : "orange",
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
            </div>
            <div
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderTop: type === 'geology' ? "10px solid yellow" : "10px solid orange",
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
                defaultCenter={{ lat: 6.156156, lng: 100.502969 }}
                defaultZoom={7}
                mapMinHeight="100vh"
                onGoogleApiLoaded={onGoogleApiLoaded}
                onChange={(map) => console.log('Map moved', map)}
            >
                {filteredMarker.map((marker, index) => (
                    <Marker
                        text={marker.text}
                        lat={marker.lat}
                        lng={marker.lng}
                        path={marker.path}
                        type={marker.type}
                        key={index}
                    />
                ))}
            </GoogleMap>

            {/* Floating Filter Menu Box */}
            <div style={{ overflow: 'hidden' }}>
                <FilterMenu onApplyFilter={handleApplyFilter} reset={handleReset}/>
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
                        {currentView === 'model' && <ResultModel category={selectedCategory} keyword={keyword} />}
                        {currentView === 'reports' && <ResultReport />}
                        {currentView === 'multimedia' && <ResultMultimedia />}
                    </div>
                </div>
            )}
             <ToastContainer />
        </div>
    );
}

export default Home;
