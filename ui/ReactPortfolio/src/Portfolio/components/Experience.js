import { useState, useEffect } from 'react'
import { getExperienceData } from './Api'
import SectionTitle from './SectionTitle'
import UseDarkMode from "./UseDarkMode"

export default function Experience() {
    const [experienceData, setExperienceData] = useState([]);
    const [activeCompanyName, setActiveCompanyName] = useState("")
    const isDarkMode = UseDarkMode();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getExperienceData();
            setExperienceData(data);
            if (data.length > 0) {
                setActiveCompanyName(data[0].company);
            }
        };
        fetchData();
    }, [getExperienceData]);

    const handleMouseEnter = (companyName) => {
        setActiveCompanyName(companyName);
    };

    return (
        <section id='experience'>
            <div className="container-fluid p-5">
                <SectionTitle title='Experiences' details='I have working experience as a backend software developer.' />
                <div className="row">
                    <div className="col-md-4">
                        <ul className="company-list ps-0">
                            {
                                experienceData.map((exp, index) => (
                                    <li key={index} className={`company-list-item d-flex align-items-center ${isDarkMode ? 'text-light' : 'text-dark'} px-0 py-3 ${activeCompanyName === exp.company ? 'active' : ''}`} onMouseEnter={() => handleMouseEnter(exp.company)}>
                                        <div className='company-name fw-bold'>{exp.company}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="col-md-6 me-1">
                        {experienceData.find(exp => exp.company === activeCompanyName) && (
                            <div>
                                <h3 className='text-primary'>{experienceData.find(exp => exp.company === activeCompanyName).role}</h3>
                                <i className={`smooth ${isDarkMode ? 'text-light' : 'text-muted'}`}>{experienceData.find(exp => exp.company === activeCompanyName).duration}</i>
                                <p className={`mt-4 text-justify smooth ${isDarkMode ? 'text-warning' : 'text-muted'}`} style={{ textAlign: 'justify' }}>{experienceData.find(exp => exp.company === activeCompanyName).description}</p>
                                {experienceData.find(exp => exp.company === activeCompanyName).tools.length > 0 && (
                                    <div>
                                        <h5 className={`smooth ${isDarkMode ? 'text-light' : 'text-muted'}`}>Tools & technologies</h5>
                                        <ul className='tool-list'>
                                            {experienceData.find(exp => exp.company === activeCompanyName).tools.map((tool, index) => (
                                                <li className='tool-list-item text-danger fw-bold' key={index}>{tool}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
