import React, { useState, useEffect, useCallback } from 'react';
import "../style.css";
import ImageViewer from 'react-simple-image-viewer';
import VideoViewer from './modal/VideoViewer';
import axios from 'axios';

function Multimedia() {
    const [mediaItems, setMediaItems] = useState([]);
    const [filteredMediaItems, setFilteredMediaItems] = useState([]);
    const [currentMedia, setCurrentMedia] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    const [searchKeyword, setSearchKeyword] = useState(""); // Search keyword state
    const [filterOpen, setFilterOpen] = useState(false);

    const toggleFilter = () => {
        setFilterOpen(!filterOpen)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Start loading
                const response = await axios.get('https://geoid-rest.vercel.app/media');
                const publicMedia = response.data.filter(media => media.access === 'public');
                setMediaItems(publicMedia);
                setFilteredMediaItems(publicMedia); // Initialize filtered items
            } catch (error) {
                console.error('Error fetching multimedia data:', error);
            } finally {
                setLoading(false); // Stop loading after data is fetched
            }
        };

        fetchData();
    }, []);

    const openMediaViewer = useCallback((index) => {
        const media = filteredMediaItems[index]; // Use filtered items for viewer
        setCurrentMedia(index);
        setIsVideo(media.type === "video");
        setIsViewerOpen(true);
    }, [filteredMediaItems]);

    const closeMediaViewer = () => {
        setIsViewerOpen(false);
    };

    // Handle search
    const handleSearch = (e) => {
        const keyword = e.target.value.trim().toLowerCase();
        setSearchKeyword(keyword);

        const filtered = mediaItems.filter(item =>
            item.name.toLowerCase().includes(keyword) ||
            item.location.toLowerCase().includes(keyword) ||
            item.category.toLowerCase().includes(keyword)
        );
        setFilteredMediaItems(filtered);
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
            <section className="hero-media">
                <div>
                    <h1>digging is discovering forgotten lives</h1>
                    <p>Explore all of our captured media</p>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search name, location, category..."
                            className="search-bar-page"
                            value={searchKeyword}
                            onChange={handleSearch}
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
                <div className="artifacts-grid-model">
                    {filteredMediaItems.map((item, index) => (
                        <div className="artifact-card" key={item._id} onClick={() => openMediaViewer(index)}>
                            {item.type === "image" ? (
                                <img src={item.imgSrc} alt={item.name} className="artifact-image" />
                            ) : (
                                <video className="artifact-image" src={item.imgSrc} alt={item.name} />
                            )}
                            <div className="artifact-info">
                                <h3>{item.name}</h3>
                                <p>{item.location}</p>
                                <button className="view-button">
                                    View Media >
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {isViewerOpen && (isVideo ? (
                    <VideoViewer
                        src={mediaItems[currentMedia].imgSrc} // Pass video source
                        onClose={closeMediaViewer}
                    />
                ) : (
                    <ImageViewer
                        src={filteredMediaItems.map(item => item.imgSrc)} // Pass all image sources
                        currentIndex={currentMedia}
                        onClose={closeMediaViewer}
                        backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 3000 }} // Ensure high z-index
                        closeOnClickOutside={true} // Optional: close the viewer when clicking outside
                    />
                ))}
            </div>
        </div>
    );
}

export default Multimedia;