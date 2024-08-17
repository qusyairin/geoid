import '../style.css';
import artifacts1 from '../assets/artifacts1.png';
import artifacts2 from '../assets/artifacts2.png';

function Artifacts() {
    const artifacts = [
        {
            name: "Bako National Park",
            location: "Kuching, Sarawak",
            imgSrc: artifacts1,
            link: "#"
        },
        {
            name: "Granite rocks",
            location: "Kuantan, Pahang",
            imgSrc: artifacts2,
            link: "#"
        },
        // ... add more artifacts here
    ];

    return (
        <div className="artifacts-page">
            <h1>Artifacts</h1>
            <div className="search-container">
                <input type="text" placeholder="Search Artifacts" className="search-bar" />
                <button className="search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            </div>
            <div className="artifacts-grid">
                {artifacts.map((artifact, index) => (
                    <div className="artifact-card" key={index}>
                        <img src={artifact.imgSrc} alt={artifact.name} className="artifact-image" />
                        <div className="artifact-info">
                            <h3>{artifact.name}</h3>
                            <p>{artifact.location}</p>
                            <button className="view-button" onClick={() => window.location.href = artifact.link}>
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
