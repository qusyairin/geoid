import "../style.css";

function FilterMenu(){
    return(
        <div
        style={{
          position: "absolute",
          top: "6rem",
          right: "5rem",
          background: "white",
          padding: "10px 15px",
          borderRadius: "8px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
          background: "rgba(42, 157, 143, 0.5)", // Slightly transparent background
          zIndex: 1000, // Ensure it appears above the map
        }}
      >

        <div style={{display: 'flex'}}>
            <div style={{marginRight: '2rem'}}>
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

                <div className="reset-button" style={{ marginTop: '20px'}}>
                  <button>Reset</button>
                 </div>
            </div>

            <div style={{marginRight: '2rem'}}>
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


                <div className="login-button" style={{ marginTop: '20px'}}>
                  <button>Apply Filter</button>
                 </div>
            </div>

            <div style={{marginRight: '2rem'}}>
                <div>
                <label>
                    <select className="dropdown">
                        <option value="" selected>
                            Age
                        </option>
                        <option value="Malaysia">Malaysia</option>
                    </select>
                </label>
                </div>


                <div style={{marginTop: '20px'}}>
                <label>
                    <select className="dropdown">
                        <option value="" selected>
                            Type of Rock
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


                <div style={{marginTop: '20px'}}>
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
        </div>
      </div>
    )
}

export default FilterMenu;