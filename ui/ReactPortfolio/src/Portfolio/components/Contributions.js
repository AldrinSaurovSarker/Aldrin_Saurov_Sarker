import { useState, useEffect } from 'react';
import { getContributionData } from '../../CommonComponents/Api';
import { CONTRIB_IMAGE_DIR } from "../../CommonComponents/MediaRoute";
import SectionTitle from './SectionTitle';

const ContributionCard = ({ logoSrc, title, organizer, link, pdfUrl }) => {
    const downloadPdf = () => {
        window.open(pdfUrl, '_blank');
    };

    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-4">
            <div className="card h-100">
                <img
                    src={`${CONTRIB_IMAGE_DIR}/${logoSrc}`}
                    className="card-img-top card-logo img-fluid"
                    alt="Logo"
                    style={{ height: '100%' }}
                />
                <div className="card-body text-center">
                    <div className="card-content">
                        <h3>{title}</h3>
                        <h6 className="text-muted">{organizer}</h6>
                    </div>

                    <div className="btn-group">
                        <a href={link} target="_blank" rel="noreferrer" className="btn btn-primary btn-block mt-4">View</a>
                        {pdfUrl && (
                            <button onClick={downloadPdf} className="btn btn-success btn-block mt-4">Download PDF</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Contributions = () => {
    const [contributionData, setContributionData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getContributionData();
            setContributionData(data);
        };
        fetchData();
    }, [getContributionData]);

    return (
        <section id='contribution'>
            <div className="container-fluid p-5 d-flex">
                <div className="row">
                    <SectionTitle title='My Contributions' details='I have contributed several blogs in different websites and one problem at a district level programming contest.'/>
                    {contributionData.map((card, index) => (
                        <ContributionCard key={index} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Contributions;
