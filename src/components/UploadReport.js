import '../style.css';
import { useState, useEffect } from 'react';
import SuccessfulUpload from './modal/SuccessfulUpload';
import malaysiaData from '../components/helpers/states.json';
import axios from 'axios';
import { bucketDb } from './helpers/Config.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function UploadReport() {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [title, setTitle] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [city, setCity] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [accessionNumber, setAccessionNumber] = useState("");
  const [publicationType, setPublicationType] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [authors, setAuthors] = useState("");
  const [journalName, setJournalName] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

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
    }
  };

  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    const selectedStateObj = states.find(s => s.name === state);
    setDistricts(selectedStateObj ? selectedStateObj.districts : []);
    setSelectedDistrict(""); // Reset district selection when state changes
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleDisciplineChange = (event) => {
    setDiscipline(event.target.value);
  };

  const handleAccessionNumberChange = (event) => {
    setAccessionNumber(event.target.value);
  };

  const handlePublicationTypeChange = (event) => {
    setPublicationType(event.target.value);
  };

  const handlePublicationYearChange = (event) => {
    setPublicationYear(event.target.value);
  };

  const handleAuthorsChange = (event) => {
    setAuthors(event.target.value);
  };

  const handleJournalNameChange = (event) => {
    setJournalName(event.target.value);
  };

  const handleRedirectLinkChange = (event) => {
    setRedirectLink(event.target.value);
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    // Basic validation
    if (!uploadedFileName){
      setErrorMessage("File is required");
      setIsErrorModalOpen(true);
    };
    if (!keywords) newErrors.keywords = "Keywords are required";
    if (!description) newErrors.description = "Description is required";
    if (!city) newErrors.city = "City/Placemark is required";
    if (!selectedState) newErrors.state = "State is required";
    if (!selectedDistrict) newErrors.district = "District is required";
    if (!discipline) newErrors.discipline = "Discipline is required";
    if (!accessionNumber) newErrors.accessionNumber = "Accession Number is required";
    if (!publicationType) newErrors.publicationType = "Type of publication is required";
    if (!publicationYear) newErrors.publicationYear = "Year of publication is required";
    if (!authors) newErrors.authors = "Author(s) are required";
    if (!journalName) newErrors.journalName = "Name of journal/magazine/book is required";
    if (!redirectLink) newErrors.redirectLink = "Redirect Link is required";
    if (!latitude) newErrors.latitude = "Latitude is required";
    if (!longitude) newErrors.longitude = "Longitude is required";
    // Check if keywords are separated by commas and not empty
    if (keywords.split(',').some(tag => tag.trim() === "")) newErrors.keywords = "Keywords cannot be empty";
    // Add more validations as needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpload = () => {
    setIsLoading(true);

    const fileRef = ref(bucketDb, `${uploadedFileName}`);
    uploadBytes(fileRef, file)
      .then(uploadResult => {
        return getDownloadURL(uploadResult.ref);
      })
      .then(url => {
        console.log(url);
        setFileLink(url);

        if (validateForm()) {
          const tags = keywords.split(',').map(tag => tag.trim());
          const reportData = {
            title: title,
            link: redirectLink,
            author: authors,
            year: publicationYear,
            linkSource: new URL(redirectLink).hostname,
            description: description,
            accessionNumber: accessionNumber,
            publicationType: publicationType,
            journalName: journalName,
            file: url,
            category: discipline,
            tags: tags,
            lat: latitude,
            long: longitude
          };

          return axios.post('https://geoid-rest.vercel.app/paper_report', reportData);
        } else {

          return Promise.reject(new Error('Form validation failed'));
        }
      })
      .then(response => {
        console.log('Upload Response:', response.data);
        setShowModal(true);
        setTitle("");
        setKeywords("");
        setDescription("");
        setSelectedState("");
        setSelectedDistrict("");
        setCity("");
        setDiscipline("");
        setAccessionNumber("");
        setPublicationType("");
        setPublicationYear("");
        setAuthors("");
        setJournalName("");
        setRedirectLink("");
        setLatitude("");
        setLongitude("");
        setFile("");
        setUploadedFileName("");
        setFileLink("");
      })
      .catch(error => {
        // Handle errors from either file upload or server request
        console.error('Error:', error);
        setErrorMessage(error.response?.data || 'An error occurred');
        setIsErrorModalOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
        setTitle("");
        setKeywords("");
        setDescription("");
        setSelectedState("");
        setSelectedDistrict("");
        setCity("");
        setDiscipline("");
        setAccessionNumber("");
        setPublicationType("");
        setPublicationYear("");
        setAuthors("");
        setJournalName("");
        setRedirectLink("");
        setLatitude("");
        setLongitude("");
        setFile("");
        setUploadedFileName("");
        setFileLink("");
      });
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
      <h1>Upload Report</h1>
      <div className="upload-content">
        <div className="upload-box">
          <input
            type="file"
            id="file-upload"
            className="file-input"
            onChange={handleFileUpload}
            accept=".doc,.docx,.pdf"
          />
          <label htmlFor="file-upload" className="file-upload-label">
            <div className="upload-box-content">
              <div className="upload-icon">&#8593;</div>
              <p>
                Drag & drop Report or <span className="browse-link">Browse</span>
              </p>
              <p className="supported-formats">
                Supported formats: PDF, WORD and many others
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
            <input type="text" onChange={handleTitleChange} />
          </div>
          <div className="form-group">
            <label>Description <span className="required">*</span></label>
            <textarea
              placeholder="Enter a description for the paper"
              value={description}
              onChange={handleDescriptionChange}
              rows="4"
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>
          <div className="form-group">
            <label>Country <span className="required">*</span></label>
            <select>
              <option value="Malaysia">Malaysia</option>
              {/* Add more options as needed */}
            </select>
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
            <input type="text" value={city} onChange={handleCityChange} />
            {errors.city && <p className="error-text">{errors.city}</p>}
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
            <label>Accession Number <span className="required">*</span></label>
            <input type="text" value={accessionNumber} onChange={handleAccessionNumberChange} />
            {errors.accessionNumber && <p className="error-text">{errors.accessionNumber}</p>}
          </div>
          <div className="form-group">
            <label>Type of Publication <span className="required">*</span></label>
            <input type="text" value={publicationType} onChange={handlePublicationTypeChange} />
            {errors.publicationType && <p className="error-text">{errors.publicationType}</p>}
          </div>
          <div className="form-group">
            <label>Year of Publication <span className="required">*</span></label>
            <input type="text" value={publicationYear} onChange={handlePublicationYearChange} />
            {errors.publicationYear && <p className="error-text">{errors.publicationYear}</p>}
          </div>
          <div className="form-group">
            <label>Author(s) <span className="required">*</span></label>
            <input type="text" value={authors} onChange={handleAuthorsChange} />
            {errors.authors && <p className="error-text">{errors.authors}</p>}
          </div>
          <div className="form-group">
            <label>Name of Journal/Magazine/Book <span className="required">*</span></label>
            <input type="text" value={journalName} onChange={handleJournalNameChange} />
            {errors.journalName && <p className="error-text">{errors.journalName}</p>}
          </div>
          <div className="form-group">
            <label>Redirect Link <span className="required">*</span></label>
            <input type="text" value={redirectLink} onChange={handleRedirectLinkChange} />
            {errors.redirectLink && <p className="error-text">{errors.redirectLink}</p>}
          </div>
          <div className="form-group">
            <label>Coordinate <span className="required">*</span></label>
            <div className="coordinate-container">
              <div className="coordinate-item">
                <span className="coordinate-label">Lat</span>
                <input type="text" placeholder="Latitude" value={latitude} onChange={handleLatitudeChange} />
                {errors.latitude && <p className="error-text">{errors.latitude}</p>}
              </div>
              <div className="coordinate-item">
                <span className="coordinate-label">Long</span>
                <input type="text" placeholder="Longitude" value={longitude} onChange={handleLongitudeChange} />
                {errors.longitude && <p className="error-text">{errors.longitude}</p>}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Keywords <span className="required">*</span></label>
            <input
              type="text"
              placeholder="Enter keywords separated by commas"
              value={keywords}
              onChange={handleKeywordsChange}
            />
            {errors.keywords && <p className="error-text">{errors.keywords}</p>}
          </div>

          <button className="upload-button" onClick={handleUpload}>Upload</button>
        </div>
      </div>

      {showModal && (
        <SuccessfulUpload message="Report uploaded successfully!" onClose={closeModal} />
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

export default UploadReport;