import { useState, useEffect } from 'react'
import { getEducationData } from './Api'
import { EDUCATION_IMAGE_DIR } from '../../CommonComponents/Constants'
import SectionTitle from './SectionTitle'
import UseDarkMode from './UseDarkMode'

const EducationalDegree = ({ logo, institute, degree, duration, result, link, isDarkMode }) => (
    <li className="education-item py-3 d-grid d-md-flex w-100">
        <div className="logo d-flex align-items-center justify-content-center w-100 m-0 m-md-5 pb-3">
            <img src={`${EDUCATION_IMAGE_DIR}/${logo}`} alt={`${institute} Logo`} className="img-fluid" />
        </div>
        <div className="content text-center text-md-start">
            <h2 className='title font-4'>
                <a href={link} rel="noreferrer" className={`mt-4 text-justify text-decoration-none smooth ${isDarkMode ? 'text-info' : 'text-primary'}`} target='_blank'>{institute}</a>
            </h2>
            <h5 className={`subtitle font-1 smooth ${isDarkMode ? 'text-light' : 'text-dark'}`}>{degree}</h5>
            <p className={`duration smooth ${isDarkMode ? 'text-warning' : 'text-primary'}`}>{duration}</p>
            <i className={`result fw-bold smooth ${isDarkMode ? 'text-light' : 'text-muted'}`}>{result}</i>
        </div>
    </li>
);

const Education = () => {
    const [educationData, setEducationData] = useState([]);
    const isDarkMode = UseDarkMode();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEducationData();
            setEducationData(data);
        };
        fetchData();
    }, [getEducationData]);

    return (
        <section id='education'>
            <div className="container-fluid p-5">
                <SectionTitle title='Education' details="Here are the educational institute I've achieved educational degrees from. Although, I've leanred a great deal of things from real life, YouTube, etc. Yet, what we know is a drop. what we don't know is an ocean." />
                <div className="row">
                    <div className="col-md-12">
                        <ul className="my-5 px-1 py-3">
                            {
                                educationData.map((education, index) => (
                                    <EducationalDegree key={index} {...education} isDarkMode={isDarkMode} />
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Education
