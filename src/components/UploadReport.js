import '../style.css';
import { useState } from 'react';
import SuccessfulUpload from './modal/SuccessfulUpload';

function UploadReport() {
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handleUpload = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="upload-container">
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
            <select>
              <option value="kedah">Kedah</option>
              <option value="selangor">Selangor</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>District</label>
            <select>
              <option value="pendang">Pendang</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>City / Placemark</label>
            <input type="text" placeholder="Pokok Sena area, Kedah, Malaysia" />
          </div>
          <div className="form-group">
            <label>Discipline</label>
            <select>
              <option value="archaeology"> Archaeology</option>
              <option value="gAll">Geology- all</option>
              <option value="gGeneral">Geology- general</option>
              <option value="gONG"> Geology- oil & gas</option>
              <option value="gMining">Geology- mining</option>
              <option value="gEngineering">Geology- engineering/ geotechnical</option>
              <option value="gEnvironment"> Geology- environment</option>
            </select>
          </div>
          <div className="form-group">
            <label>Accession Number</label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label>Type of publication</label>
            <input type="text" placeholder="" />
          </div>          
          <div className="form-group">
            <label>Year of publication</label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label>Author(s)</label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label>Name of journal/ magazine/ book</label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label>Year of publication</label>
            <input type="text" placeholder="" />
          </div>
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
        <SuccessfulUpload message="Report uploaded successfully!" onClose={closeModal} />
      )}
    </div>
  );
}

export default UploadReport;