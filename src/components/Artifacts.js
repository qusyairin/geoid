import '../style.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero3.png'
import heroImage2 from '../assets/heroimage2.png'

function Artifacts() {
    const navigate = useNavigate();
    const [artifacts, setArtifacts] = useState([]);
    const [filteredArtifacts, setFilteredArtifacts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [loading, setLoading] = useState(true); // Loading state
    const [filterOpen, setFilterOpen] = useState(false);

    const toggleFilter = () => {
        setFilterOpen(!filterOpen)
    }
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

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase(); // Don't trim while typing
        setSearchKeyword(keyword);

        if (keyword.trim() !== '') { // Only trim when filtering
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
        <div>
            <section className="hero-model">
                {/* <img className='hero-image' src={heroImage}/> */}
                <div>
                    <h1>the earth holds stories untold</h1>
                    <p>Explore all of our 3D Models</p>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search name, location, category, keyword, type & etc..."
                            className="search-bar-page"
                            value={searchKeyword}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                {/* <img className='hero-image2' src={heroImage2}/> */}
                {/* <div className="triangle triangle1"></div>
                <div className="triangle triangle2"></div>
                <div className="triangle triangle3"></div>
                <div className="triangle triangle4"></div>
                <div className="triangle triangle5"></div>
                <div className="triangle triangle6"></div>
                <div className="triangle triangle7"></div>
                <div className="triangle triangle8"></div>
                <div className="triangle triangle9"></div> */}
            </section>
            <div className="model-page" >
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
                    {filteredArtifacts.map((artifact, index) => (
                        <div className="artifact-card" key={index}>
                            <img src={artifact.imgSrc} alt={artifact.name} className="artifact-image" />
                            <div className="artifact-info">
                            <h3>
                                {artifact.name.length > 27 
                                    ? `${artifact.name.slice(0, 27)}...` 
                                    : artifact.name}
                            </h3>
                                <p>{artifact.location}</p>
                            </div>
                            <div>
                            <button className="view-button-model" onClick={() => handleViewModel(artifact.model, artifact.data)}>
                                    View 3D Model >
                            </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Artifacts;