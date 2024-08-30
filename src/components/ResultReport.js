import React, { useState, useEffect } from 'react';
import '../style.css'; // Ensure you have a CSS file for custom styling
import report1 from '../assets/report1.pdf';
import report2 from '../assets/report2.pdf';
import report3 from '../assets/report3.pdf';
import report4 from '../assets/report4.pdf';
import report5 from '../assets/report5.pdf';
import report6 from '../assets/report6.pdf';
import report7 from '../assets/report7.pdf';
import Purchase from './modal/Purchase';

function ResultReport({category}) {
    // Example array of report data
    const reports = [
        {
            title: "Late Palaeozoic radiolarians from the Bentong-Raub suture zone, and the Semanggol formation",
            link: "https://doi.org/10.1016/0743-9547(95)00008-G",
            author: "Spiller, F.C & Metcalfe, I.",
            year: "1995",
            linkSource: "iopscience.iop.org",
            description: "Cherts ... from the Bentong-Raub suture zone, Peninsular Malaysia, have yielded radiolarians ... Carboniferous (Tournaisian, late? Tournaisian and Viséan) ages.",
            file: report1,
            category: 'Geology',
            tags: ["General Geology"]
        },
        {
            title: "Middle and Late Permian radiolarians from the Semanggol Formation, Northwest Peninsular Malaysia.",
            link: "https://doi.org/10.14825/prpsj1951.1995.177_43",
            author: "Sashida, K., ADACHI, S., IGO, H., KOIKE, T., & AMNAN, I. B.",
            year: "1995",
            linkSource: "mdpi.com",
            description: "… However, in contrast, Foo [10] revealed that Southern Semanggol formation in north Perak… In northeast Kedah...",
            file: report2,
            category: 'Geology',
            tags: ["General Geology"]
        },
        {
            title: "Stratigraphy and Depositional Model of the Chert Member of the Semanggol Formation, Kebun 500, Pokok Sena, Kedah.",
            link: "https://utpedia.utp.edu.my/id/eprint/19059/",
            author: "Mohammad, M. A",
            year: "2016",
            linkSource: "archives.datapages.com",
            description: "... Semanggol formation at an outcrop at Kebun 500.. and ... but yet to explore on Kebun 500.",
            file: report3,
            category: 'Geology',
            tags: ["Malaysia"]
        },
        {
            title: "MARITIME ARCHAEOLOGY In Bidong Island, Terengganu Waters",
            link: "https://www.researchgate.net/publication/359245996_MARITIME_ARCHAEOLOGY_in_Bidong_Island_Terengganu_Waters",
            author: "Assoc. Prof. Dr. Asyaari Muhamad",
            year: "2018",
            linkSource: "www.researchgate.net",
            description: "Although archaeology was born from a study on land sites... of other forms of archaeological studies.",
            file: report4,
            category: 'Archaeology',
            tags: ["Archaeology"]
        },
        {
            title: "BENTHIC COMMUNITY DIVERSITY AT MARINE ARCHAEOLOGICAL SITE, PULAU BIDONG",
            link: "https://www.researchgate.net/publication/353621895_BENTHIC_COMMUNITY_DIVERSITY_AT_MARINE_ARCHAEOLOGICAL_SITE_PULAU_BIDONG_SOUTH_CHINA_SEA",
            author: "Aminah Ismailluddin",
            year: "2021",
            linkSource: "www.researchgate.net",
            description: "An artificial structure on the seafloor .. structure of the benthic community.. an underwater heritage site",
            file: report5,
            category: 'Archaeology',
            tags: ["Archaeology"]
        },
        {
            title: "Discovery and Excavation of Artifacts from the Bidong Shipwreck",
            link: "https://www.cambridge.org/core/journals/advances-in-archaeological-practice/article/abs/discovery-and-excavation-of-artifacts-from-the-bidong-shipwreck-malaysia/F2DFF56A986345DD5AD608CA4E38D00E",
            author: "B Mustapa",
            year: "2023",
            linkSource: "www.cambridge.org",
            description: "Underwater archaeological .. ASEAN partner countries, such as Indonesia,... and the Philippines.",
            file: report6,
            category: 'Archaeology',
            tags: ["Archaeology"]
        },
        {
            title: "ARKEOLOGI MARITIM: KAPAL KARAM DI SEMENANJUNG MALAYSIA",
            link: "http://web.usm.my/km/earlyView_May2021/20_KM-OA-08-20-0152.R1.pdf",
            author: " Z Baco",
            year: "2021",
            linkSource: "web.usm.my",
            description: "This article discusses archaeological research of shipwrecks as a form of underwater ... Peninsular Malaysia from 1907 to 2019.",
            file: report7,
            category: 'Archaeology',
            tags: ["Archaeology"]
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

    const [filteredReport, setFilteredReport] = useState(reports);

    const resultCount = filteredReport.length;

    useEffect(() => {
        const categoryFilter = category ? category.toLowerCase() : '';

        let filtered = reports;

        if (categoryFilter) {
            filtered = filtered.filter(reports => reports.category.toLowerCase() === categoryFilter);
        }

        setFilteredReport(filtered);
    }, [category]);

    return (
        <div className="artifacts-result-page">
            <h1 style={{textAlign: 'left'}}>Reports: {resultCount} result{resultCount !== 1 ? 's' : ''} found</h1>
            <div className="reports-list">
                {filteredReport.map((report, index) => (
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

export default ResultReport;
