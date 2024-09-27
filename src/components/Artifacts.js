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
                const publicModel = data.filter(model => model.access === 'public');
                setArtifacts(publicModel);
                setFilteredArtifacts(publicModel);
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
    const handleSearch = (e) => {
        const keyword = e.target.value.trim().toLowerCase();
        setSearchKeyword(keyword);
    
        if (keyword !== '') {
            const filtered = artifacts.filter(artifact => {
                return (
                    artifact.name?.toLowerCase().includes(keyword) ||
                    artifact.location?.toLowerCase().includes(keyword) ||
                    artifact.data?.title?.toLowerCase().includes(keyword) ||
                    artifact.data?.author?.toLowerCase().includes(keyword) ||
                    artifact.data?.country?.toLowerCase().includes(keyword) ||
                    artifact.data?.state?.toLowerCase().includes(keyword) ||
                    artifact.data?.district?.toLowerCase().includes(keyword) ||
                    artifact.data?.city?.toLowerCase().includes(keyword) ||
                    artifact.data?.type?.toLowerCase().includes(keyword) ||
                    artifact.data?.discipline?.toLowerCase().includes(keyword) ||
                    artifact.data?.formation?.toLowerCase().includes(keyword) ||
                    artifact.data?.rockType?.toLowerCase().includes(keyword) ||
                    artifact.data?.majorLithology?.toLowerCase().includes(keyword) ||
                    artifact.data?.age?.toLowerCase().includes(keyword) ||
                    artifact.data?.keyword?.toLowerCase().includes(keyword)
                );
            });
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
                    placeholder="Search name, location, category, keyword, type & etc..."
                    className="search-bar"
                    value={searchKeyword}
                    onChange={handleSearch}
                />
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