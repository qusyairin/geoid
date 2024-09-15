import '../style.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Artifacts() {
    const navigate = useNavigate();
    const [artifacts, setArtifacts] = useState([]);
    const [filteredArtifacts, setFilteredArtifacts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [loading, setLoading] = useState(true); // Loading state

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
                setLoading(false); // Stop loading after data is fetched
            }
        };

        fetchArtifacts();
    }, []);

    // Handle navigation to view 3D model
    const handleViewModel = (model, data) => {
        navigate('/model/view-model', { state: { model, data } });
    };

    // Handle search
    const handleSearch = () => {
        if (searchKeyword.trim() !== '') {
            const filtered = artifacts.filter(artifact =>
                artifact.data.keyword.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            setFilteredArtifacts(filtered);
        } else {
            setFilteredArtifacts(artifacts);
        }
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <p>Loading data...</p>
            </div>
        );
    }

    return (
        <div className="report-page">
            <h1>Models</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search Model"
                    className="search-bar"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            </div>
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

export default Artifacts;