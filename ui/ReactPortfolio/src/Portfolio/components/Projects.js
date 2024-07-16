import { useState, useEffect } from 'react';
import { getProjectData } from './Api'
import { PROJECT_IMAGE_DIR } from '../../CommonComponents/Constants'
import SectionTitle from './SectionTitle'
import UseDarkMode from './UseDarkMode'

export default function Projects() {
    const [projectData, setProjectData] = useState([]);
    const isDarkMode = UseDarkMode();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProjectData();
            setProjectData(data);
        };
        fetchData();
    }, [getProjectData]);

    const groupedProjects = projectData.reduce((group, project) => {
        const { type } = project;
        group[type] = group[type] ?? [];
        group[type].push(project);
        return group;
    }, {});

    return (
        <section id="projects">
            <div className="container-fluid p-5">
                <SectionTitle title='Projects' details='Projects that I developed without randomly copy pasting code without understanding'></SectionTitle>
                {Object.entries(groupedProjects).map(([type, projects]) => (
                    <div key={type} className='my-5'>
                        <h2 className={`mb-3 font-4 smooth ${isDarkMode ? 'text-light' : 'text-dark'}`}>{type}</h2>
                        <div className="row">
                            {projects.map(project => (
                                <div key={project.title} className="col-xl-3 col-lg-4 col-md-6 col-12 mb-4">
                                    <div className="card h-100">
                                        <img src={`${PROJECT_IMAGE_DIR}/${project.thumbnail}`} className="card-img-top" alt={project.title} />
                                        <div className="card-body">
                                            <h4 className="card-title text-primary fw-bold font-2">{project.title}</h4>
                                            <h6 className="card-subtitle mb-4 text-muted">{project.subtitle}</h6>
                                            <p className="card-text text-justify">{project.description}</p>
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <div className='d-flex me-3'>
                                                {
                                                    project.visit &&
                                                    <a href={project.visit} className="card-link text-decoration-none" target="_blank">
                                                        <button type="button" className="btn btn-outline-primary btn-sm rounded-circle">
                                                            <i className="fas fa-globe"></i>
                                                        </button>
                                                    </a>
                                                }

                                                {
                                                    project.play &&
                                                    <a href={project.play} className="card-link text-decoration-none ms-1" target="_blank">
                                                        <button type="button" className="btn btn-outline-success btn-sm rounded-circle">
                                                            <i className="fas fa-play"></i>
                                                        </button>
                                                    </a>
                                                }

                                                {
                                                    project.github &&
                                                    <a href={project.github} className="card-link text-decoration-none ms-1" target="_blank">
                                                        <button type="button" className="btn btn-outline-dark btn-sm rounded-circle">
                                                            <i className="fab fa-github"></i>
                                                        </button>
                                                    </a>
                                                }

                                                {
                                                    project.youtube &&
                                                    <a href={project.youtube} className="card-link text-decoration-none ms-1" target="_blank">
                                                        <button type="button" className="btn btn-outline-danger btn-sm rounded-circle">
                                                            <i className="fab fa-youtube"></i>
                                                        </button>
                                                    </a>
                                                }

                                                {
                                                    project.doc &&
                                                    <a href={project.doc} className="card-link text-decoration-none ms-1" target="_blank">
                                                        <button type="button" className="btn btn-outline-info btn-sm rounded-circle">
                                                            <i className="fas fa-file-alt"></i>
                                                        </button>
                                                    </a>
                                                }
                                            </div>
                                            <span className="tools text-info">{project.tools}</span>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
