export default function Star({ length }) {
    return (
        <>
            {Array.from({ length: 10 }).map((_, index) => (
                <span key={index}>
                    <sup><i className="fas fa-star"></i></sup>
                    <sub><i className="far fa-star"></i></sub>
                </span>
            ))}
        </>
    )
}