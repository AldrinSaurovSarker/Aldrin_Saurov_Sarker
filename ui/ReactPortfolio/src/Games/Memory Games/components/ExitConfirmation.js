const ExitConfirmation = ({ gameStarted, exitGame, resumeGame }) => (
    <div className="exit px-5 pt-5 pb-3 d-flex flex-column justify-content-end">
        <h1>Return to the main menu?</h1>
        {gameStarted && <h6 className="text-danger">Your current match will be abandoned</h6>}
        <div className="mt-auto">
            <button className="btn btn-outline-warning border-2 fw-bold me-1" onClick={exitGame}>Yes</button>
            <button className="btn btn-outline-danger border-2 fw-bold ms-1" onClick={resumeGame}>No</button>
        </div>
    </div>
);

export default ExitConfirmation