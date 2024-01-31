import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Head from './CommonComponents/Head';

import Certifications from "./Portfolio/components/Certifications";
import Contributions from "./Portfolio/components/Contributions";
import Education from "./Portfolio/components/Education";
import Experience from "./Portfolio/components/Experience";
import Extra from "./Portfolio/components/Extra";
import Footer from "./Portfolio/components/Footer";
import Greetings from "./Portfolio/components/Greetings";
import ModeChanger from "./Portfolio/components/ModeChanger";
import Navbar from "./Portfolio/components/Navbar";
import OnlineJudges from "./Portfolio/components/OnlineJudges";
import Projects from "./Portfolio/components/Projects";
import Research from "./Portfolio/components/Research";
import Skills from "./Portfolio/components/Skills";

import MemoryGameHome from "./Games/Memory Games/components/Home";
import Loader from "./Games/Memory Games/components/Loader";
import MemoryGame from './Games/Memory Games/components/Game';

import Minesweeper from './Games/Minesweeper/components/Game';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={
                    <>
                        <Head></Head>
                        <ModeChanger />
                        <Navbar />
                        <Greetings />
                        <Skills />
                        <Experience />
                        <Education />
                        <Research />
                        <Projects />
                        <OnlineJudges />
                        <Contributions />
                        <Certifications />
                        <Extra />
                        <Footer />
                    </>
                } />

                <Route path="/games/memory-game" element={
                    <>
                        <Head></Head>
                        <Loader />
                    </>
                } />

                <Route path="/games/memory-game/play" element={
                    <>
                        <Head></Head>
                        <MemoryGameHome></MemoryGameHome>
                    </>
                } />

                <Route path="/games/memory-game/play/easy" element={
                    <>
                        <Head></Head>
                        <MemoryGame difficulty='easy' totalTilesPair={6} />
                    </>
                } />

                <Route path="/games/memory-game/play/medium" element={
                    <>
                        <Head></Head>
                        <MemoryGame difficulty='medium' totalTilesPair={12} />
                    </>
                } />

                <Route path="/games/memory-game/play/hard" element={
                    <>
                        <Head></Head>
                        <MemoryGame difficulty='hard' totalTilesPair={20} />
                    </>
                } />

                <Route path="/games/minesweeper" element={
                    <>
                        <Head></Head>
                        <Minesweeper />
                    </>
                } />
            </Routes>
        </Router>
    );
}

export default App;
