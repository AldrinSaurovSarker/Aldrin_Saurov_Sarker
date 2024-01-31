export default function Top() {
    return (
        <div className="game">
            <div className="d-sm-flex">
                <div className="d-flex col-md-2 me-3">
                    <div className="alert alert-info col-md-4 d-flex align-items-center justify-content-center">
                        <i className="far fa-clock"></i>
                        <div className="timer ms-1">0</div>
                    </div>

                    <div className="alert alert-success col-md-4 mx-1 d-flex align-items-center justify-content-center">
                        <i className="fas fa-flag text-danger"></i>
                        <div className="flags"></div>
                    </div>

                    <div className="alert alert-danger col-md-4 cursor-pointer pause-button d-flex align-items-center justify-content-center">
                        <i className="fas fa-pause"></i>
                    </div>
                </div>

                <div className="alert alert-dark d-flex align-items-center">
                    <div className="text-uppercase fw-bold font-5 text-center">Select Theme</div>
                    <select name="themes" className="ms-2 font-5 cursor-pointer" id="themes">
                        <option value="theme-light" className="font-5 text-center">CLASSIC</option>
                        <option value="theme-dark" className="font-5 text-center">DARK</option>
                        <option value="theme-fire" className="font-5 text-center">FLAME</option>
                        <option value="theme-ice" className="font-5 text-center">ICE</option>
                        <option value="theme-nature" className="font-5 text-center">NATURE</option>
                    </select>
                </div>
            </div>
        </div>
    )
}