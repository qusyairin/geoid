import '../style.css';
import { useState, useEffect, useRef } from 'react';
import SuccessfulUpload from './modal/SuccessfulUpload';
import malaysiaData from '../components/helpers/states.json';
import axios from 'axios';
import { bucketDb } from './helpers/Config.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import GoogleMap from 'google-maps-react-markers';

const DefaultLocation = { lat: 4.156156, lng: 103.502969 };

function UploadMultimedia() {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [title, setTitle] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [access, setAccess] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState(DefaultLocation);
  const [name, setName] = useState("");
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    if (malaysiaData && malaysiaData.states) {
      setStates(malaysiaData.states);
    }
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      setUploadedFileName(file.name);
      setFileType(file.type.startsWith('image/') ? 'image' : 'video');
    }
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    const selectedStateObj = states.find(s => s.name === state);
    setDistricts(selectedStateObj ? selectedStateObj.districts : []);
    setSelectedDistrict(""); // Reset district selection when state changes
  };

  const handleDisciplineChange = (event) => {
    setDiscipline(event.target.value);
  };

  const handleAccessChange = (event) => {
    setAccess(event.target.value);
  };

  const handleLatitudeChange = (event) => {
    const value = event.target.value;
    setLatitude(value);
  };
  
  const handleLongitudeChange = (event) => {
    const value = event.target.value;
    setLongitude(value);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!uploadedFileName) newErrors.file = "File is required";
    if (!selectedState) newErrors.state = "State is required";
    if (!selectedDistrict) newErrors.district = "District is required";
    if (!discipline) newErrors.discipline = "Category is required";
    if (!access) newErrors.access = "Access is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpload = () => {
    setIsLoading(true);

    const savedUser = JSON.parse(localStorage.getItem('user'));
    const userId = savedUser ? savedUser.user._id : null;

    const fileRef = ref(bucketDb, `multimedia/${uploadedFileName}`);

    if (uploadedFileName && validateForm()) {
      uploadBytes(fileRef, file)
        .then(uploadResult => {
          return getDownloadURL(uploadResult.ref);
        })
        .then(url => {
          console.log(url);
          setFileLink(url);

          const multimediaData = {
            name: name,
            location: `${selectedDistrict}, ${selectedState}`,
            imgSrc: url,
            type: fileType,
            link: "#",
            category: discipline,
            userId: userId,
            access: access,
            state: selectedState,
            districts: selectedDistrict,
            lat: latitude.toString(),
            long: longitude.toString()
          };

          return axios.post('https://geoid-rest.vercel.app/media', multimediaData);
        })
        .then(response => {
          console.log('Upload Response:', response.data);
          setShowModal(true);
          // Reset form fields
          setName("");
          setSelectedState("");
          setSelectedDistrict("");
          setDiscipline("");
          setFile("");
          setUploadedFileName("");
          setFileLink("");
          setFileType("");
          setAccess("")
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
      setIsLoading(false);
      if (!uploadedFileName) {
        setErrorMessage("File must be uploaded!");
        setIsErrorModalOpen(true);
      }
    }
  };
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  const handleMapLoad = (map) => {
    mapRef.current = map;
    setMapLoaded(true);
  };

  const Marker = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
      </svg>
    );
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="upload-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Loading...</div>
        </div>
      )}
      <h1>Upload Multimedia</h1>
      <div className="upload-content">
        <div className="upload-box">
          <input
            type="file"
            id="file-upload"
            className="file-input"
            onChange={handleFileUpload}
            accept="image/*,video/*"
          />
          <label htmlFor="file-upload" className="file-upload-label">
            <div className="upload-box-content">
              <div className="upload-icon">&#8593;</div>
              <p>
                Drag & drop Image/Video or <span className="browse-link">Browse</span>
              </p>
              <p className="supported-formats">
                Supported formats: JPG, PNG, GIF, MP4, etc.
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
            <label>Name <span className="required">*</span></label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="error-text">{errors.name}</p>}
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
            <label>Discipline <span className="required">*</span></label>
            <select value={discipline} onChange={handleDisciplineChange}>
              <option value="">Select Discipline</option>
              <option value="archaeology">Archaeology</option>
              <option value="gAll">Geology - All</option>
              <option value="gGeneral">Geology - General</option>
              <option value="gONG">Geology - Oil & Gas</option>
              <option value="gMining">Geology - Mining</option>
              <option value="gEngineering">Geology - Engineering/Geotechnical</option>
              <option value="gEnvironment">Geology - Environment</option>
            </select>
            {errors.discipline && <p className="error-text">{errors.discipline}</p>}
          </div>
          <div className="form-group">
            <label>Access <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
</svg><span className="required">*</span></label>
            <select value={access} onChange={handleAccessChange}>
              <option value="">Select Access</option>
              <option value="private">Private (only visible on your profile)</option>
              <option value="public">Public (everyone can see)</option>
            </select>
            {errors.access && <p className="error-text">{errors.access}</p>}
          </div>
          <div className="form-group">
            <label>Coordinate <span className="required">*</span></label>
            <div className="coordinate-container">
              <div className="coordinate-item">
                <span className="coordinate-label">Lat</span>
                <input
                  type="text"
                  placeholder="Latitude"
                  value={latitude}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^-?\d*\.?\d*$/.test(value)) {
                      setLatitude(value);
                      if (value) {
                        setLocation({ ...location, lat: parseFloat(value) });
                      }
                    }
                  }}
                />
                {errors.latitude && <p className="error-text">{errors.latitude}</p>}
              </div>
              <div className="coordinate-item">
                <span className="coordinate-label">Long</span>
                <input
                  type="text"
                  placeholder="Longitude"
                  value={longitude}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^-?\d*\.?\d*$/.test(value)) {
                      setLongitude(value);
                      if (value) {
                        setLocation({ ...location, lng: parseFloat(value) });
                      }
                    }
                  }}
                />
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
                //   center={location}
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
          </div>
          <button className="upload-button" onClick={handleUpload}>Upload</button>
        </div>
      </div>

      {showModal && (
        <SuccessfulUpload message="Multimedia uploaded successfully!" onClose={closeModal} />
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

export default UploadMultimedia;