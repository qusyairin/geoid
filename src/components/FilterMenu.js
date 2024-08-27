import "../style.css";
import { useState } from "react";

function FilterMenu({ onApplyFilter }) {
    const [category, setCategory] = useState("");

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
                background: "rgba(42, 157, 143, 0.5)",
                zIndex: 1000,
            }}
        >
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '2rem' }}>
                    <div>
                        <label>
                            <select className="dropdown">
                                <option value="" selected>
                                    Country
                                </option>
                                <option value="Malaysia">Malaysia</option>
                            </select>
                        </label>
                    </div>

                    <div className="reset-button" style={{ marginTop: '20px' }}>
                        <button>Reset</button>
                    </div>
                </div>

                <div style={{ marginRight: '2rem' }}>
                    <div>
                        <label>
                            <select
                                className="dropdown"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="" selected>
                                    Category
                                </option>
                                <option value="geology">Geology</option>
                                <option value="archeology">Archeology</option>
                            </select>
                        </label>
                    </div>

                    <div className="apply-button" style={{ marginTop: '20px' }}>
                        <button onClick={onApplyFilter}>Apply Filter</button>
                    </div>
                </div>

                <div style={{ marginRight: '2rem' }}>
                    <div>
                        <label>
                            <select className="dropdown">
                                <option value="" selected>
                                    Disciplines of Geology
                                </option>
                                <option value="Mining Geology">Mining Geology</option>
                                <option value="Engineering Geology">
                                    Engineering Geology
                                </option>
                                <option value="Petroleum Geology">Petroleum Geology</option>
                                <option value="Environmental Geology">
                                    Environmental Geology
                                </option>
                                <option value="General Geology">General Geology</option>
                            </select>
                        </label>
                    </div>

                    {category === "Geology" && (
                        <>
                            <div style={{ marginTop: '20px' }}>
                                <label>
                                    <select className="dropdown">
                                        <option value="" selected>
                                            Type of Rock
                                        </option>
                                        <option value="Malaysia">Malaysia</option>
                                    </select>
                                </label>
                            </div>
                        </>
                    )}
                </div>

                {category === "Geology" && (
                    <>
                        <div style={{ marginRight: '2rem' }}>
                            <div>
                                <label>
                                    <select className="dropdown">
                                        <option value="" selected>
                                            Formation
                                        </option>
                                        <option value="Malaysia">Malaysia</option>
                                    </select>
                                </label>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <label>
                                    <select className="dropdown">
                                        <option value="" selected>
                                            Age
                                        </option>
                                        <option value="Malaysia">Malaysia</option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <div>
                            <div>
                                <label>
                                    <select className="dropdown">
                                        <option value="" selected>
                                            Major Lithology
                                        </option>
                                        <option value="Malaysia">Malaysia</option>
                                    </select>
                                </label>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <label>
                                    <select className="dropdown">
                                        <option value="" selected>
                                            Fossil
                                        </option>
                                        <option value="Malaysia">Malaysia</option>
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
