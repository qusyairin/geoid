import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function ResultModel({ filters, keyword }) {
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
                const publicModel = data.filter(model => model.access === 'public');
                setArtifacts(publicModel);
                setFilteredArtifacts(publicModel);
            } catch (error) {
                console.error('Error fetching artifacts:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchArtifacts();
    }, []);

    useEffect(() => {
        let filtered = artifacts;

        // Apply filters
        if (filters.country) {
            filtered = filtered.filter(artifact => artifact.data.country?.toLowerCase() === filters.country.toLowerCase());
        }
        if (filters.state) {
            filtered = filtered.filter(artifact => artifact.data.state?.toLowerCase() === filters.state.toLowerCase());
        }
        if (filters.category) {
            filtered = filtered.filter(artifact => artifact.data.type?.toLowerCase() === filters.category.toLowerCase());
        }
        if (filters.majorLithology) {
            filtered = filtered.filter(artifact => artifact.data.majorLithology?.toLowerCase() === filters.majorLithology.toLowerCase());
        }
        if (filters.discipline) {
            filtered = filtered.filter(artifact => artifact.data.discipline?.toLowerCase() === filters.discipline.toLowerCase());
        }
        if (filters.rockType) {
            filtered = filtered.filter(artifact => artifact.data.rockType?.toLowerCase() === filters.rockType.toLowerCase());
        }
        if (filters.formation) {
            filtered = filtered.filter(artifact => artifact.data.formation?.toLowerCase() === filters.formation.toLowerCase());
        }
        if (filters.age) {
            filtered = filtered.filter(artifact => artifact.data.age?.toLowerCase() === filters.age.toLowerCase());
        }

        // Apply keyword filter
        if (keyword) {
            filtered = filtered.filter(artifact => 
                artifact.name?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.location?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.data?.title?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.data?.author?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.data?.country?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.data?.state?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.data?.district?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.data?.city?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.data?.type?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.data?.discipline?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.data?.formation?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.data?.rockType?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.data?.majorLithology?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.data?.age?.toLowerCase().includes(keyword.toLowerCase()) ||
                artifact.data?.keyword?.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        setFilteredArtifacts(filtered);
    }, [filters, keyword, artifacts]);

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
        <div className="artifact-result-page">
            <p style={{ textAlign: 'left' }}>Models: {resultCount} result{resultCount !== 1 ? 's' : ''} found</p>
            <div className="artifact-result-grid">
                {filteredArtifacts.map((artifact, index) => (
                    <div className="artifact-result-card" key={index}>
                        <img src={artifact.imgSrc} alt={artifact.name} className="artifact-result-image" />
                        <div className="artifact-result-info">
                            <h3>{artifact.name}</h3>
                            <p>{artifact.location}</p>
                            <button className="artifact-result-view-button" onClick={() => handleViewModel(artifact.model, artifact.data)}>
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