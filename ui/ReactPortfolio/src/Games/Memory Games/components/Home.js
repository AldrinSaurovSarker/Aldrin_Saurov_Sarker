import { useState, useEffect } from 'react';
import Star from './Star';
import { getUserData, deleteUserData } from '../../../CommonComponents/Api';
import GoogleAuth from '../../../CommonComponents/GoogleAuth';

const clickSound = new Audio('/audios/MemoryGame/flip.wav');

export default function Home() {
    const [activeTab, setActiveTab] = useState('All');
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [isIntroVisible, setIsIntroVisible] = useState(false);
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [isStatVisible, setIsStatVisible] = useState(false);
    const [isResetStatVisible, setIsResetStatVisible] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);
    const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');

    const [userData, setUserData] = useState({
        easy: null,
        medium: null,
        hard: null
    });

    const [sumTotalFlips, setSumTotalFlips] = useState(0);
    const [sumTotalMatchedFlips, setSumTotalMatchedFlips] = useState(0);
    const [sumTotalWrongFlips, setSumTotalWrongFlips] = useState(0);
    const [totalMatches, setTotalMatches] = useState(0);
    const [totalCompletedMatches, setTotalCompletedMatches] = useState(0);
    const [totalAbandonedMatches, setTotalAbandonedMatches] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const email = JSON.parse(localStorage.getItem('user'));
            const data = await getUserData(email);
            categorizeDataByDifficulty(data);
        };
        fetchData();
    }, []);

    const categorizeDataByDifficulty = (data) => {
        const categorizedData = {
            easy: null,
            medium: null,
            hard: null
        };

        data.forEach(item => {
            switch (item.difficulty) {
                case 'easy':
                    categorizedData.easy = item;
                    break;
                case 'medium':
                    categorizedData.medium = item;
                    break;
                case 'hard':
                    categorizedData.hard = item;
                    break;
                default:
                    console.log(item.difficulty)
                    break;
            }
        });

        setUserData(categorizedData);
    };

    useEffect(() => {
        if (!userData.easy && !userData.medium && !userData.hard) return;

        const sumTotalFlips = (
            (userData.easy ? userData.easy.totalFlips : 0) +
            (userData.medium ? userData.medium.totalFlips : 0) +
            (userData.hard ? userData.hard.totalFlips : 0)
        );

        const sumTotalMatchedFlips = (
            (userData.easy ? userData.easy.totalMatchedFlips : 0) +
            (userData.medium ? userData.medium.totalMatchedFlips : 0) +
            (userData.hard ? userData.hard.totalMatchedFlips : 0)
        );

        const sumTotalWrongFlips = (
            (userData.easy ? userData.easy.totalWrongFlips : 0) +
            (userData.medium ? userData.medium.totalWrongFlips : 0) +
            (userData.hard ? userData.hard.totalWrongFlips : 0)
        );

        const totalMatches = (
            (userData.easy ? userData.easy.totalMatches : 0) +
            (userData.medium ? userData.medium.totalMatches : 0) +
            (userData.hard ? userData.hard.totalMatches : 0)
        );

        const totalCompletedMatches = (
            (userData.easy ? userData.easy.totalCompletedMatches : 0) +
            (userData.medium ? userData.medium.totalCompletedMatches : 0) +
            (userData.hard ? userData.hard.totalCompletedMatches : 0)
        );

        const totalAbandonedMatches = (
            (userData.easy ? userData.easy.totalAbandonedMatches : 0) +
            (userData.medium ? userData.medium.totalAbandonedMatches : 0) +
            (userData.hard ? userData.hard.totalAbandonedMatches : 0)
        );

        setSumTotalFlips(sumTotalFlips);
        setSumTotalMatchedFlips(sumTotalMatchedFlips);
        setSumTotalWrongFlips(sumTotalWrongFlips);
        setTotalMatches(totalMatches);
        setTotalCompletedMatches(totalCompletedMatches);
        setTotalAbandonedMatches(totalAbandonedMatches);
    }, [userData]);

    const blur = () => {
        setIsBlurred(true);
    }

    const unblur = () => {
        setIsBlurred(false);
    }

    const showPopUp = () => {
        clickSoundPlay();
        setIsPopUpVisible(true);
        blur();
    };

    const hidePopUp = () => {
        clickSoundPlay();
        setIsPopUpVisible(false);
        unblur();
    };

    const showIntro = () => {
        clickSoundPlay();
        setIsIntroVisible(true);
        blur();
    };

    const hideIntro = () => {
        clickSoundPlay();
        setIsIntroVisible(false);
        unblur();
    };

    const showStat = () => {
        clickSoundPlay();
        setIsStatVisible(true);
        blur();
    };

    const hideStat = () => {
        clickSoundPlay();
        setIsStatVisible(false);
        unblur();
    };

    const showResetStat = () => {
        clickSoundPlay()
        hideStat()
        blur()
        setIsResetStatVisible(true)
    };

    const hideResetStat = () => {
        unblur()
        clickSoundPlay()
        showStat()
        setIsResetStatVisible(false)
    };

    const showLogin = () => {
        clickSoundPlay();
        setIsLoginVisible(true);
        blur();
    };

    const hideLogin = () => {
        clickSoundPlay();
        setIsLoginVisible(false);
        unblur();
    };

    const levelStat = (difficulty) => {
        setActiveTab(difficulty);
    };

    const clickSoundPlay = () => {
        clickSound.play();
    };

    const resetStat = async () => {
        try {
            const email = JSON.parse(localStorage.getItem('user'));
            await deleteUserData(email);
        } catch (error) {
            console.error('Error deleting user data:', error);
        }
        window.location.reload()
    };

    const handleAuthChange = () => {
        hideLogin();
        window.location.reload();
    };

    const timeFormatter = (seconds) => {
        if (seconds === null) {
            return '--:--';
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${minutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setLoggedIn(isLoggedIn);
    }, []);

    return (
        <>
            {isPopUpVisible && <div className="pop text-center rounded p-5">
                <h1 className="text-uppercase display-4">Select Grid</h1>
                <ul className='p-0'>
                    <li className="select-level">
                        <a className='py-1 px-5 border border-light border-3 fw-bold text-decoration-none d-block' href={`${window.location.href.endsWith('/') ? window.location.href.slice(0, -1) : window.location.href}/easy`}>
                            Easy
                        </a>
                    </li>

                    <li className="select-level">
                        <a className='py-1 px-5 border border-light border-3 fw-bold text-decoration-none d-block' href={`${window.location.href.endsWith('/') ? window.location.href.slice(0, -1) : window.location.href}/medium`}>
                            Medium
                        </a>
                    </li>

                    <li className="select-level">
                        <a className='py-1 px-5 border border-light border-3 fw-bold text-decoration-none d-block' href={`${window.location.href.endsWith('/') ? window.location.href.slice(0, -1) : window.location.href}/hard`}>
                            Hard
                        </a>
                    </li>
                </ul>
                <div className="btn btn-outline-light py-1 border border-light border-3 fw-bold text-decoration-none mt-3 rounded-0" id="cancel" onClick={hidePopUp}>Cancel</div>
            </div>}

            {isIntroVisible && <div className="intro rounded p-5 text-justify">
                <h1 className="text-uppercase text-center display-4">Instruction</h1>
                <p className="text-light">Flip is a card memory game. Click the flipped cards to see what image they uncover and try to find the matching image underneath the other cards.</p>
                <p className="text-light">Click on any card to start a match.</p>
                <p className="text-light">Uncover two matching symbols in a row to eliminate them from the game.</p>
                <p className="text-light">Note that the images that have minor differences (example: change in only hair color) will be considered as different pair and hence can't be matched.</p>
                <p className="text-light">Eliminate all cards as fast as you can to win the game. Have fun FLIPing!</p>
                <p className="text-light">You can save your data by signing with your Google account</p>
                <div className="btn btn-outline-light introBtn float-end" onClick={hideIntro}>Back</div>
            </div>}

            {isStatVisible && <div className="stat p-5">
                <h1 className="text-center text-uppercase">Statistic</h1>

                <div className="tab border border-1 border-light">
                    <button className={`tablinks fw-bold text-light border-0 p-3 ${activeTab === 'All' ? 'active' : ''}`} onClick={() => levelStat('All')}>All</button>
                    <button className={`tablinks fw-bold text-light border-0 p-3 ${activeTab === 'Easy' ? 'active' : ''}`} onClick={() => levelStat('Easy')}>Easy</button>
                    <button className={`tablinks fw-bold text-light border-0 p-3 ${activeTab === 'Medium' ? 'active' : ''}`} onClick={() => levelStat('Medium')}>Medium</button>
                    <button className={`tablinks fw-bold text-light border-0 p-3 ${activeTab === 'Hard' ? 'active' : ''}`} onClick={() => levelStat('Hard')}>Hard</button>
                </div>

                {activeTab === 'All' && <div id="All" className="tabcontent p-1">
                    {loggedIn ? (<>
                        <div className="match-info my-5">
                            <h5 className="text-warning">Match Info</h5>
                            <div className="d-grid d-md-flex justify-content-between">
                                <p className="text-info"><strong>Total Game: {totalMatches}</strong></p>
                                <p className="text-light">Completed: {totalCompletedMatches}</p>
                                <p className="text-light">Abandoned: {totalAbandonedMatches}</p>
                            </div>
                        </div>

                        <header className="d-flex justify-content-between">
                            <h5 className="text-warning">Best Time</h5>
                            <h5 className="text-warning d-none d-md-flex">Flip Stat</h5>
                        </header>

                        <div className="info">
                            <div className="time-stat">
                                <p>Best Easy</p>
                                <p>{timeFormatter(userData.easy ? userData.easy.bestTime : null)}</p>
                                <p>Best Medium</p>
                                <p>{timeFormatter(userData.medium ? userData.medium.bestTime : null)}</p>
                                <p>Best Hard</p>
                                <p>{timeFormatter(userData.hard ? userData.hard.bestTime : null)}</p>
                            </div>

                            <h5 className="text-warning d-flex d-md-none my-4">Flip Stat</h5>
                            <div className="flip-stat">
                                <p>Total flips</p>
                                <p>{sumTotalFlips}</p>
                                <p>Matched flips</p>
                                <p>{sumTotalMatchedFlips}</p>
                                <p>Wrong flips</p>
                                <p>{sumTotalWrongFlips}</p>
                            </div>
                        </div>

                        <div className="d-grid justify-content-center stat-btn-grp mt-5">
                            <div className="btn btn-outline-light" onClick={showResetStat}>Reset All</div>
                            <div className="btn btn-outline-light d-flex align-items-center" onClick={hideStat}>CLOSE</div>
                        </div>
                    </>) : (<>
                        <div className="text-center text-info display-5 text-uppercase font-4 mt-5">
                            <p>Sign in to see statistics</p>
                        </div>

                        <div className="d-grid justify-content-center stat-btn-grp mt-5">
                            <div className="btn btn-outline-light" onClick={hideStat}>CLOSE</div>
                        </div>
                    </>)}
                </div>}

                {activeTab === 'Easy' && <div id="Easy" className="tabcontent p-1">
                    {loggedIn ? (<>
                        <div className="match-info my-5">
                            <h5 className="text-warning">Match Info</h5>
                            <div className="d-grid d-md-flex justify-content-between">
                                <b className="text-info mb-3">Total Game: {userData.easy ? userData.easy.totalMatches : 0}</b>
                                <p className="text-light">Completed: {userData.easy ? userData.easy.totalCompletedMatches : 0}</p>
                                <p className="text-light">Abandoned: {userData.easy ? userData.easy.totalAbandonedMatches : 0}</p>
                            </div>
                        </div>

                        <header className="d-flex justify-content-between">
                            <h5 className="text-warning">Best Time</h5>
                            <h5 className="text-warning d-none d-md-flex">Flip Stat</h5>
                        </header>

                        <div className="info">
                            <div className="time-stat">
                                <p>Best Easy</p>
                                <p>{timeFormatter(userData.easy ? userData.easy.bestTime : null)}</p>
                            </div>

                            <h5 className="text-warning d-flex d-md-none my-4">Flip Stat</h5>
                            <div className="flip-stat">
                                <p>Total flips</p>
                                <p>{userData.easy ? userData.easy.totalFlips : 0}</p>
                                <p>Matched flips</p>
                                <p>{userData.easy ? userData.easy.totalMatchedFlips : 0}</p>
                                <p>Wrong flips</p>
                                <p>{userData.easy ? userData.easy.totalWrongFlips : 0}</p>
                            </div>
                        </div>

                        <div className="d-grid justify-content-center stat-btn-grp mt-5">
                            <div className="btn btn-outline-light statBtn" onClick={hideStat}>CLOSE</div>
                        </div>
                    </>) : (<>
                        <div className="text-center text-info display-5 text-uppercase font-4 mt-5">
                            <p>Sign in to see statistics</p>
                        </div>

                        <div className="d-grid justify-content-center stat-btn-grp mt-5">
                            <div className="btn btn-outline-light statBtn" onClick={hideStat}>CLOSE</div>
                        </div>
                    </>)}
                </div>}

                {activeTab === 'Medium' && <div id="Medium" className="tabcontent p-1">
                    {loggedIn ? (<>
                        <div className="match-info my-5">
                            <h5 className="text-warning">Match Info</h5>
                            <div className="d-grid d-md-flex justify-content-between">
                                <b className="text-info mb-3">Total Game: {userData.medium ? userData.medium.totalMatches : 0}</b>
                                <p className="text-light">Completed: {userData.medium ? userData.medium.totalCompletedMatches : 0}</p>
                                <p className="text-light">Abandoned: {userData.medium ? userData.medium.totalAbandonedMatches : 0}</p>
                            </div>
                        </div>

                        <header className="d-flex justify-content-between">
                            <h5 className="text-warning">Best Time</h5>
                            <h5 className="text-warning d-none d-md-flex">Flip Stat</h5>
                        </header>

                        <div className="info">
                            <div className="time-stat">
                                <p>Best Medium</p>
                                <p>{timeFormatter(userData.medium ? userData.medium.bestTime : null)}</p>
                            </div>

                            <h5 className="text-warning d-flex d-md-none my-4">Flip Stat</h5>
                            <div className="flip-stat">
                                <p>Total flips</p>
                                <p>{userData.medium ? userData.medium.totalFlips : 0}</p>
                                <p>Matched flips</p>
                                <p>{userData.medium ? userData.medium.totalMatchedFlips : 0}</p>
                                <p>Wrong flips</p>
                                <p>{userData.medium ? userData.medium.totalWrongFlips : 0}</p>
                            </div>
                        </div>

                        <div className="d-grid justify-content-center stat-btn-grp mt-5">
                            <div className="btn btn-outline-light statBtn" onClick={hideStat}>CLOSE</div>
                        </div>
                    </>) : (<>
                        <div className="text-center text-info display-5 text-uppercase font-4 mt-5">
                            <p>Sign in to see statistics</p>
                        </div>

                        <div className="d-grid justify-content-center stat-btn-grp mt-5">
                            <div className="btn btn-outline-light statBtn" onClick={hideStat}>CLOSE</div>
                        </div>
                    </>)}
                </div>}

                {activeTab === 'Hard' && <div id="Hard" className="tabcontent p-1">
                    {loggedIn ? (<>
                        <div className="match-info my-5">
                            <h5 className="text-warning">Match Info</h5>
                            <div className="d-grid d-md-flex justify-content-between">
                                <b className="text-info mb-3">Total Game: {userData.hard ? userData.hard.totalMatches : 0}</b>
                                <p className="text-light">Completed: {userData.hard ? userData.hard.totalCompletedMatches : 0}</p>
                                <p className="text-light">Abandoned: {userData.hard ? userData.hard.totalAbandonedMatches : 0}</p>
                            </div>
                        </div>

                        <header className="d-flex justify-content-between">
                            <h5 className="text-warning">Best Time</h5>
                            <h5 className="text-warning d-none d-md-flex">Flip Stat</h5>
                        </header>

                        <div className="info">
                            <div className="time-stat">
                                <p>Best Hard</p>
                                <p>{timeFormatter(userData.hard ? userData.hard.bestTime : null)}</p>
                            </div>

                            <h5 className="text-warning d-flex d-md-none my-4">Flip Stat</h5>
                            <div className="flip-stat">
                                <p>Total flips</p>
                                <p>{userData.hard ? userData.hard.totalFlips : 0}</p>
                                <p>Matched flips</p>
                                <p>{userData.hard ? userData.hard.totalMatchedFlips : 0}</p>
                                <p>Wrong flips</p>
                                <p>{userData.hard ? userData.hard.totalWrongFlips : 0}</p>
                            </div>
                        </div>

                        <div className="d-grid justify-content-center stat-btn-grp mt-5">
                            <div className="btn btn-outline-light" onClick={hideStat}>CLOSE</div>
                        </div>
                    </>) : (<>
                        <div className="text-center text-info display-5 text-uppercase font-4 mt-5">
                            <p>Sign in to see statistics</p>
                        </div>

                        <div className="d-grid justify-content-center stat-btn-grp mt-5">
                            <div className="btn btn-outline-light statBtn" onClick={hideStat}>CLOSE</div>
                        </div>
                    </>)}
                </div>}
            </div>}

            {isResetStatVisible && <div className="resetStat">
                <h1>Confirm Reset Data?</h1>
                <b className="text-warning">Once deleted, data can't be restored.</b>
                <div className="mt-5">
                    <div className="btn btn-outline-light btn-lg me-2" onClick={resetStat}>Confirm</div>
                    <div className="btn btn-outline-light btn-lg ms-2 clear" onClick={hideResetStat}>Cancel</div>
                </div>
            </div>}

            {isLoginVisible && <div className="intro rounded p-5 d-flex flex-column">
                <h1 className="text-uppercase text-center display-4">{loggedIn ? 'Sign out' : 'Sign in'}</h1>
                <p className='text-center fw-bold font-1 text-warning'>
                    {loggedIn ? (
                        <>
                            Logged in as <span className="text-info">{JSON.parse(localStorage.getItem('user'))}</span>
                        </>
                    ) : "Sign in to save your data"}
                </p>
                <GoogleAuth loggedIn={loggedIn} setLoggedIn={setLoggedIn} onAuthChange={handleAuthChange} />
                <div className="btn btn-outline-light mt-3" onClick={hideLogin}>Back</div>
            </div>}

            <div className={`memory-game-window bg-dark d-flex align-items-center justify-content-center flex-column ${isBlurred ? 'blurred' : ''}`}>
                <div className="container p-5 d-flex align-items-center flex-column rounded">
                    <div className="content d-flex align-items-center flex-column rounded p-5 w-75">
                        <div>
                            <span>
                                <Star length={10}></Star>
                            </span>

                            <span>
                                <Star length={4}></Star>
                                <sup><i className="fas fa-star"></i></sup>
                            </span>
                        </div>

                        <h1 className="text-center my-4 display-3">Memory Game</h1>

                        <div>
                            <span>
                                <Star length={10}></Star>
                            </span>

                            <span>
                                <Star length={4}></Star>
                                <sup><i className="fas fa-star"></i></sup>
                            </span>
                        </div>
                    </div>

                    <div className="btn-group-vertical mt-5">
                        <div className="btn btn-outline-light fw-bold border-3 d-flex align-items-center justify-content-center my-1 rounded-0 text-uppercase" onClick={showPopUp}>Start Game</div>
                        <div className="btn btn-outline-light fw-bold border-3 d-flex align-items-center justify-content-center my-1 rounded-0 text-uppercase" onClick={showIntro}>Instruction</div>
                        <div className="btn btn-outline-light fw-bold border-3 d-flex align-items-center justify-content-center my-1 rounded-0 text-uppercase" onClick={showStat}>Statistics</div>
                        <div className="btn btn-outline-light fw-bold border-3 d-flex align-items-center justify-content-center my-1 rounded-0 text-uppercase" onClick={showLogin}>
                            {loggedIn ? 'Sign out' : 'Sign in'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}