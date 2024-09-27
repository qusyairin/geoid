import "../style.css";
import { useEffect, useState } from "react";

function FilterMenu({ onApplyFilter, reset }) {
    const [filters, setFilters] = useState({
        country: "",
        state: "",
        category: "",
        majorLithology: "",
        discipline: "",
        rockType: "",
        formation: "",
        age: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));

        // Reset geology-related filters when category changes
        if (name === 'category' && value !== 'geology') {
            setFilters(prevFilters => ({
                ...prevFilters,
                majorLithology: "",
                discipline: "",
                rockType: "",
                formation: "",
                age: ""
            }));
        }
    };

    const handleApply = () => {
        onApplyFilter(filters);
    };

    const handleReset = () => {
        setFilters({
            country: "",
            state: "",
            category: "",
            majorLithology: "",
            discipline: "",
            rockType: "",
            formation: "",
            age: ""
        });
        reset();
    };

    return (
        <div
            style={{
                position: "absolute",
                top: "6rem",
                right: "5rem",
                background: "white",
                padding: "10px 15px",
                borderRadius: "8px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
                background: "rgba(181, 32, 94, 0.4)",
                zIndex: 500,
            }}
        >
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: "2rem" }}>
                    <div>
                        <label>
                            <select
                                name="country"
                                className="dropdown"
                                value={filters.country}
                                onChange={handleChange}
                            >
                                <option value="">Country</option>
                                <option value="Malaysia">Malaysia</option>
                            </select>
                        </label>
                    </div>

                    <div className="reset-button" onClick={handleReset} style={{ marginTop: "20px" }}>
                        <button>Reset Search & Filter</button>
                    </div>
                </div>

                <div style={{ marginRight: "2rem" }}>
                    <div>
                        <label>
                            <select
                                name="state"
                                className="dropdown"
                                value={filters.state}
                                onChange={handleChange}
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
                    </div>

                    <div className="apply-button" style={{ marginTop: "20px", color: "#b5205e !important" }}>
                        <button onClick={handleApply}>Apply Filter</button>
                    </div>
                </div>

                <div style={{ marginRight: "2rem" }}>
                    <div>
                        <label>
                            <select
                                name="category"
                                className="dropdown"
                                value={filters.category}
                                onChange={handleChange}
                            >
                                <option value="">Category</option>
                                <option value="geology">Geology</option>
                                <option value="archaeology">Archaeology</option>
                            </select>
                        </label>
                    </div>

                    {filters.category === "geology" && (
                        <div style={{ marginTop: "20px" }}>
                            <div>
                                <label>
                                    <select 
                                        name="majorLithology" 
                                        className="dropdown" 
                                        value={filters.majorLithology} 
                                        onChange={handleChange}
                                    >
                                        <option value="">Major Lithology</option>
                                        <option value="chert">Chert</option>
                                        <option value="phyllite">Phyllite & quartzite metasediment</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                {filters.category === "geology" && (
                    <>
                        <div style={{ marginRight: "2rem" }}>
                            <div>
                                <label>
                                    <select 
                                        name="discipline" 
                                        className="dropdown" 
                                        value={filters.discipline} 
                                        onChange={handleChange}
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
                            </div>

                            <div style={{ marginTop: "20px" }}>
                                <label>
                                    <select 
                                        name="rockType" 
                                        className="dropdown" 
                                        value={filters.rockType} 
                                        onChange={handleChange}
                                    >
                                        <option value="">Type of Rock</option>
                                        <option value="sedimentary">Sedimentary Rock</option>
                                        <option value="igneous">Igneous Rock</option>
                                        <option value="metamorphic">Metamorphic Rock</option>
                                        <option value="mineral">Mineral</option>
                                        <option value="fossil">Fossil</option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <div style={{ marginRight: "2rem" }}>
                            <div>
                                <label>
                                    <select 
                                        name="formation" 
                                        className="dropdown" 
                                        value={filters.formation} 
                                        onChange={handleChange}
                                    >
                                        <option value="">Formation</option>
                                        <option value="semanggol">Semanggol Formation</option>
                                        <option value="labang">Labang Formation</option>
                                        <option value="kuantan">Kuantan Group</option>
                                    </select>
                                </label>
                            </div>

                            <div style={{ marginTop: "20px" }}>
                                <label>
                                    <select 
                                        name="age" 
                                        className="dropdown" 
                                        value={filters.age} 
                                        onChange={handleChange}
                                    >
                                        <option value="">Age</option>
                                        <option value="triassic">Triassic</option>
                                        <option value="permian">Early Permian - Middle Triassic</option>
                                        <option value="oligocene">Oligocene - Lower Miocene</option>
                                        <option value="carboniferous">Carboniferous</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default FilterMenu;