import React, { useState } from "react";
import ViewModel from "./ViewModel";
import "../viewModel.css"; // For styling

function ViewModelMain() {
    // State to control the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Example data, replace this with actual data
    const data = {
        title: "Thinly-bedded sedimentary outcrop (Full Scale)",
        author: "Digital Geoscience Global",
        country: "Malaysia",
        state: "Kedah",
        district: "Pendang",
        city: "N/A",
        discipline: "General Geology",
        formation: "Semanggol Formation",
        rockType: "Sedimentary Rock",
        majorLithology: "Chert",
        age: "Triassic",
        license: "CC Attribution",
        published: "2 years ago",
    };

    // Function to toggle the modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="artifacts-page">
            <ViewModel />
            <div className="artifact-details">
                <h2>{data.title}</h2>
                <p><strong>Author:</strong> {data.author}</p>
                <p><strong>Country:</strong> {data.country}</p>
                <p><strong>Age:</strong> {data.age}</p>

                <div className="button-group">
                    <button className="view-model-btn" onClick={toggleModal}>View Model Details</button>
                    <button className="download-model-btn">Download 3D Model</button>
                </div>
            </div>

            {/* Modal Component */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {/* <h2>{data.title}</h2> */}
                        <div className="detail-group">
                            <p><strong>Author</strong></p>
                            <p style={{textAlign: 'right'}}>{data.author}</p>
                        </div>
                        <hr />
                        <div className="detail-group">
                            <p><strong>Country</strong></p>
                            <p style={{textAlign: 'right'}}>{data.country}</p>
                        </div>
                        <hr />
                        <div className="detail-group">
                            <p><strong>State</strong></p>
                            <p style={{textAlign: 'right'}}>{data.state}</p>
                        </div>
                        <hr />
                        <div className="detail-group">
                            <p><strong>District</strong></p>
                            <p style={{textAlign: 'right'}}>{data.district}</p>
                        </div>
                        <hr />
                        <div className="detail-group">
                            <p><strong>City/Placemark</strong></p>
                            <p style={{textAlign: 'right'}}>{data.city}</p>
                        </div>
                        <hr />
                        <div className="detail-group">
                            <p><strong>Discipline</strong></p>
                            <p style={{textAlign: 'right'}}>{data.discipline}</p>
                        </div>
                        <hr />
                        <div className="detail-group">
                            <p><strong>Formation</strong></p>
                            <p style={{textAlign: 'right'}}>{data.formation}</p>
                        </div>
                        <hr />
                        <div className="detail-group">
                            <p><strong>Rock Type</strong></p>
                            <p style={{textAlign: 'right'}}>{data.rockType}</p>
                        </div>
                        <hr />
                        <div className="detail-group">
                            <p><strong>Major Lithology</strong></p>
                            <p style={{textAlign: 'right'}}>{data.majorLithology}</p>
                        </div>
                        <hr />
                        <div className="detail-group">
                            <p><strong>Age</strong></p>
                            <p style={{textAlign: 'right'}}>{data.age}</p>
                        </div>
                        <hr />
                        <div className="detail-group">
                            <p><strong>Published</strong></p>
                            <p style={{textAlign: 'right'}}>{data.published}</p>
                        </div>
                        <hr />

                        {/* Close Button */}
                        <button onClick={toggleModal} className="close-modal-btn">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack" viewBox="0 0 16 16">
                                <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z"/>
                                <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0z"/>
                            </svg>
                            <p>BACK TO 3D MODEL</p>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewModelMain;
