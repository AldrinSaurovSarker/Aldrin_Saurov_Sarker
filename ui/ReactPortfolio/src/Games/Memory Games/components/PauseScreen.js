const PauseScreen = ({ resumeGame }) => (
    <div className="pauseScreen">
        <h1>Game Paused</h1>
        <span className="border border-warning rounded-circle p-4" onClick={resumeGame}>
            <i className="fas fa-play fa-2x text-warning"></i>
        </span>
    </div>
);

export default PauseScreen;
