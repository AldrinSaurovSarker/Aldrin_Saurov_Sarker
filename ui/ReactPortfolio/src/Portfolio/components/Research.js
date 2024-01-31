import { useState, useEffect } from 'react';
import { getResearchData } from '../../CommonComponents/Api';
import SectionTitle from "./SectionTitle";
import UseDarkMode from "./UseDarkMode";

export default function Research() {
    const [researchData, setResearchData] = useState([]);
    const isDarkMode = UseDarkMode();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getResearchData();
            setResearchData(data);
        };
        fetchData();
    }, [getResearchData]);

    const highlightAuthor = (authors) => {
        const highlightName = "Aldrin Saurov Sarker";
        return authors.split(', ').map((author, index) => (
            author === highlightName ? <strong key={index}>{author}</strong> : author
        )).reduce((prev, curr) => [prev, ', ', curr]);
    };

    return (
        <section id="research">
            <div className="container-fluid p-5">
                <SectionTitle title='Research' details='“If we knew what it was we were doing, it would not be called research, would it?” ― Albert Einstein'></SectionTitle>
                
                {researchData.map((research, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="mb-3 font-4 fw-bold text-primary">{research.title}</h3>
                        <div className={`box p-3 mb-2 font-5 smooth ${isDarkMode ? 'text-dark bg-white' : 'text-white bg-dark'}`}>
                            {highlightAuthor(research.Authors)} | {research.year}
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className={`font-1 smooth ${isDarkMode ? 'text-light' : 'text-dark'}`}><b>Keypoints: </b>{research.keypoints}</span>
                            {research.link && (
                                <a href={research.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Download</a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
