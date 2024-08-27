import '../style.css';
import { useState } from 'react';
import SuccessfulUpload from './modal/SuccessfulUpload';

function Upload() {
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleUpload = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="upload-container">
      <h1>Upload Model</h1>
      <div className="upload-content">
        <div className="upload-box">
          <input
            type="file"
            id="file-upload"
            className="file-input"
            onChange={handleFileUpload}
            accept=".fbx,.obj,.dae,.blend,.stl,.pdf"
          />
          <label htmlFor="file-upload" className="file-upload-label">
            <div className="upload-box-content">
              <div className="upload-icon">&#8593;</div>
              <p>
                Drag & drop models or <span className="browse-link">Browse</span>
              </p>
              <p className="supported-formats">
                Supported formats: FBX, OBJ, DAE, BLEND, STL, and many others
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
            <label>Title</label>
            <input type="text" placeholder="Kebun 300" />
          </div>
          <div className="form-group">
            <label>Country</label>
            <select>
              <option value="pendang">Malaysia</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>State</label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label>District</label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label>City / Placemark</label>
            <input type="text" placeholder="Pokok Sena area, Kedah, Malaysia" />
          </div>
          <div className="form-group">
            <label>Discipline</label>
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
          </div>
          {selectedType !== "archaeology" && selectedType !== "" && (
            <>
            <div className="form-group">
              <label>Formation</label>
              <input type="text" placeholder="Semanggol Formation" />
            </div>
            <div className="form-group">
              <label>Rock Type</label>
              <input type="text" placeholder="" />
            </div>
            <div className="form-group">
              <label>Major Lithology</label>
              <input type="text" placeholder="Chert" />
            </div>
            <div className="form-group">
              <label>Age</label>
              <select>
                <option value="triassic">Triassic</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="form-group">
              <label>Fossil</label>
              <input type="text" placeholder="" />
            </div>
            <div className="form-group">
              <label>Keywords</label>
              <input type="text" placeholder="" />
            </div>
            </>
          )}
          
          {selectedType === "archaeology" && (
            <>
              <div className="form-group">
                <label>Age/Historical Period</label>
                <input type="text" placeholder="" />
              </div>
              <div className="form-group">
                <label>Origin</label>
                <input type="text" placeholder="" />
              </div>
              <div className="form-group">
                <label>Excavation site</label>
                <input type="text" placeholder="" />
              </div>
              <div className="form-group">
                <label>Keywords</label>
                <input type="text" placeholder="" />
              </div>
            </>
          )}
          
          <div className="form-group">
            <label>Coordinate</label>
            <div className="coordinate-container">
              <div className="coordinate-item">
                <span className="coordinate-label">Lat</span>
                <input type="text" placeholder="Latitude" />
              </div>
              <div className="coordinate-item">
                <span className="coordinate-label">Long</span>
                <input type="text" placeholder="Longitude" />
              </div>
            </div>
          </div>

          <button className="upload-button" onClick={handleUpload}>Upload</button>
        </div>
      </div>
      {showModal && (
        <SuccessfulUpload message="Model uploaded successfully!" onClose={closeModal} />
      )}
    </div>
  );
}

export default Upload;