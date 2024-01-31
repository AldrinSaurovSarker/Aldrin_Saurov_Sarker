import { useState, useEffect } from 'react';
import { getCertificateData } from '../../CommonComponents/Api';
import SectionTitle from "./SectionTitle";
import UseDarkMode from "./UseDarkMode";

export default function Certifications() {
    const [certificateData, setCertificateData] = useState([]);
    const isDarkMode = UseDarkMode();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCertificateData();
            setCertificateData(data);
        };
        fetchData();
    }, [getCertificateData]);

    return (
        <section id="certification">
            <div className="container-fluid p-5">
                <SectionTitle title='Certifications' details="To be honest, I'm too lazy to complete a course 100%. Otherwise, the list would be longer."></SectionTitle>
                <ul className="list-unstyled">
                    {certificateData.map((certificate, index) => (
                        <li key={index} className="my-3 d-flex align-items-start">
                            <i className="fas fa-certificate me-2 mt-1 text-info"></i>
                            <span className={`smooth ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                                <i className="fst-italic">{certificate.issuer}</i> certification on&nbsp;
                                <a href={certificate.url} target="_blank" rel="noreferrer" className="text-decoration-none">
                                    {certificate.title}
                                </a>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
