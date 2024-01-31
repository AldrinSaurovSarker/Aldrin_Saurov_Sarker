const GameOverDisplay = ({ totalFlips, timeElapsed, exitGame, restartGame }) => (
    <div className="gameover px-5 pt-5 pb-3 d-flex flex-column justify-content-end">
        <h1 className="text-uppercase">Congratulations!</h1>
        <h6 className="text-light">Total moves: {totalFlips}</h6>
        <h6 className="text-light">Total time: {timeElapsed} seconds</h6>
        <div className="mt-auto">
            <button className="btn btn-outline-warning border-2 fw-bold me-1" onClick={exitGame}>
                <i className="fas fa-home"></i>
            </button>
            <button className="btn btn-outline-danger border-2 fw-bold ms-1" onClick={restartGame}>
                <i className="fas fa-redo-alt restart"></i>
            </button>
        </div>
    </div>
);

export default GameOverDisplay