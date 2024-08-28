import '../style.css';
import artifacts1 from '../assets/artifacts1.png';
import artifacts2 from '../assets/artifacts2.png';
import { useNavigate } from 'react-router-dom';

function ResultModel() {
    const navigate = useNavigate( );

    const artifacts = [
        {
            name: "Thinly-bedded sedimentary outcrop (Full Scale)",
            location: "Pendang, Kedah",
            imgSrc: artifacts1,
            link: "#"
        },
        // {
        //     name: "Granite rocks",
        //     location: "Kuantan, Pahang",
        //     imgSrc: artifacts2,
        //     link: "#"
        // },
        // ... add more artifacts here
    ];

    return (
        <div className="artifacts-result-page">
            <h1 style={{textAlign: 'left'}}>Models</h1>
            <div className="artifacts-grid">
                {artifacts.map((artifact, index) => (
                    <div className="artifact-card" key={index}>
                        <img src={artifact.imgSrc} alt={artifact.name} className="artifact-image" />
                        <div className="artifact-info">
                            <h3>{artifact.name}</h3>
                            <p>{artifact.location}</p>
                            <button className="view-button" onClick={ () => navigate('/model/view-model')}>
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
