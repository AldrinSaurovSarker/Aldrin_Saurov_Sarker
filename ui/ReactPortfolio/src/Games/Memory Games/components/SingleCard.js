export default function SingleCard({ card, flipCard, flipped, matched, blocked }) {
    const flip = () => {
        if (!blocked) {
            flipCard(card);
        }
    }

    return (
        <div className={`memory-card ${flipped ? 'flipped' : ''} ${matched ? 'matched' : ''}`}>
            <img className="front-face" src='/images/MemoryGame/butterfly.png' alt="Front" onClick={flip}/>
            <img className="back-face" src={card.src} alt={card.name}/>
        </div>
    )
}