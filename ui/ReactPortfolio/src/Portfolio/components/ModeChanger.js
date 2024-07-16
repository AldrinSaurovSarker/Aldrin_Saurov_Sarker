import React, { useEffect, useRef } from 'react'

export default function ModeChanger() {
    const checkboxRef = useRef(null);

    useEffect(() => {
        const el = checkboxRef.current;
        const toggleDarkMode = () => {
            document.body.classList.toggle('dark');
        };

        if (el) {
            el.addEventListener("change", toggleDarkMode);
        }

        return () => {
            if (el) {
                el.removeEventListener("change", toggleDarkMode);
            }
        };
    }, []);

    return (
        <>
            <input type="checkbox" id="checkbox" ref={checkboxRef} />
            <label htmlFor="checkbox" className="label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <div className="ball"></div>
            </label>
        </>
    );
}
