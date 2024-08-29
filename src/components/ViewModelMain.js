import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import ViewModel from "./ViewModel";
import "../viewModel.css"; // For styling
import PurchaseModel from "./modal/PurchaseModel";

function ViewModelMain() {
    // State to control the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQropen, setIsQropen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    // Get the data passed from ViewModel
    const location = useLocation();
    const { data } = location.state || {};

    // Function to toggle the modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleQR = () => {
        setIsQropen(!isQropen);
    };

    if (!data) {
        return <p>No data provided.</p>;
    }

    const handlePurchaseClick = (data) => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedData(null);
    };

    return (
        <div className="artifacts-page">
            <ViewModel />
            <div className="artifact-details">
                <h2>{data.title}</h2>
                <p><strong>Author:</strong> {data.author}</p>
                <p><strong>Country:</strong> {data.country}</p>
                <p><strong>Discipline:</strong> {data.discipline}</p>
                {data.type === 'Geology' && (
                    <>
                    <p><strong>Formation:</strong> {data.formation}</p>
                    <p><strong>Rock type:</strong> {data.rockType}</p>
                    <p><strong>Major lithology:</strong> {data.majorLithology}</p>
                    <p><strong>Age:</strong> {data.age}</p>
                    </>
                )}
                {data.type === 'Archaeology' && (
                    <>
                    <p><strong>Origin:</strong> {data.origin}</p>
                    <p><strong>Excavation Site:</strong> {data.excavation}</p>
                    <p><strong>Age / Historical Period:</strong> {data.age}</p>
                    </>
                )}

                <div className="button-group">
                    <button className="view-model-btn" onClick={toggleModal}>View Model Details</button>
                    <button className="download-model-btn" onClick={handlePurchaseClick}>Purchase</button>
                    <button className="download-model-btn" onClick={toggleQR}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-badge-ar-fill" viewBox="0 0 16 16">
                            <path d="m6.031 8.574-.734-2.426h-.052L4.51 8.574h1.52zm3.642-2.641v1.938h1.033c.66 0 1.068-.316 1.068-.95 0-.64-.422-.988-1.05-.988z"/>
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.265 5.458h2.004L6.739 11H8L5.996 5.001H4.607L2.595 11h1.2zM8.5 5v6h1.173V8.763h1.064L11.787 11h1.327L11.91 8.583C12.455 8.373 13 7.779 13 6.9c0-1.147-.773-1.9-2.105-1.9z"/>
                        </svg>&nbsp;AR</button>
                    <a href={data.downloadPath} download style={{textDecoration: 'none'}}><button className="download-model-btn">Download 3D Model</button></a>
                </div>
            </div>

            {/* Modal Component */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
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
                        {data.type === "Geology" && (
                            <>
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
                            </>
                        )}

                        {data.type === "Archaeology" && (
                            <>
                                <div className="detail-group">
                                    <p><strong>Origin</strong></p>
                                    <p style={{textAlign: 'right'}}>{data.origin}</p>
                                </div>
                                <hr />
                                <div className="detail-group">
                                    <p><strong>Excavation</strong></p>
                                    <p style={{textAlign: 'right'}}>{data.excavation}</p>
                                </div>
                                <hr />
                                <div className="detail-group">
                                    <p><strong>Age</strong></p>
                                    <p style={{textAlign: 'right'}}>{data.age}</p>
                                </div>
                            </>
                        )}   
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

            {isQropen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <img src={data.arPath} />
                        <button onClick={toggleQR} className="close-modal-btn">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack" viewBox="0 0 16 16">
                                <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z"/>
                                <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0z"/>
                            </svg>
                            <p>BACK TO 3D MODEL</p>
                        </button>
                    </div>
                </div>
            )}

            <PurchaseModel show={showModal} onClose={handleCloseModal} model={data}/>
        </div>
    );
}

export default ViewModelMain;
