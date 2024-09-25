import '../style.css';
import { useState, useEffect, useRef } from 'react';
import SuccessfulUpload from './modal/SuccessfulUpload';
import malaysiaData from '../components/helpers/states.json';
import axios from 'axios';
import { bucketDb } from './helpers/Config.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import GoogleMap from 'google-maps-react-markers';

const DefaultLocation = { lat: 4.156156, lng: 103.502969 };

function Upload() {
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedImgName, setUploadedImgName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [model, setModel] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [formation, setFormation] = useState("");
  const [rockType, setRockType] = useState("");
  const [majorLithology, setMajorLithology] = useState("");
  const [fossil, setFossil] = useState("");
  const [origin, setOrigin] = useState("");
  const [excavation, setExcavation] = useState("");
  const [age, setAge] = useState("");
  const [keywords, setKeywords] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(DefaultLocation);
  const [modelLink, setModelLink] = useState("");
  const [imgLink, setImgLink] = useState("");

  useEffect(() => {
    if (malaysiaData && malaysiaData.states) {
      setStates(malaysiaData.states);
    }
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setModel(file);
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handlePreviewUpload = (event) => {
    const file = event.target.files[0];
    setImgPreview(file);
    if (file) {
      setUploadedImgName(file.name);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleFormationChange = (event) => {
    setFormation(event.target.value);
  };

  const handleRockTypeChange = (event) => {
    setRockType(event.target.value);
  };

  const handleMajorLithologyChange = (event) => {
    setMajorLithology(event.target.value);
  };

  const handleFossilChange = (event) => {
    setFossil(event.target.value);
  };

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleExcavationChange = (event) => {
    setExcavation(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setDiscipline(event.target.value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!uploadedFileName){
      setErrorMessage("File is required");
      setIsErrorModalOpen(true);
    };

    if (!uploadedImgName){
      setErrorMessage("Image Preview is required");
      setIsErrorModalOpen(true);
    };

    if (!title) newErrors.title = "Title is required";
    if (!keywords) newErrors.keywords = "Keywords are required";
    if (!country) newErrors.country = "Country is required";
    if (!city) newErrors.city = "City / Placemark is required";
    if (!selectedState) newErrors.state = "State is required";
    if (!selectedDistrict) newErrors.district = "District is required";

    if (!discipline) {
      newErrors.discipline = "Discipline is required"
    } else {
      if (discipline !== "archaeology") {
        if (!formation) newErrors.formation = "Formation is required";
        if (!rockType) newErrors.rockType = "Rock Type is required";
        if (!majorLithology) newErrors.majorLithology = "Major Lithology is required";
        if (!fossil) newErrors.fossil = "Fossil is required";
      } else {
        if (!origin) newErrors.origin = "Origin is required";
        if (!excavation) newErrors.excavation = "Excavation is required";
      }
    }
    if (!age) newErrors.age = "Age is required";
    if (!latitude) newErrors.latitude = "Latitude is required";
    if (!longitude) newErrors.longitude = "Longitude is required";
    if (keywords.split(',').some(tag => tag.trim() === "")) newErrors.keywords = "Keywords cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpload = () => {
    setIsLoading(true);
  
    const fileRef = ref(bucketDb, `${uploadedFileName}`);
    const imgRef = ref(bucketDb, `${uploadedImgName}`);
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const userId = savedUser ? savedUser.user._id : null;

    if (uploadedFileName) {
      // Upload the model first and get its URL
      uploadBytes(fileRef, model)
      .then(uploadResult => getDownloadURL(uploadResult.ref))
      .then(modelUrl => {
        setModelLink(modelUrl);

        // Then upload the image and get its URL
        return uploadBytes(imgRef, imgPreview)
          .then(uploadResult => getDownloadURL(uploadResult.ref))
          .then(imgUrl => {
            setImgLink(imgUrl);
            // Only when both URLs are available, proceed with form validation and sending data
            if (validateForm()) {
              const modelData = {
                name: title,
                location: `${selectedDistrict}, ${selectedState}`,
                imgSrc: imgUrl,    // Use the resolved image URL
                model: modelUrl,   // Use the resolved model URL
                data: {
                  title: title,
                  author: "Digital Geoscience Global",
                  country: country,
                  state: selectedState,
                  district: selectedDistrict,
                  city: city,
                  type: discipline === 'archaeology' ? 'Archaeology' : 'Geology',
                  discipline: discipline,
                  formation: formation,
                  rockType: rockType,
                  majorLithology: majorLithology,
                  age: age,
                  origin: origin,
                  excavation: excavation,
                  license: "CC Attribution",
                  published: new Date().toLocaleString(),
                  downloadPath: modelUrl,
                  latitude: latitude.toString(),
                  longitude: longitude.toString(),
                  keyword: keywords
                },
                access: '',
                userId: userId
              };

              // Send the model data to the server
              return axios.post('https://geoid-rest.vercel.app/models', modelData);
            } else {
              return Promise.reject(new Error('Form validation failed'));
            }
          });
      })
      .then(response => {
        console.log('Upload Response:', response);
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage(error.response?.data || 'An error occurred');
        setIsErrorModalOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      }); 
    } else {
      alert("File must be uploaded!")
      setIsLoading(false);
    }
  };  

  const closeModal = () => {
    setShowModal(false);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    const selectedStateObj = states.find(s => s.name === state);
    setDistricts(selectedStateObj ? selectedStateObj.districts : []);
    setSelectedDistrict("");
  };

  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  const handleMapLoad = (map) => {
    mapRef.current = map;
    setMapLoaded(true);
  };

  const Marker = () => {
    return (
      <div
        draggable={true}
        style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'yellow',
          border: '2px solid black',
        }}
      />
    );
  };

  return (
    <div className="upload-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Loading...</div>
        </div>
      )}
      <h1>Upload Model</h1>
      <div className="upload-content">
        <div className="upload-box">
          <input
            type="file"
            id="file-upload"
            className="file-input"
            onChange={handleFileUpload}
            accept=".glb"
          />
          <label htmlFor="file-upload" className="file-upload-label">
            <div className="upload-box-content">
              <div className="upload-icon">&#8593;</div>
              <p>
                Drag & drop models or <span className="browse-link">Browse</span>
              </p>
              <p className="supported-formats">
                Supported formats: GLB
              </p>
            </div>
          </label>
          {uploadedFileName && (
            <div className="uploaded-file">
              <span>{uploadedFileName}</span>
              <button onClick={() => setUploadedFileName("")}>❌</button>
            </div>
          )}
        </div>
        <div className="form-container">
          <div className="form-group">
            <label>Title <span className="required">*</span></label>
            <input type="text" onChange={handleTitleChange}/>
            {errors.title && <p className="error-text">{errors.title}</p>}
          </div>
          <div className="form-group">
            <label>Image Preview for 3D Model <span className="required">*</span></label>
            <input type="file" onChange={handlePreviewUpload} accept='.jpg,.png,.jpeg'/>
            {errors.preview && <p className="error-text">{errors.preview}</p>}
          </div>
          <div className="form-group">
            <label>Country <span className="required">*</span></label>
            <select onChange={handleCountryChange}>
              <option value="">Select Country</option>
              <option value="Malaysia">Malaysia</option>
            </select>
            {errors.country && <p className="error-text">{errors.country}</p>}
          </div>
          <div className="form-group">
            <label>State <span className="required">*</span></label>
            <select onChange={handleStateChange} value={selectedState}>
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && <p className="error-text">{errors.state}</p>}
          </div>
          <div className="form-group">
            <label>District <span className="required">*</span></label>
            <select onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict}>
              <option value="">Select District</option>
              {districts.map(district => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {errors.district && <p className="error-text">{errors.district}</p>}
          </div>
          <div className="form-group">
            <label>City / Placemark <span className="required">*</span></label>
            <input type="text" onChange={handleCityChange}/>
            {errors.city && <p className="error-text">{errors.city}</p>}
          </div>
          <div className="form-group">
            <label>Discipline <span className="required">*</span></label>
            <select onChange={handleTypeChange} value={selectedType}>
              <option value="">Discipline</option>
              <option value="archaeology"> Archaeology</option>
              <option value="gAll">Geology- all</option>
              <option value="gGeneral">Geology- general</option>
              <option value="gONG"> Geology- oil & gas</option>
              <option value="gMining">Geology- mining</option>
              <option value="gEngineering">Geology- engineering/ geotechnical</option>
              <option value="gEnvironment"> Geology- environment</option>
            </select>
            {errors.discipline && <p className="error-text">{errors.discipline}</p>}
          </div>
          {selectedType !== "archaeology" && selectedType !== "" && (
            <>
            <div className="form-group">
              <label>Formation <span className="required">*</span></label>
              <input type="text" onChange={handleFormationChange} />
              {errors.formation && <p className="error-text">{errors.formation}</p>}
            </div>
            <div className="form-group">
              <label>Rock Type <span className="required">*</span></label>
              <input type="text" onChange={handleRockTypeChange}/>
              {errors.rockType && <p className="error-text">{errors.rockType}</p>}
            </div>
            <div className="form-group">
              <label>Major Lithology <span className="required">*</span></label>
              <input type="text" onChange={handleMajorLithologyChange} />
              {errors.majorLithology && <p className="error-text">{errors.majorLithology}</p>}
            </div>
            <div className="form-group">
              <label>Fossil <span className="required">*</span></label>
              <input type="text" onChange={handleFossilChange} />
              {errors.fossil && <p className="error-text">{errors.fossil}</p>}
            </div>
            </>
          )}
          
          {selectedType === "archaeology" && (
            <>
              <div className="form-group">
                <label>Origin <span className="required">*</span></label>
                <input type="text" onChange={handleOriginChange} />
                {errors.origin && <p className="error-text">{errors.origin}</p>}
              </div>
              <div className="form-group">
                <label>Excavation site <span className="required">*</span></label>
                <input type="text" onChange={handleExcavationChange} />
                {errors.excavation && <p className="error-text">{errors.excavation}</p>}
              </div>
            </>
          )}

            <div className="form-group">
              <label>Age <span className="required">*</span></label>
              <input type="text" onChange={handleAgeChange} />
              {errors.age && <p className="error-text">{errors.age}</p>}
            </div>

            <div className="form-group">
              <label>Keywords <span className="required">*</span></label>
              <input type="text" onChange={handleKeywordsChange} />
              {errors.keywords && <p className="error-text">{errors.keywords}</p>}
            </div>

          <div className="form-group">
            <label>Coordinate <span className="required">*</span></label>
            <div className="coordinate-container">
              <div className="coordinate-item">
                <span className="coordinate-label">Lat</span>
                <input type="text" placeholder="Latitude" value={location.lat} onChange={handleLatitudeChange} />
                {errors.latitude && <p className="error-text">{errors.latitude}</p>}
              </div>
              <div className="coordinate-item">
                <span className="coordinate-label">Long</span>
                <input type="text" placeholder="Longitude" value={location.lng} onChange={handleLongitudeChange}/>
                {errors.longitude && <p className="error-text">{errors.longitude}</p>}
              </div>
            </div>
              <div className='form-group'>
                <div className='map-container'>
                <GoogleMap
                    defaultCenter={{ lat: 4.156156, lng: 103.502969 }}
                    onGoogleApiLoaded={({ map, maps }) => handleMapLoad(map, maps)}
                    defaultZoom={7}
                    style={{ height: '100%', width: '100%' }}
                    apiKey=''
                  >
                    <Marker
                      draggable={true}
                      lat={parseFloat(latitude) || location.lat}
                      lng={parseFloat(longitude) || location.lng}
                      onDragEnd={(e, { latLng }) => {
                        setTimeout(() => {
                          setLatitude(latLng.lat)
                          setLongitude(latLng.lng)
                          setLocation(latLng);
                        }, 1000);
                      }}
                    />
                  </GoogleMap>
                </div>
              </div>

          <button className="upload-button" onClick={handleUpload}>Upload</button>
          </div>
        </div>
      </div>
      {showModal && (
        <SuccessfulUpload message="Model uploaded successfully!" onClose={closeModal} />
      )}

      {/* Error Modal */}
      {isErrorModalOpen && (
        <div className="modal-register">
          <div className="modal-content-register">
            <h2>Error</h2>
            <p>{errorMessage}</p>
            <button className="modal-button-register" onClick={closeErrorModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;