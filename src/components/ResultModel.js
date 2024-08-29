import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';
import model1img from '../assets/model1.png';
import model2img from '../assets/model2.png';
import model3img from '../assets/model3.png';
import model1 from '../assets/model1.glb';
import model2 from '../assets/model2.glb';
import qr1 from '../assets/qr1.png';
import qr2 from '../assets/qr2.png';
import artifacts1 from '../assets/artifacts1.glb';

function ResultModel({ category, keyword }) {
    const navigate = useNavigate();

    const artifacts = [
        {
            name: "Thinly-bedded sedimentary rocks",
            location: "Pendang, Kedah",
            imgSrc: model1img,
            model: model1,
            data: {
                title: "Thinly-bedded sedimentary outcrop",
                author: "Digital Geoscience Global",
                country: "Malaysia",
                state: "Kedah",
                district: "Pendang",
                city: "N/A",
                type: 'Geology',
                discipline: "General Geology",
                formation: "Semanggol Formation",
                rockType: "Sedimentary Rock",
                majorLithology: "Chert",
                age: "Triassic",
                license: "CC Attribution",
                published: "2 years ago",
                downloadPath: model1,
                arPath: qr1,
                keyword: 'kebun 500'
            }
        },
        {
            name: "Sandstone with Pyrite",
            location: "Sukau, Sabah",
            imgSrc: model2img,
            model: model2,
            data: {
                title: "Sandstone with Pyrite",
                author: "Digital Geoscience Global",
                country: "Malaysia",
                state: "Sabah",
                district: "Sukau",
                type: 'Geology',
                city: "N/A",
                discipline: "General Geology",
                formation: "Semanggol Formation",
                rockType: "Sedimentary Rock",
                majorLithology: "-",
                age: "Early Permian - Middle Triassic",
                license: "CC Attribution",
                published: "1 year ago",
                downloadPath: model2,
                arPath: qr2,
            },
        },
        {
            name: "Maenam Noi Brown Glazed Jar with Four Loop Handles",
            location: "Kuala Nerus, Terengganu",
            imgSrc: model3img,
            model: artifacts1,
            data: {
                title: "Maenam Noi Brown Glazed Jar with Four Loop Handles",
                author: "Digital Geoscience Global",
                country: "Malaysia",
                state: "Terengganu",
                district: "Kuala Nerus",
                type: 'Archaeology',
                city: "N/A",
                discipline: "General Geology",
                age: "15th-18th century AD",
                origin: "Northern/Central Thailand",
                excavation: "Bidong Island Shipwreck",
                license: "CC Attribution",
                published: "1 year ago",
                downloadPath: artifacts1,
                keyword: 'pulau bidong'
            },
        },
        // ... add more artifacts here
    ];

    const [filteredArtifacts, setFilteredArtifacts] = useState(artifacts);

    useEffect(() => {
        if (category) {
            setFilteredArtifacts(artifacts.filter(artifact => artifact.data.type.toLowerCase() === category.toLowerCase()));
        } else {
            setFilteredArtifacts(artifacts);
        }
    }, [category]);

    const resultCount = filteredArtifacts.length;

    const handleViewModel = (model, data) => {
        navigate('/model/view-model', { state: { model, data } });
    };

    return (
        <div className="artifacts-result-page">
            <h1 style={{ textAlign: 'left' }}>Models : {resultCount} result{resultCount !== 1 ? 's' : ''} found</h1>
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
