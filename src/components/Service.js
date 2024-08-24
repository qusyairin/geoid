import "../style.css";
import service1 from '../assets/service1.jpeg';
import service2 from '../assets/service2.png';

function Service() {
    const artifacts = [
        {
            name: "Bako National Park",
            location: "Kuching, Sarawak",
            imgSrc: service1,
            link: "#"
        },
        {
            name: "Granite rocks",
            location: "Kuantan, Pahang",
            imgSrc: service2,
            link: "#"
        },
        // ... add more artifacts here
    ];

    return (
        <div className="artifacts-page">
            <h1>Service / Training</h1>
            <div className="search-container">
                <input type="text" placeholder="Search Service / Training" className="search-bar" />
                <button className="search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            </div>
            <div className="artifacts-grid">
                {artifacts.map((artifact, index) => (
                    <div className="multimedia-card" key={index}>
                        <img src={artifact.imgSrc} alt={artifact.name} className="multimedia-image" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Service;