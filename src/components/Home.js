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
    const [modelData, setModelData] = useState([])
    const [reportData, setReportData] = useState([])
    const [mediaData, setMediaData] = useState([])
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        country: "",
        state: "",
        category: "",
        majorLithology: "",
        discipline: "",
        rockType: "",
        formation: "",
        age: ""
    });
    const [filteredModelData, setFilteredModelData] = useState([]);
    const [filteredReportData, setFilteredReportData] = useState([]);
    const [filteredMediaData, setFilteredMediaData] = useState([]);

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

    const handleReset = () => {
        setFilters({
            country: "",
            state: "",
            category: "",
            majorLithology: "",
            discipline: "",
            rockType: "",
            formation: "",
            age: ""
        });
        setFilteredModelData(modelData);
        setFilteredReportData(reportData);
        setFilteredMediaData(mediaData);
        setKeyword('');
        navigate('/home');
    };

    const handleCloseResults = () => {
        setShowResults(false);
    };

    const handleButtonClick = (view) => {
        setCurrentView(view);
    };

    useEffect(() => {
        if (keyword) {
            const filtered = markerData.filter(marker => marker.keyword.toLowerCase() === keyword.toLowerCase());
            setFilteredMarker(filtered);
            if (filtered.length === 0){
                toast.error("0 result found on map. Please click reset search on Filter Menu!", {
                    position: "top-center"
                });
                setShowResults(true);
            } else {
                toast.info(`${filtered.length} location found.`, {
                    position: "top-center"
                });
                setShowResults(true);
            }
        } else {
            setFilteredMarker(markerData);
        }
    }, [keyword]);

    useEffect(() => {
        setResultCount(filteredMarker.length);
    }, [filteredMarker]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const modelsResponse = await fetch('https://geoid-rest.vercel.app/models');
                const reportsResponse = await fetch('https://geoid-rest.vercel.app/paper_report');
                const mediasResponse = await fetch('https://geoid-rest.vercel.app/media');
                const modelRes = await modelsResponse.json()
                const reportRes = await reportsResponse.json()
                const mediaRes = await mediasResponse.json()

                const filteredModelData = modelRes.filter(model => 
                    model.data && 
                    model.data.latitude && 
                    model.data.longitude &&
                    !isNaN(parseFloat(model.data.latitude)) &&
                    !isNaN(parseFloat(model.data.longitude)) &&
                    model.access === 'public'
                );

                const filteredReportData = reportRes.filter(report => 
                    report && 
                    report.lat && 
                    report.long &&
                    !isNaN(parseFloat(report.lat)) &&
                    !isNaN(parseFloat(report.long)) &&
                    report.access === 'public'
                );

                const filteredMediaData = mediaRes.filter(media => 
                    media && 
                    media.lat && 
                    media.long &&
                    !isNaN(parseFloat(media.lat)) &&
                    !isNaN(parseFloat(media.long)) &&
                    media.access === 'public'
                );
                
                setModelData(filteredModelData)
                setReportData(filteredReportData)
                setMediaData(filteredMediaData)
                
                // Set filtered data initially
                setFilteredModelData(filteredModelData)
                setFilteredReportData(filteredReportData)
                setFilteredMediaData(filteredMediaData)
                
            } catch (error) {
                console.error('Error fetching user uploads:', error);
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, []);

    const handleApplyFilter = (newFilters) => {
        setFilters(newFilters);
        setShowResults(true);

        // Filter model data
        const filteredModels = modelData.filter(model => {
            if (newFilters.state && model.data.state.toLowerCase() !== newFilters.state.toLowerCase()) return false;
            if (newFilters.category) {
                if (newFilters.category === 'geology') {
                    if (model.data.type === 'Archaeology') return false;
                } else if (newFilters.category === 'archaeology') {
                    if (model.data.type === 'Geology') return false;
                }
            }
            if (newFilters.discipline && model.data.discipline !== newFilters.discipline) return false;
            return true;
        });
        setFilteredModelData(filteredModels);

        const filteredReports = reportData.filter(report => {
            if (newFilters.state && report.state.toLowerCase() !== newFilters.state.toLowerCase()) return false;
            if (newFilters.category) {
                if (newFilters.category === 'geology') {
                    if (report.category === 'Archaeology') return false;
                } else if (newFilters.category === 'archaeology') {
                    if (report.category !== 'Archaeology') return false;
                }
            }
            return true;
        });
        setFilteredReportData(filteredReports);

        // Filter media data
        const filteredMedia = mediaData.filter(media => {
            if (newFilters.state && media.state.toLowerCase() !== newFilters.state.toLowerCase()) return false;
            if (newFilters.category) {
                if (newFilters.category === 'geology') {
                    if (media.category === 'Archaeology') return false;
                } else if (newFilters.category === 'archaeology') {
                    if (media.category !== 'Archaeology') return false;
                }
            }
            return true;
        });
        setFilteredMediaData(filteredMedia);
    };

    const ModelMarker = ({category, title, model, data}) => {
        const [isHovering, setIsHovering] = useState(false);
        let categoryLabel = 'Unknown Category'

        const handleClick = () => {
            navigate('/model/view-model', { state: { model, data } });
        };

        const backgroundColor = category
            ? category.toLowerCase() === 'archaeology'
            ? "orange"
            : "yellow"
            : "gray";

        if (category.toLowerCase() ===  'archaeology'){
            categoryLabel = 'Archaelogy'
        } else if (category ===  'gAll'){
            categoryLabel = 'Geology - All'
        } else if (category ===  'gGeneral'){
            categoryLabel = 'Geology - General'
        } else if (category ===  'gONG'){
            categoryLabel = 'Geology - Oil & Gas'
        } else if (category ===  'gMining'){
            categoryLabel = 'Geology - Mining'
        } else if (category ===  'gEngineering'){
            categoryLabel = 'Geology - Engineering/Geotechnical'
        } else if (category ===  'gEnvironment'){
            categoryLabel = 'Geology - Environment'
        }

        return (
            <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleClick}
            style={{
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: backgroundColor,
                border: '2px solid black',
                borderRadius: "50%",
                cursor: 'pointer',
              }}
            />
            {isHovering && (
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'white',
                  padding: '5px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  zIndex: 1000,
                  whiteSpace: 'nowrap',
                }}
              >
                <div><strong>{title}</strong></div>
                <div><strong>3D Model</strong></div>
                <div>{categoryLabel}</div>
              </div>
            )}
          </div>
        );
    };
    
    const ReportMarker = ({ category, title, file }) => {
        const [isHovering, setIsHovering] = useState(false);
        let categoryLabel = 'Unknown Category'

        const handleClick = () => {
            if (file) {
                window.open(file, '_blank');
                console.log('Clicked file:', file);
            }
        };

        const backgroundColor = category
            ? category.toLowerCase() === 'archaeology'
            ? "orange"
            : "yellow"
            : "gray";

        if (category.toLowerCase() ===  'archaeology'){
            categoryLabel = 'Archaelogy'
        } else if (category ===  'gAll'){
            categoryLabel = 'Geology - All'
        } else if (category ===  'gGeneral'){
            categoryLabel = 'Geology - General'
        } else if (category ===  'gONG'){
            categoryLabel = 'Geology - Oil & Gas'
        } else if (category ===  'gMining'){
            categoryLabel = 'Geology - Mining'
        } else if (category ===  'gEngineering'){
            categoryLabel = 'Geology - Engineering/Geotechnical'
        } else if (category ===  'gEnvironment'){
            categoryLabel = 'Geology - Environment'
        }

        return (
            <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleClick}
                style={{
                    position: 'relative',
                    cursor: 'pointer',
                }}
            >
                <div
                    style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: backgroundColor,
                        border: '2px solid black',
                    }}
                />
                {isHovering && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '-40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'white',
                            padding: '5px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            zIndex: 1000,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <div><strong>{title}</strong></div>
                        <div><strong>Report / Journal</strong></div>
                        <div>{categoryLabel}</div>
                    </div>
                )}
            </div>
        );
    };

    const MediaMarker = ({ category, title, file }) => {
        const [isHovering, setIsHovering] = useState(false);
        let categoryLabel = 'Unknown Category'

        const handleClick = () => {
            if (file) {
                window.open(file, '_blank');
                console.log('Clicked file:', file);
            }
        };

        const backgroundColor = category
            ? category.toLowerCase() === 'archaeology'
            ? "orange"
            : "yellow"
            : "gray";

        if (category.toLowerCase() ===  'archaeology'){
            categoryLabel = 'Archaelogy'
        } else if (category.toLowerCase() ===  'geology'){
            categoryLabel = 'Geology'
        } else if (category ===  'gAll'){
            categoryLabel = 'Geology - All'
        } else if (category ===  'gGeneral'){
            categoryLabel = 'Geology - General'
        } else if (category ===  'gONG'){
            categoryLabel = 'Geology - Oil & Gas'
        } else if (category ===  'gMining'){
            categoryLabel = 'Geology - Mining'
        } else if (category ===  'gEngineering'){
            categoryLabel = 'Geology - Engineering/Geotechnical'
        } else if (category ===  'gEnvironment'){
            categoryLabel = 'Geology - Environment'
        }

        return (
            <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleClick}
                style={{
                    position: 'relative',
                    cursor: 'pointer',
                }}
            >
                <div
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: '7px solid transparent',
                        borderRight: '7px solid transparent',
                        borderBottom: `14px solid black`,
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '2px',
                            left: '-6px',
                            width: 0,
                            height: 0,
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderBottom: `12px solid ${backgroundColor}`,
                        }}
                    />
                </div>
                {isHovering && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '-40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'white',
                            padding: '5px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            zIndex: 1000,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <div><strong>{title}</strong></div>
                        <div><strong>Multimedia</strong></div>
                        <div>{categoryLabel}</div>
                    </div>
                )}
            </div>
        );
    };

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
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            <GoogleMap
                defaultCenter={{ lat: 4.156156, lng: 103.502969 }}
                defaultZoom={7}
                mapMinHeight="100vh"
                onGoogleApiLoaded={onGoogleApiLoaded}
                onChange={(map) => console.log('Map moved', map)}
            >
                {filteredModelData.map((marker) => (
                    <ModelMarker
                        category={marker.data.discipline}
                        title={marker.name}
                        model={marker.model}
                        data={marker.data}
                        lat={parseFloat(marker.data.latitude)}
                        lng={parseFloat(marker.data.longitude)}
                    />
                ))}

                {filteredReportData.map((marker, index) => (
                    <ReportMarker
                        key={index}
                        category={marker.category}
                        title={marker.title}
                        lat={parseFloat(marker.lat)}
                        lng={parseFloat(marker.long)}
                        file={marker.file}
                    />
                ))}

                {filteredMediaData.map((marker, index) => (
                    <MediaMarker
                        key={index}
                        category={marker.category}
                        title={marker.name}
                        lat={parseFloat(marker.lat)}
                        lng={parseFloat(marker.long)}
                        file={marker.imgSrc}
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
                        backgroundColor: '#F5F7FA'
                    }}
                >
                    <div>
                        <ResultButton onClose={handleCloseResults} onButtonClick={handleButtonClick} />
                        {currentView === 'model' && <ResultModel filters={filters} keyword={keyword} />}
                        {currentView === 'reports' && <ResultReport filters={filters} keyword={keyword}/>}
                        {currentView === 'multimedia' && <ResultMultimedia filters={filters} keyword={keyword}/>}
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Home;