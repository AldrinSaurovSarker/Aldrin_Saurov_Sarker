import { useState } from 'react';
import Star from './Star';
import GoogleSignIn from '../../../CommonComponents/SignIn';

const clickSound = new Audio('/audios/MemoryGame/flip.wav');

export default function Home() {
    const [activeTab, setActiveTab] = useState('All');
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [isIntroVisible, setIsIntroVisible] = useState(false);
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [isStatVisible, setIsStatVisible] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

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
                <p className="text-light">The game will save your stats locally, via localStorage.</p>
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
                    <div className="match-info my-5">
                        <h5 className="text-warning">Match Info</h5>
                        <div className="d-grid d-md-flex justify-content-between">
                            <p className="text-info"><strong>Total Game: <span id="total">0</span></strong></p>
                            <p className="text-light">Completed: <span id="completed">0</span></p>
                            <p className="text-light">Abandoned: <span id="abandoned">0</span></p>
                        </div>
                    </div>

                    <header className="d-flex justify-content-between">
                        <h5 className="text-warning">Best Time</h5>
                        <h5 className="text-warning d-none d-md-flex">Flip Stat</h5>
                    </header>

                    <div className="info">
                        <div className="time-stat">
                            <p>Best Easy</p>
                            <p className="ebt">-:-</p>
                            <p>Best Medium</p>
                            <p className="mbt">-:-</p>
                            <p>Best Hard</p>
                            <p className="hbt">-:-</p>
                        </div>

                        <h5 className="text-warning d-flex d-md-none my-4">Flip Stat</h5>
                        <div className="flip-stat">
                            <p>Total flips</p>
                            <p id="tf">0</p>
                            <p>Matched flips</p>
                            <p id="mf">0</p>
                            <p>Wrong flips</p>
                            <p id="wf">0</p>
                        </div>
                    </div>

                    <div className="d-grid justify-content-center stat-btn-grp mt-5">
                        <div className="btn btn-outline-light clear">Reset All</div>
                        <div className="btn btn-outline-light statBtn" onClick={hideStat}>CLOSE</div>
                    </div>
                </div>}

                {activeTab === 'Easy' && <div id="Easy" className="tabcontent p-1">
                    <div className="match-info my-5">
                        <h5 className="text-warning">Match Info</h5>
                        <div className="d-grid d-md-flex justify-content-between">
                            <b className="text-info mb-3">Total Game: <span id="easy-total">0</span></b>
                            <p className="text-light">Completed: <span id="easy-completed">0</span></p>
                            <p className="text-light">Abandoned: <span id="easy-abandoned">0</span></p>
                        </div>
                    </div>

                    <header className="d-flex justify-content-between">
                        <h5 className="text-warning">Best Time</h5>
                        <h5 className="text-warning d-none d-md-flex">Flip Stat</h5>
                    </header>

                    <div className="info">
                        <div className="time-stat">
                            <p>Best Easy</p>
                            <p className="ebt">-:-</p>
                        </div>

                        <h5 className="text-warning d-flex d-md-none my-4">Flip Stat</h5>
                        <div className="flip-stat">
                            <p>Total flips</p>
                            <p id="etf">0</p>
                            <p>Matched flips</p>
                            <p id="emf">0</p>
                            <p>Wrong flips</p>
                            <p id="ewf">0</p>
                        </div>
                    </div>

                    <div className="d-grid justify-content-center stat-btn-grp mt-5">
                        <div className="btn btn-outline-light statBtn" onClick={hideStat}>CLOSE</div>
                    </div>
                </div>}

                {activeTab === 'Medium' && <div id="Medium" className="tabcontent p-1">
                    <div className="match-info my-5">
                        <h5 className="text-warning">Match Info</h5>
                        <div className="d-grid d-md-flex justify-content-between">
                            <b className="text-info mb-3">Total Game: <span id="medium-total">0</span></b>
                            <p className="text-light">Completed: <span id="medium-completed">0</span></p>
                            <p className="text-light">Abandoned: <span id="medium-abandoned">0</span></p>
                        </div>
                    </div>

                    <header className="d-flex justify-content-between">
                        <h5 className="text-warning">Best Time</h5>
                        <h5 className="text-warning d-none d-md-flex">Flip Stat</h5>
                    </header>

                    <div className="info">
                        <div className="time-stat">
                            <p>Best Medium</p>
                            <p className="mbt">-:-</p>
                        </div>

                        <h5 className="text-warning d-flex d-md-none my-4">Flip Stat</h5>
                        <div className="flip-stat">
                            <p>Total flips</p>
                            <p id="mtf">0</p>
                            <p>Matched flips</p>
                            <p id="mmf">0</p>
                            <p>Wrong flips</p>
                            <p id="mwf">0</p>
                        </div>
                    </div>

                    <div className="d-grid justify-content-center stat-btn-grp mt-5">
                        <div className="btn btn-outline-light statBtn" onClick={hideStat}>CLOSE</div>
                    </div>
                </div>}

                {activeTab === 'Hard' && <div id="Hard" className="tabcontent p-1">
                    <div className="match-info my-5">
                        <h5 className="text-warning">Match Info</h5>
                        <div className="d-grid d-md-flex justify-content-between">
                            <b className="text-info mb-3">Total Game: <span id="hard-total">0</span></b>
                            <p className="text-light">Completed: <span id="hard-completed">0</span></p>
                            <p className="text-light">Abandoned: <span id="hard-abandoned">0</span></p>
                        </div>
                    </div>

                    <header className="d-flex justify-content-between">
                        <h5 className="text-warning">Best Time</h5>
                        <h5 className="text-warning d-none d-md-flex">Flip Stat</h5>
                    </header>

                    <div className="info">
                        <div className="time-stat">
                            <p>Best Hard</p>
                            <p className="hbt">-:-</p>
                        </div>

                        <h5 className="text-warning d-flex d-md-none my-4">Flip Stat</h5>
                        <div className="flip-stat">
                            <p>Total flips</p>
                            <p id="htf">0</p>
                            <p>Matched flips</p>
                            <p id="hmf">0</p>
                            <p>Wrong flips</p>
                            <p id="hwf">0</p>
                        </div>
                    </div>

                    <div className="d-grid justify-content-center stat-btn-grp mt-5">
                        <div className="btn btn-outline-light" onClick={hideStat}>CLOSE</div>
                    </div>
                </div>}
            </div>}

            {isLoginVisible && <div className="intro rounded p-5 d-flex flex-column">
                <h1 className="text-uppercase text-center display-4">Sign in</h1>
                <GoogleSignIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                <div className="btn btn-outline-light mt-3" onClick={hideLogin}>Back</div>
            </div>}

            <div className={`memory-game-window bg-dark d-flex align-items-center justify-content-center flex-column ${isBlurred ? 'blurred' : ''}`}>
                <div className="resetStat">
                    <h1>Confirm Reset Data?</h1>
                    <b className="text-warning">Once deleted, data can't be restored.</b>
                    <div className="mt-5">
                        <div className="btn btn-outline-light btn-lg me-2">Confirm</div>
                        <div className="btn btn-outline-light btn-lg ms-2 clear">Cancel</div>
                    </div>
                </div>

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
                            {loggedIn && <>Sign out</>}
                            {!loggedIn && <>Sign in</>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}