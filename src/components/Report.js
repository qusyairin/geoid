import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css'; // Ensure you have a CSS file for custom styling
import Purchase from './modal/Purchase';

function Report() {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedReports, setExpandedReports] = useState({});
    const [filterOpen, setFilterOpen] = useState(false);

    const toggleFilter = () => {
        setFilterOpen(!filterOpen)
    }

    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true); // Start loading
                const response = await axios.get('https://geoid-rest.vercel.app/paper_report');
                const publicReports = response.data.filter(report => report.access === 'public');
                setReports(publicReports);
                setFilteredReports(publicReports);
            } catch (error) {
                console.error("There was an error fetching the reports!", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = reports.filter(report =>
            report.title.toLowerCase().includes(lowercasedQuery) ||
            report.author.toLowerCase().includes(lowercasedQuery) ||
            report.category.toLowerCase().includes(lowercasedQuery) ||
            report.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
        );
        setFilteredReports(filtered);
    }, [searchQuery, reports]);

    const handlePurchaseClick = (report) => {
        setSelectedReport(report);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReport(null);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const toggleDescription = (index) => {
        setExpandedReports(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <p>Loading data...</p>
            </div>
        );
    }

    return (
        <div>
            <section className="hero-report">
                <div>
                    <h1>every layer holds a piece of history</h1>
                    <p>Explore all of our reports & journals</p>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search title, author, category, keywords..."
                            className="search-bar-page"
                            value={searchQuery}
                            onChange={handleSearchChange} // Handle search input changes
                        />
                    </div>
                </div>
            </section>
            <div className="model-page">
            <div className='filterMenuMobile'>
                    <div onClick={() => toggleFilter()}>
                        Filter
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00712D" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </div>
                    {filterOpen && (
                        <>
                            <p style={{textAlign: 'left'}}>State</p>
                                <label>
                                    <select
                                        name="state"
                                        className="dropdown"
                                        // value={filters.country}
                                        // onChange={handleChange}
                                        style={{width: '100%'}}
                                    >
                                    <option value="">State</option>
                                        <option value="terengganu">Terengganu</option>
                                        <option value="kedah">Kedah</option>
                                        <option value="johor">Johor</option>
                                        <option value="kelantan">Kelantan</option>
                                        <option value="malacca">Malacca</option>
                                        <option value="negeri-sembilan">Negeri Sembilan</option>
                                        <option value="pahang">Pahang</option>
                                        <option value="penang">Penang</option>
                                        <option value="perak">Perak</option>
                                        <option value="perlis">Perlis</option>
                                        <option value="sabah">Sabah</option>
                                        <option value="sarawak">Sarawak</option>
                                        <option value="selangor">Selangor</option>
                                        <option value="kuala-lumpur">Kuala Lumpur</option>
                                        <option value="labuan">Labuan</option>
                                        <option value="putrajaya">Putrajaya</option>
                                    </select>
                                </label>
                                <p style={{textAlign: 'left'}}>Category</p>
                                <label>
                                    <select
                                        name="category"
                                        className="dropdown"
                                        // value={filters.country}
                                        // onChange={handleChange}
                                        style={{width: '100%'}}
                                    >
                                        <option value="">Category</option>
                                        <option value="geology">Geology</option>
                                        <option value="archaeology">Archaeology</option>
                                    </select>
                                </label>
                                <p style={{textAlign: 'left'}}>Disciplines</p>
                                <label>
                                    <select
                                        name="disciplines"
                                        className="dropdown"
                                        // value={filters.country}
                                        // onChange={handleChange}
                                        style={{width: '100%'}}
                                    >
                                        <option value="">Disciplines</option>
                                        <option value="gAll">Geology - all</option>
                                        <option value="gGeneral">Geology - general</option>
                                        <option value="gONG">Geology - oil & gas</option>
                                        <option value="gMining">Geology - mining</option>
                                        <option value="gEngineering">Geology - engineering/geotechnical</option>
                                        <option value="gEnvironment">Geology - environment</option>
                                    </select>
                                </label>
                                <p style={{textAlign: 'left'}}>Type of Rocks</p>
                                <label>
                                    <select
                                        name="rockType"
                                        className="dropdown"
                                        // value={filters.country}
                                        // onChange={handleChange}
                                        style={{width: '100%'}}
                                    >
                                        <option value="">Type of Rock</option>
                                        <option value="sedimentary">Sedimentary Rock</option>
                                        <option value="igneous">Igneous Rock</option>
                                        <option value="metamorphic">Metamorphic Rock</option>
                                        <option value="mineral">Mineral</option>
                                        <option value="fossil">Fossil</option>
                                    </select>
                                </label>
                                <p style={{textAlign: 'left'}}>Major Lithology</p>
                                <label>
                                    <select
                                        name="majorLithology"
                                        className="dropdown"
                                        // value={filters.country}
                                        // onChange={handleChange}
                                        style={{width: '100%'}}
                                    >
                                        <option value="">Major Lithology</option>
                                        <option value="chert">Chert</option>
                                        <option value="phyllite">Phyllite & quartzite metasediment</option>
                                    </select>
                                </label>
                                <p style={{textAlign: 'left'}}>Formation</p>
                                <label>
                                    <select
                                        name="formation"
                                        className="dropdown"
                                        // value={filters.country}
                                        // onChange={handleChange}
                                        style={{width: '100%'}}
                                    >
                                        <option value="">Formation</option>
                                        <option value="semanggol">Semanggol Formation</option>
                                        <option value="labang">Labang Formation</option>
                                        <option value="kuantan">Kuantan Group</option>
                                    </select>
                                </label>
                                <p style={{textAlign: 'left'}}>Age</p>
                                <label>
                                    <select
                                        name="age"
                                        className="dropdown"
                                        // value={filters.country}
                                        // onChange={handleChange}
                                        style={{width: '100%'}}
                                    >
                                        <option value="">Age</option>
                                        <option value="triassic">Triassic</option>
                                        <option value="permian">Early Permian - Middle Triassic</option>
                                        <option value="oligocene">Oligocene - Lower Miocene</option>
                                        <option value="carboniferous">Carboniferous</option>
                                    </select>
                                </label>
                                <button className='reset-btn-model' >Reset Filter</button>
                                <button className='apply-btn-model' >Apply Filter</button>
                        </>
                    )}
                </div>
                <div className='filterMenuBox'>
                    <p style={{textAlign: 'left'}}>State</p>
                    <label>
                        <select
                            name="state"
                            className="dropdown"
                            // value={filters.country}
                            // onChange={handleChange}
                            style={{width: '100%'}}
                        >
                           <option value="">State</option>
                            <option value="terengganu">Terengganu</option>
                            <option value="kedah">Kedah</option>
                            <option value="johor">Johor</option>
                            <option value="kelantan">Kelantan</option>
                            <option value="malacca">Malacca</option>
                            <option value="negeri-sembilan">Negeri Sembilan</option>
                            <option value="pahang">Pahang</option>
                            <option value="penang">Penang</option>
                            <option value="perak">Perak</option>
                            <option value="perlis">Perlis</option>
                            <option value="sabah">Sabah</option>
                            <option value="sarawak">Sarawak</option>
                            <option value="selangor">Selangor</option>
                            <option value="kuala-lumpur">Kuala Lumpur</option>
                            <option value="labuan">Labuan</option>
                            <option value="putrajaya">Putrajaya</option>
                        </select>
                    </label>
                    <p style={{textAlign: 'left'}}>Category</p>
                    <label>
                        <select
                            name="category"
                            className="dropdown"
                            // value={filters.country}
                            // onChange={handleChange}
                            style={{width: '100%'}}
                        >
                            <option value="">Category</option>
                            <option value="geology">Geology</option>
                            <option value="archaeology">Archaeology</option>
                        </select>
                    </label>
                    <p style={{textAlign: 'left'}}>Disciplines</p>
                    <label>
                        <select
                            name="disciplines"
                            className="dropdown"
                            // value={filters.country}
                            // onChange={handleChange}
                            style={{width: '100%'}}
                        >
                            <option value="">Disciplines</option>
                            <option value="gAll">Geology - all</option>
                            <option value="gGeneral">Geology - general</option>
                            <option value="gONG">Geology - oil & gas</option>
                            <option value="gMining">Geology - mining</option>
                            <option value="gEngineering">Geology - engineering/geotechnical</option>
                            <option value="gEnvironment">Geology - environment</option>
                        </select>
                    </label>
                    <p style={{textAlign: 'left'}}>Type of Rocks</p>
                    <label>
                        <select
                            name="rockType"
                            className="dropdown"
                            // value={filters.country}
                            // onChange={handleChange}
                            style={{width: '100%'}}
                        >
                            <option value="">Type of Rock</option>
                            <option value="sedimentary">Sedimentary Rock</option>
                            <option value="igneous">Igneous Rock</option>
                            <option value="metamorphic">Metamorphic Rock</option>
                            <option value="mineral">Mineral</option>
                            <option value="fossil">Fossil</option>
                        </select>
                    </label>
                    <p style={{textAlign: 'left'}}>Major Lithology</p>
                    <label>
                        <select
                            name="majorLithology"
                            className="dropdown"
                            // value={filters.country}
                            // onChange={handleChange}
                            style={{width: '100%'}}
                        >
                            <option value="">Major Lithology</option>
                            <option value="chert">Chert</option>
                            <option value="phyllite">Phyllite & quartzite metasediment</option>
                        </select>
                    </label>
                    <p style={{textAlign: 'left'}}>Formation</p>
                    <label>
                        <select
                            name="formation"
                            className="dropdown"
                            // value={filters.country}
                            // onChange={handleChange}
                            style={{width: '100%'}}
                        >
                            <option value="">Formation</option>
                            <option value="semanggol">Semanggol Formation</option>
                            <option value="labang">Labang Formation</option>
                            <option value="kuantan">Kuantan Group</option>
                        </select>
                    </label>
                    <p style={{textAlign: 'left'}}>Age</p>
                    <label>
                        <select
                            name="age"
                            className="dropdown"
                            // value={filters.country}
                            // onChange={handleChange}
                            style={{width: '100%'}}
                        >
                            <option value="">Age</option>
                            <option value="triassic">Triassic</option>
                            <option value="permian">Early Permian - Middle Triassic</option>
                            <option value="oligocene">Oligocene - Lower Miocene</option>
                            <option value="carboniferous">Carboniferous</option>
                        </select>
                    </label>
                    <button className='reset-btn-model' >Reset Filter</button>
                    <button className='apply-btn-model' >Apply Filter</button>
                </div>
                <div className="reports-list">
                    {filteredReports.map((report, index) => (
                        <div className="report-card" key={index}>
                            <div>
                                <h3 className="report-title">{report.title}</h3>
                                <p className="report-description">{report.author} • {report.year} • {report.linkSource}</p>
                                <p className="report-description">
                                    {expandedReports[index] || report.description.length <= 170
                                        ? report.description
                                        : `${report.description.slice(0, 170)}...`}
                                    {report.description.length > 170 && (
                                        <p className="view-more" onClick={() => toggleDescription(index)}>
                                            {expandedReports[index] ? 'View Less' : 'View More'}
                                        </p>
                                    )}
                                </p>
                                <div className="report-tags">
                                    {report.tags.map((tag, idx) => (
                                        <span className="report-tag" key={idx}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className='report-download'>
                                <a href={report.file} target="_blank" download style={{ textDecoration: 'none' }}>
                                    <p className='download-button'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-pdf-fill" viewBox="0 0 16 16">
                                            <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z"/>
                                            <path fillRule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103"/>
                                        </svg>
                                        &nbsp;PDF
                                    </p>
                                </a>

                                <a href={report.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                    <p className='download-button'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filetype-html" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zm-9.736 7.35v3.999h-.791v-1.714H1.79v1.714H1V11.85h.791v1.626h1.682V11.85h.79Zm2.251.662v3.337h-.794v-3.337H4.588v-.662h3.064v.662zm2.366.292v2.976h-.794v-1.705l-1.736.014v-1.565l1.736.015v-1.61h.794Zm4.458-1.748v-3.835a.5.5 0 0 1 .5-.5h2.5a.5.5 0 0 1 .5.5v3.835a.5.5 0 0 1-.5.5h-2.5a.5.5 0 0 1-.5-.5Zm.5-1h1v-1.835h-1v1.835Z"/>
                                        </svg>
                                        &nbsp;HTML
                                    </p>
                                </a>

                                <p className='download-button' onClick={() => handlePurchaseClick(report)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-stack" viewBox="0 0 16 16">
                                        <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                        <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"/>
                                    </svg>&nbsp;Purchase
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for purchase */}
                {showModal && (
                    <Purchase
                        report={selectedReport}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
}

export default Report;