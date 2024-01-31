export default function SectionTitle({title, details}) {
    return (
        <div className='section-title pe-5'>
            <h1 className="my-4 fw-bold">{title}</h1>
            <div className='horizontal-line w-100 mb-1'></div>
            <div className='horizontal-line w-75 mb-1'></div>
            <div className='horizontal-line w-50 mb-1'></div>
            <div className='horizontal-line w-25 mb-1'></div>
            <p>{details}</p>
        </div>
    )
}