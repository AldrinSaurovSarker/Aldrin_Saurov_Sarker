import React, { useState, useEffect } from 'react';
import { getSectionData } from '../../CommonComponents/Api';

const Navbar = () => {
    const [activeNavItem, setActiveNavItem] = useState('intro');
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
    const [sectionData, setSectionData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSectionData();
            setSectionData(data);
        };
        fetchData();
    }, [getSectionData]);

    const sectionIds = sectionData.map(item => item.id);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;

            const currentSection = sectionIds.find((sectionId) => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const { offsetTop, offsetHeight } = section;
                    return scrollY >= offsetTop && scrollY < offsetTop + offsetHeight;
                }
                return false;
            });

            if (currentSection) {
                setActiveNavItem(currentSection);
            }

            setIsNavbarVisible(scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavItemClick = (item) => {
        setActiveNavItem(item);

        const section = document.getElementById(item);
        if (section) {
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth',
            });
        }

        setIsNavbarCollapsed(true);
    };

    return (
        <>
            <nav className={`navbar w-100 navbar-expand-lg navbar-dark bg-dark pb-1 pt-4 ${isSmallScreen || isNavbarVisible ? 'visible' : 'hidden'}`}>
                <div className="container-fluid text-uppercase">
                    <a className="navbar-brand" href="#"></a>
                    <button
                        className={`navbar-toggler ${isNavbarCollapsed ? 'collapsed' : ''}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#myNavbar"
                        aria-controls="myNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() => setIsNavbarCollapsed(!isNavbarCollapsed)}
                    >
                        <span className="toggler-icon top-bar"></span>
                        <span className="toggler-icon middle-bar"></span>
                        <span className="toggler-icon bottom-bar"></span>
                    </button>


                    <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="myNavbar">
                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                            {sectionData.map((item) => (
                                <li key={item.id} 
                                className={`nav-item d-flex align-items-center justify-content-center 
                                            ${activeNavItem === item.id ? 'active' : ''} 
                                            fw-bold p-2 text-center font-5`}>
                                    <a className={`nav-link ${activeNavItem === item.id ? 'active' : ''}`} onClick={() => { handleNavItemClick(item.id); setIsNavbarCollapsed(true); }} href={`#${item.id}`}>
                                        {item.title}
                                    </a>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </nav>

            {!isSmallScreen && (
                <aside className={`aside ${isNavbarVisible ? 'hidden' : 'visible'} bg-dark text-light`}>
                    <div className='aside-list'>
                        {sectionData.map((item) => (
                            <div key={item.id} className={`aside-list-item ${activeNavItem === item.id ? 'active' : ''}`} title={item.id} onClick={() => handleNavItemClick(item.id)}>
                                <a href={`#${item.id}`}>
                                    <i className={item.icon}></i>
                                </a>
                            </div>
                        ))}
                    </div>
                </aside>
            )}
        </>
    );
};

export default Navbar;
