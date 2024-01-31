import Top from "../Top";
import Status from "./Status";

export default function Game() {
    return (
        <>
            <div className="container-fluid">
                <div className="content">
                    <Top></Top>

                    <div className="details">
                        <h2 className="alert alert-danger">Game Info</h2>
                        <Status></Status>
                        
                        
                            
                        

                        <div className="btn-group-vertical">
                            <div className="btn btn-primary shuffle">
                                <i className="fas fa-play"></i> Start New Game
                            </div>

                            <div className="btn btn-primary restart">
                                <i className="fas fa-redo"></i> Restart Level
                            </div>

                            <div className="btn btn-primary change-grid-btn">
                                <i className="fas fa-border-all"></i> Change Grid Size
                            </div>

                            <a className="btn btn-primary" href="_init_.html">
                                <i className="fas fa-sign-out-alt"></i> Exit
                            </a>
                        </div>

                        <div className="btn-group">
                            <div className="btn btn-primary shuffle">
                                <i className="fas fa-play"></i> Start New Game
                            </div>

                            <div className="btn btn-primary restart">
                                <i className="fas fa-redo"></i> Restart Level
                            </div>

                            <div className="btn btn-primary change-grid-btn">
                                <i className="fas fa-border-all"></i> Change Grid Size
                            </div>

                            <a className="btn btn-primary" href="_init_.html">
                                <i className="fas fa-sign-out-alt"></i> Exit
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}