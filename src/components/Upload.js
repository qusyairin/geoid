import '../style.css';
import { useState } from 'react';

function Upload() {
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    }
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
            <label>Model Name</label>
            <input type="text" placeholder="Kebun 300" />
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
            <label>Age</label>
            <select>
              <option value="triassic">Triassic</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>Type</label>
            <select>
              <option value="archeology">Archeology</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>Coordinate</label>
            <input type="text" placeholder="6.130241, 100.4932" />
          </div>
          <button className="upload-button">Upload</button>
        </div>
      </div>
    </div>
  );
}

export default Upload;
