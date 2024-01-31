import { useState, useEffect } from 'react';

const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const updateMode = () => {
            setIsDarkMode(document.body.classList.contains('dark'));
        };

        updateMode();

        const observer = new MutationObserver(updateMode);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    return isDarkMode;
};

export default useDarkMode;
