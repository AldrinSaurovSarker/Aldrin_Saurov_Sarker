import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/loader.css';

const Loader = () => {
    const [tip, setTip] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const tips = [
            'The game will save your stats locally, via localStorage.',
            'Find out all the identical pairs to win.',
            'The HARD mode is a real memory booster',
            'Position of each card is randomized every time you play.',
            'Click on any card to start a match.'
        ];

        setTip(tips[Math.floor(Math.random() * tips.length)]);

        const timeoutId = setTimeout(() => {
            navigate('/games/memory-game/play');
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [navigate]);

    return (
        <div className="loader-wrapper">
            <div className="hourglass"></div>
            <span className="loader"><span className="loader-inner"></span></span>
            <h1>Use earphone for better experience.</h1>
            <h5>TIPS: <span>{tip}</span></h5>
        </div>
    );
};

export default Loader;
