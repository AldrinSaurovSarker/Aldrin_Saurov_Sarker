import { useState, useEffect } from 'react'
import { getSocialMediaData } from './Api'
import SocialLink from './SocialLink'

function SocialMedia() {
    const [socialMediaData, setSocialMediaData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSocialMediaData();
            setSocialMediaData(data);
        };
        fetchData();
    }, [getSocialMediaData]);

    return (
        <div className='social-links mt-5'>
            <ul className="grid-container p-0 social-list">
                {socialMediaData.map((socialLink, index) => (
                    <SocialLink
                        key={index}
                        url={socialLink.url}
                        title={socialLink.title}
                        icon={socialLink.icon}
                        intro={true}
                    />
                ))}
            </ul>
        </div>
    );
}

export default SocialMedia
