import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function ResultModel({ category, keyword }) {
    const navigate = useNavigate();
    const [artifacts, setArtifacts] = useState([]);
    const [filteredArtifacts, setFilteredArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from API
    useEffect(() => {
        const fetchArtifacts = async () => {
            try {
                setLoading(true); // Start loading
                const response = await fetch('https://geoid-rest.vercel.app/models');
                const data = await response.json();
                setArtifacts(data);
                setFilteredArtifacts(data);
            } catch (error) {
                console.error('Error fetching artifacts:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchArtifacts();
    }, []);

    useEffect(() => {
        // Safeguards for category and keyword
        const categoryFilter = category ? category.toLowerCase() : '';
        const keywordFilter = keyword ? keyword.toLowerCase() : '';

        let filtered = artifacts;

        if (categoryFilter) {
            filtered = filtered.filter(artifact => artifact.data.type.toLowerCase() === categoryFilter);
        }

        if (keywordFilter) {
            filtered = filtered.filter(artifact => artifact.data.keyword?.toLowerCase() === keywordFilter);
        }

        setFilteredArtifacts(filtered);
    }, [category, keyword, artifacts]);

    const resultCount = filteredArtifacts.length;

    const handleViewModel = (model, data) => {
        navigate('/model/view-model', { state: { model, data } });
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <p>Loading data...</p>
            </div>
        );
    }

    return (
        <div className="artifacts-result-page">
            <h1 style={{ textAlign: 'left' }}>Models: {resultCount} result{resultCount !== 1 ? 's' : ''} found</h1>
            <div className="artifacts-grid">
                {filteredArtifacts.map((artifact, index) => (
                    <div className="artifact-card" key={index}>
                        <img src={artifact.imgSrc} alt={artifact.name} className="artifact-image" />
                        <div className="artifact-info">
                            <h3>{artifact.name}</h3>
                            <p>{artifact.location}</p>
                            <button className="view-button" onClick={() => handleViewModel(artifact.model, artifact.data)}>
                                View 3D Model >
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResultModel;