import React, { useState } from 'react';
import '../../style.css'; // Adjust to your path if needed

function AdvancedSearchModal({ isOpen, onClose }) {
    const [searchRows, setSearchRows] = useState([{ id: Date.now(), isInitial: true }]);

    if (!isOpen) return null;

    const addRow = () => {
        setSearchRows([...searchRows, { id: Date.now() }]);
    };

    const removeRow = (id) => {
        setSearchRows(searchRows.filter(row => row.id !== id));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content-adv-search">
                <h2 style={{ textAlign: 'left' }}>Advanced Search</h2>
                <form className="advanced-search-form">
                    <div className="form-group">
                        <div className="checkbox-group">
                            <label><input type="checkbox" /> All GeoID content</label>
                            <label><input type="checkbox" /> Report/journal</label>
                            <label><input type="checkbox" /> Model</label>
                            <label><input type="checkbox" /> Multimedia</label>
                        </div>
                    </div>

                    {searchRows.map((row) => (
                        <div className="form-group" key={row.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', width: '100%' }}>
                                {!row.isInitial && (
                                    <select style={{ marginRight: '10px', padding: '10px' }}>
                                        <option value="and">AND</option>
                                        <option value="or">OR</option>
                                    </select>
                                )}
                                <input 
                                    type="text" 
                                    placeholder="Enter your search terms here" 
                                    style={{ flexGrow: 1, padding: '10px', marginRight: '10px', flexShrink: 1 }} 
                                />
                                <span style={{ marginRight: '10px' }}>in</span>
                                <select style={{ width: '150px', padding: '10px', marginRight: '10px', flexShrink: 0 }}>
                                    <option value="all">All Fields</option>
                                    <option value="discipline">Discipline</option>
                                    <option value="accession">Accession Number</option>
                                    <option value="publicationType">Type of publication</option>
                                    <option value="publicationYear">Year of publication</option>
                                    <option value="author">Author(s)</option>
                                    <option value="Accession">Accession Number</option>
                                    <option value="reportName">Name of journal/ magazine/ book</option>
                                    <option value="title">Title</option>
                                </select>
                                {!row.isInitial && (
                                    <button 
                                        type="button" 
                                        onClick={() => removeRow(row.id)} 
                                        style={{ color: 'white', border: 'none', borderRadius: '3px', height: '30px', width: '30px', backgroundColor: '#2a699d', cursor: 'pointer', marginLeft: '10px' }}
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="form-group">
                        <button type="button" className="add-row-button" onClick={addRow}>Add row</button>
                    </div>

                    <div className="form-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '20px'}}>
                        <label style={{ flexShrink: 0, fontSize: 'large'}}>Date range</label>
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', gap: '10px', flexGrow: 1 }}>
                            <span>From</span>
                            <input type="text" placeholder="Year" style={{ flexShrink: 1 }} />
                            <span>To</span>
                            <input type="text" placeholder="Year" style={{ flexShrink: 1 }} />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>Close</button>
                        <button type="submit">Search</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdvancedSearchModal;