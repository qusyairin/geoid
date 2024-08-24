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
