import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SingleCard from './SingleCard';
import PauseScreen from './PauseScreen';
import ExitConfirmation from './ExitConfirmation';
import RestartPrompt from './RestartPrompt';
import GameOverDisplay from './GameOverDisplay';

const allCards = [
    { name: 'bat', src: '/images/MemoryGame/Cards/bat.png', matched: false },
    { name: 'cauldron', src: '/images/MemoryGame/Cards/cauldron.png', matched: false },
    { name: 'dracula', src: '/images/MemoryGame/Cards/dracula.png', matched: false },
    { name: 'eye', src: '/images/MemoryGame/Cards/eye.png', matched: false },
    { name: 'ghost', src: '/images/MemoryGame/Cards/ghost.png', matched: false },
    { name: 'ghost2', src: '/images/MemoryGame/Cards/ghost2.png', matched: false },
    { name: 'ghost-cat', src: '/images/MemoryGame/Cards/ghost-cat.png', matched: false },
    { name: 'ghost-tree', src: '/images/MemoryGame/Cards/ghost-tree.png', matched: false },
    { name: 'giftbox', src: '/images/MemoryGame/Cards/giftbox.png', matched: false },
    { name: 'hand', src: '/images/MemoryGame/Cards/hand.png', matched: false },
    { name: 'halloween', src: '/images/MemoryGame/Cards/halloween.png', matched: false },
    { name: 'house', src: '/images/MemoryGame/Cards/house.png', matched: false },
    { name: 'lollipop', src: '/images/MemoryGame/Cards/lollipop.png', matched: false },
    { name: 'pumpkin', src: '/images/MemoryGame/Cards/pumpkin.png', matched: false },
    { name: 'skull', src: '/images/MemoryGame/Cards/skull.png', matched: false },
    { name: 'snowman', src: '/images/MemoryGame/Cards/snowman.png', matched: false },
    { name: 'spider', src: '/images/MemoryGame/Cards/spider.png', matched: false },
    { name: 'wand2', src: '/images/MemoryGame/Cards/wand.png', matched: false },
    { name: 'witch', src: '/images/MemoryGame/Cards/witch.png', matched: false },
    { name: 'x-bone', src: '/images/MemoryGame/Cards/x-bone.png', matched: false }
];

// Initialize audio objects
const bgMusic = new Audio('/audios/MemoryGame/background-music.mp3');
const matchSound = new Audio('/audios/MemoryGame/match.wav');
const flipSound = new Audio('/audios/MemoryGame/flip.wav');
const victorySound = new Audio('/audios/MemoryGame/victory.wav');

export default function Game({difficulty, totalTilesPair}) {
    const getRandomCards = (numCards) => {
        const shuffledCards = [...allCards].sort(() => 0.5 - Math.random());
        return shuffledCards.slice(0, numCards);
    };

    const cardImages = getRandomCards(totalTilesPair);
    const [cards, setCards] = useState([]);
    const [blocked, setBlocked] = useState(false);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [totalFlips, setTotalFlips] = useState(0);
    const [tilesLeft, setTilesLeft] = useState(totalTilesPair * 2);
    const [musicMuted, setMusicMuted] = useState(false);
    const [soundMuted, setSoundMuted] = useState(false);
    const [gamePaused, setGamePaused] = useState(false);
    const [pauseEvent, setPauseEvent] = useState('');
    const [isBlurred, setIsBlurred] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);

    const navigate = useNavigate();

    const blur = () => {
        setIsBlurred(true);
    }

    const unblur = () => {
        setIsBlurred(false);
    }

    const initializeCards = () => {
        shuffleCards();
        setTotalFlips(0);
    };

    const shuffleCards = () => {
        unflipCard();
        setGameStarted(false);
        let shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));
        setCards(shuffledCards);
        setTotalFlips(0);
    };

    const startGame = () => {
        setGameStarted(true);
        backgroundMusicPlay();
    }

    const flipCard = (card) => {
        if (gamePaused) {
            return;
        }

        if (!gameStarted) {
            startGame();
        }

        flipSoundPlay();
        firstCard ? setSecondCard(card) : setFirstCard(card);
        setTotalFlips(totalFlips => totalFlips + 1);
    }

    const unflipCard = () => {
        setFirstCard(null);
        setSecondCard(null);
        setBlocked(false);
    }

    const checkForMatch = () => {
        if (!firstCard || !secondCard) return;
        setBlocked(true);

        if (firstCard.name === secondCard.name) {
            matchSoundPlay();
            setTilesLeft(tilesLeft => tilesLeft - 2);
            setCards(prevCards => {
                return prevCards.map(card => {
                    if (card.name === firstCard.name) {
                        return { ...card, matched: true };
                    } else {
                        return card;
                    }
                });
            });
            unflipCard();
        } else {
            setTimeout(() => unflipCard(), 1000);
        }
    };

    const checkForGameOver = () => {
        if (tilesLeft === 0) {
            pauseGame('gameover');
            victorySoundPlay();
            return;
        }
    }

    const pauseGame = (event) => {
        blur();
        setCurrentAction(event);
        setGamePaused(true);
        setPauseEvent(event);
    };

    const resumeGame = () => {
        unblur();
        setCurrentAction(null);
        setGamePaused(false);

        if (!soundMuted)
            flipSound.play();

        if (gameStarted) {
            bgMusic.play();
        }
    };

    const exitGame = () => {
        navigate('/games/memory-game/play');
    };

    const restartGame = () => {
        window.location.reload();
    }

    const toggleMusic = () => {
        setMusicMuted(!musicMuted);
    }

    const toggleSound = () => {
        setSoundMuted(!soundMuted);
    }

    const backgroundMusicPlay = () => {
        bgMusic.volume = musicMuted ? 0 : 1;
        bgMusic.play();
    };

    const matchSoundPlay = () => {
        if (!soundMuted) {
            matchSound.play();
        }
    };

    const flipSoundPlay = () => {
        if (!soundMuted) {
            flipSound.play();
        }
    };

    const victorySoundPlay = () => {
        bgMusic.pause();
        bgMusic.currentTime = 0;

        if (!soundMuted) {
            victorySound.play();
        }
    };

    useEffect(() => {
        if (!gameStarted) {
            initializeCards();
        }
        checkForMatch();
    }, [firstCard, secondCard]);

    useEffect(() => {
        checkForGameOver();
    }, [tilesLeft]);

    useEffect(() => {
        bgMusic.volume = musicMuted ? 0 : 1;
    }, [musicMuted]);

    useEffect(() => {
        if (gamePaused) {
            flipSoundPlay();
            bgMusic.pause();
        }
    }, [gamePaused, pauseEvent, gameStarted]);

    useEffect(() => {
        let interval;

        if (gameStarted && !gamePaused) {
            interval = setInterval(() => {
                setTimeElapsed((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [gameStarted, gamePaused]);

    useEffect(() => {
        bgMusic.loop = true;

        return () => {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        };
    }, []);

    return (
        <>
            {currentAction === 'pause' && <PauseScreen resumeGame={resumeGame} />}
            {currentAction === 'exit' && <ExitConfirmation gameStarted={gameStarted} exitGame={exitGame} resumeGame={resumeGame} />}
            {currentAction === 'restart' && <RestartPrompt gameStarted={gameStarted} restartGame={restartGame} resumeGame={resumeGame} />}
            {currentAction === 'gameover' && <GameOverDisplay totalFlips={totalFlips} timeElapsed={timeElapsed} exitGame={exitGame} restartGame={restartGame} />}

            <div className={`bg-dark game-body ${isBlurred ? 'blurred' : ''}`}>
                <div className="board fw-bold text-center w-100 text-light p-4 mb-3 d-flex">
                    <div className="score-board d-flex align-items-center">
                        <h6 className='font-4 px-4'>Flips : {totalFlips}</h6>
                        <h6 className='font-4 px-4'>Tiles left : {tilesLeft}</h6>
                        <h6 className='font-4 px-4'>Time : {timeElapsed} seconds</h6>
                    </div>

                    <div className="media d-flex ms-auto">
                        <i className="fas fa-pause border border-4 mx-1 text-light" onClick={() => pauseGame('pause')}></i>
                        <i className={`fas fa-music border border-4 mx-1 text-light ${soundMuted ? 'fa-volume-mute muted' : 'fa-volume-up'}`} onClick={toggleSound}></i>
                        <i className={`fas fa-music border border-4 mx-1 text-light ${musicMuted ? 'muted' : ''}`} onClick={toggleMusic}></i>
                        <i className="fas fa-undo border border-4 mx-1 text-light" onClick={() => pauseGame('restart')}></i>
                        <i className="fas fa-home border border-4 mx-1 text-light" onClick={() => pauseGame('exit')}></i>
                    </div>
                </div>

                <div className={`container-fluid memory-game ${difficulty}`}>
                    {cards.map((card, index) => (
                        <SingleCard
                            key={card.id}
                            card={card}
                            flipCard={flipCard}
                            flipped={card === firstCard || card === secondCard || card.matched}
                            matched={card.matched}
                            blocked={blocked}>
                        </SingleCard>
                    ))}
                </div>
            </div>
        </>
    )
};
