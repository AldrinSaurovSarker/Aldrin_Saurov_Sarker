export default function Status(params) {
    return (
        <>
            <ul className="list-group">
                <li className="list-group-item font-1 fw-bold d-flex">
                    <div className="col-md-6 text-info">Board Size</div>
                    <div className="col-md-6 text-danger text-end"></div>
                </li>
                <li className="list-group-item font-1 fw-bold d-flex">
                    <div className="col-md-6 text-info">Total Cells</div>
                    <div className="col-md-6 text-danger text-end"></div>
                </li>
                <li className="list-group-item font-1 fw-bold d-flex">
                    <div className="col-md-6 text-info">Total Bombs</div>
                    <div className="col-md-6 text-danger text-end"></div>
                </li>
                <li className="list-group-item font-1 fw-bold d-flex">
                    <div className="col-md-6 text-info">Cells Covered</div>
                    <div className="col-md-6 text-danger text-end"></div>
                </li>
                <li className="list-group-item font-1 fw-bold d-flex">
                    <div className="col-md-6 text-info">Cells Revealed</div>
                    <div className="col-md-6 text-danger text-end">1</div>
                </li>
            </ul>
        </>
    )
}