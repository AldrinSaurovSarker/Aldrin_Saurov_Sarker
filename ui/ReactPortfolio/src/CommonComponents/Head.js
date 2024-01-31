import React from 'react';
import { useLocation } from 'react-router-dom';
import routesConfig from './RoutesConfig';

const Head = () => {
    const location = useLocation();

    React.useEffect(() => {
        const currentConfig = routesConfig[location.pathname];

        // Change the title
        document.title = currentConfig.title;

        // Change the favicon
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = currentConfig.favicon;
    }, [location]);

    return null;
};

export default Head;
