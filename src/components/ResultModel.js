import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';
import model1img from '../assets/model1.png';
import model2img from '../assets/model2.png';
import model3img from '../assets/model3.png';
import model4img from '../assets/model4.png';
import model5img from '../assets/model5.png';
import model6img from '../assets/model6.png';
import model7img from '../assets/model7.png';
import model1 from '../assets/model1.glb';
import model2 from '../assets/model2.glb';
import qr1 from '../assets/qr1.png';
import qr2 from '../assets/qr2.png';
import artifacts1 from '../assets/sample_255.glb';
import artifacts2 from '../assets/sample_10.glb';
import artifacts3 from '../assets/sample_103.glb';
import artifacts4 from '../assets/sample_30.glb';
import artifacts5 from '../assets/sample_291.glb';

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
                keyword: 'kebun 500' // Ensure keyword is properly set
            }
        },
        {
            name: "Sandstone with Pyrite",
            location: "Pokok Sena, Kedah",
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
                keyword: '' // Ensure keyword is defined
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
                discipline: "Archaeology",
                age: "15th-18th century AD",
                origin: "Northern/Central Thailand",
                excavation: "Bidong Island Shipwreck",
                license: "CC Attribution",
                published: "1 year ago",
                downloadPath: artifacts1,
                keyword: 'pulau bidong' // Ensure keyword is properly set
            },
        },
        {
            name: "Late Si Satchanalai Monochrome Glazed Small Jar",
            location: "Kuala Nerus, Terengganu",
            imgSrc: model4img,
            model: artifacts2,
            data: {
                title: "Late Si Satchanalai Monochrome Glazed Small Jar",
                author: "Digital Geoscience Global",
                country: "Malaysia",
                state: "Terengganu",
                district: "Kuala Nerus",
                type: 'Archaeology',
                city: "N/A",
                discipline: "Archaeology",
                age: "15th-18th century AD",
                origin: "Northern/Central Thailand",
                excavation: "Bidong Island Shipwreck",
                license: "CC Attribution",
                published: "1 year ago",
                downloadPath: artifacts1,
                keyword: 'pulau bidong'
            },
        },
        {
            name: "Late Si Satchanalai White Glazed Small Jar",
            location: "Kuala Nerus, Terengganu",
            imgSrc: model5img,
            model: artifacts3,
            data: {
                title: "Late Si Satchanalai White Glazed Small Jar",
                author: "Digital Geoscience Global",
                country: "Malaysia",
                state: "Terengganu",
                district: "Kuala Nerus",
                type: 'Archaeology',
                city: "N/A",
                discipline: "Archaeology",
                age: "15th-18th century AD",
                origin: "Northern/Central Thailand",
                excavation: "Bidong Island Shipwreck",
                license: "CC Attribution",
                published: "1 year ago",
                downloadPath: artifacts1,
                keyword: 'pulau bidong' // Ensure keyword is properly set
            },
        },
        {
            name: "Maenam Noi Unglazed Lid",
            location: "Kuala Nerus, Terengganu",
            imgSrc: model6img,
            model: artifacts4,
            data: {
                title: "Maenam Noi Unglazed Lid",
                author: "Digital Geoscience Global",
                country: "Malaysia",
                state: "Terengganu",
                district: "Kuala Nerus",
                type: 'Archaeology',
                city: "N/A",
                discipline: "Archaeology",
                age: "15th-18th century AD",
                origin: "Northern/Central Thailand",
                excavation: "Bidong Island Shipwreck",
                license: "CC Attribution",
                published: "1 year ago",
                downloadPath: artifacts1,
                keyword: 'pulau bidong' // Ensure keyword is properly set
            },
        },
        {
            name: "Late Si Satchanalai Underglazed Black Small Jar",
            location: "Kuala Nerus, Terengganu",
            imgSrc: model7img,
            model: artifacts5,
            data: {
                title: "Late Si Satchanalai Underglazed Black Small Jar",
                author: "Digital Geoscience Global",
                country: "Malaysia",
                state: "Terengganu",
                district: "Kuala Nerus",
                type: 'Archaeology',
                city: "N/A",
                discipline: "Archaeology",
                age: "15th-18th century AD",
                origin: "Northern/Central Thailand",
                excavation: "Bidong Island Shipwreck",
                license: "CC Attribution",
                published: "1 year ago",
                downloadPath: artifacts1,
                keyword: 'pulau bidong' // Ensure keyword is properly set
            },
        },
        // ... add more artifacts here
    ];

    const [filteredArtifacts, setFilteredArtifacts] = useState(artifacts);

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
    }, [category, keyword]);

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
