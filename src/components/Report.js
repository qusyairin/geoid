import React, { useState } from 'react';
import '../style.css'; // Ensure you have a CSS file for custom styling
import report1 from '../assets/report1.pdf';
import report2 from '../assets/report2.pdf';
import report3 from '../assets/report3.pdf';
import Purchase from './modal/Purchase';

function Report() {
    // Example array of report data
    const reports = [
        {
            title: "Preliminary view of geotechnical properties of soft rocks of Semanggol formation at Pokok Sena, Kedah",
            link: "https://iopscience.iop.org/article/10.1088/1755-1315/140/1/012117/meta",
            author: "N.R Ahmad and N.H Jamin",
            year: "2018",
            linkSource: "iopscience.iop.org",
            description: "… the Triassic Semanggol Formation in North Perak and East Kedah, we … with bedded chert within the formation's typical deep-sea … of limestone",
            file: report1,
            tags: ["General Geology"]
        },
        {
            title: "Gravity Analysis for Subsurface Characterization and Depth Estimation of Muda River Basin, Kedah",
            link: "https://www.mdpi.com/2076-3417/11/14/6363",
            author: "MNA Zakariah, N Roslan, N Sulaiman",
            year: "2021",
            linkSource: "mdpi.com",
            description: "… However, in contrast, Foo [10] revealed that Southern Semanggol formation in north Perak… In northeast Kedah...",
            file: report2,
            tags: ["General Geology"]
        },
        {
            title: "Some geochemical studies of the metaquartzites of the Jerai Formation, Kedah",
            link: "https://archives.datapages.com/data/geological-society-of-malaysia/bulletins/013/013001/pdfs/57.htm",
            author: "KT Chow",
            year: "1980",
            linkSource: "archives.datapages.com",
            description: "On the southern part of the Gunung Jerai area, lies igneous rocks such as granites...",
            file: report3,
            tags: ["Malaysia"]
        },
        // Add more report objects as needed
    ];

    const [showModal, setShowModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    const handlePurchaseClick = (report) => {
        setSelectedReport(report);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReport(null);
    };

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
                        <div>
                            <h3 className="report-title">{report.title}</h3>
                            <p className="report-description">{report.author} • {report.year} • {report.linkSource}</p>
                            <p className="report-description">{report.description}</p>
                            <div className="report-tags">
                                {report.tags.map((tag, idx) => (
                                    <span className="report-tag" key={idx}>{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className='report-download'>
                            <a href={report.file} download={report.file} style={{textDecoration: 'none'}}>
                                <p className='download-button'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-pdf-fill" viewBox="0 0 16 16">
                                        <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z"/>
                                        <path fill-rule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103"/>
                                    </svg>
                                    &nbsp;PDF
                                </p>
                            </a>

                            <a href={report.link} target="_blank"  style={{textDecoration: 'none'}}>
                                <p className='download-button'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-html" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zm-9.736 7.35v3.999h-.791v-1.714H1.79v1.714H1V11.85h.791v1.626h1.682V11.85h.79Zm2.251.662v3.337h-.794v-3.337H4.588v-.662h3.064v.662zm2.176 3.337v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596H9.93L8.79 11.85h-.805v3.999zm4.71-.674h1.696v.674H12.61V11.85h.79v3.325Z"/>
                                    </svg>&nbsp;HTML
                                </p>
                            </a>
                            <p className='download-button' onClick={() => handlePurchaseClick(report)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-stack" viewBox="0 0 16 16">
                                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"/>
                                </svg>&nbsp;Purchase
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <Purchase show={showModal} onClose={handleCloseModal} report={selectedReport} />
        </div>
    );
}

export default Report;
