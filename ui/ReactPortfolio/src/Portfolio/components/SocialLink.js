function SocialLink({url, title, icon, intro}) {
    return (
        <li className={`list-item ${intro ? 'col' : ''} d-flex align-items-center justify-content-center text-center`} data-bs-placement="bottom" title={title}>
            <a href={url} target="_blank" rel="noreferrer" className="smooth">
                <i className={icon}></i>
            </a>
        </li>
    )
}

export default SocialLink;


