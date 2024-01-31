import { useState, useEffect } from 'react';
import { getExtraData } from '../../CommonComponents/Api';
import SectionTitle from "./SectionTitle";
import UseDarkMode from "./UseDarkMode";

export default function Extra() {
    const [extraData, setExtraData] = useState([]);
    const isDarkMode = UseDarkMode();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getExtraData();
            setExtraData(data);
        };
        fetchData();
    }, [getExtraData]);

    return (
        <section id="extra">
            <div className="container-fluid p-5">
                <SectionTitle title="Extra" details="I hope it's just the 1% of all achievements I will achieve in my life." />
                <div className="row">
                    <ul className="ms-auto list-unstyled extra-list col-md-6 my-auto">
                        {extraData.map((item, index) => (
                            <li key={index} className="d-flex align-items-center mb-3 extra-list-item text-justify">
                                <i className="fas fa-trophy text-warning pe-2"></i>
                                <span dangerouslySetInnerHTML={{ __html: item.description }} className={`font-4 smooth ${isDarkMode ? 'text-light' : 'text-dark'}`}></span>
                            </li>
                        ))}
                    </ul>

                    <div className="col-md-4 mx-auto p-1 mt-3 d-none d-md-block">
                        <img src="images/trophy.jpg" alt="Trophy" className="img-fluid w-100" />
                    </div>
                </div>

                <div className="text-center mt-3 d-md-none">
                    <img src="images/trophy.jpg" alt="Trophy" className="img-fluid" />
                </div>
            </div>
        </section>
    );
}
