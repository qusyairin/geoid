import React from 'react';
import '../style.css'; // Ensure you have a CSS file for custom styling

function Report() {
    // Example array of report data
    const reports = [
        {
            title: "Stratigraphy and Depositional Model of the Chert Member of the Semanggol Formation, Kebun 500, Pokok Sena, Kedah",
            description: "Formation at an outcrop at Kebun 500, Pokok Sena, Kedah in northern Perak. Previous study also recorded occurrence of microfossils in few areas around Northern Kedah...",
            tags: ["Kubang Pasu", "Igneous"]
        },
        {
            title: "Sedimentology of Semanggol Formation at Pokok Sena, Kedah",
            description: "Unit can majorly be found in north Kedah and north Perak area. The extensive ... Kedah area...",
            tags: ["Kubang Pasu", "Igneous"]
        },
        {
            title: "Some geochemical studies of the metaquartzites of the Jerai Formation, Kedah",
            description: "On the southern part of the Gunung Jerai area, lies igneous rocks such as granites...",
            tags: ["Igneous"]
        },
        // Add more report objects as needed
    ];

    return (
        <div className="report-page">
            <h1>Reports</h1>
            <div className="search-container">
                <input type="text" placeholder="Search Reports" className="search-bar" />
                <button className="search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            </div>
            <div className="reports-list">
                {reports.map((report, index) => (
                    <div className="report-card" key={index}>
                        <h3 className="report-title">{report.title}</h3>
                        <p className="report-description">{report.description}</p>
                        <div className="report-tags">
                            {report.tags.map((tag, idx) => (
                                <span className="report-tag" key={idx}>{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Report;
