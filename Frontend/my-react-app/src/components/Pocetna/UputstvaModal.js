import './UputstvaModal.css'

function UputstvaModal({ isOpen, onClose }) {
    const handleCloseModal = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content uputstva-modal-container">
                    <h2>Pravila</h2>
                    <p className="uputstva-modal-text">Pogodite film na osnovu detalja!</p>
                    <p className="uputstva-modal-text">Ukoliko je detalj o filmu pogodjen to polje ce biti zelene boje!</p>
                    <p className="uputstva-modal-text">Ukoliko je detalj o filmu promasen to polje ce biti crvene boje!</p>
                    <p className="uputstva-modal-text">Poeni se racunaju kao:<br /><strong>120-(broj_pokusaja*10)</strong></p>
                    <p className="uputstva-modal-text">Ukupan broj pokusaja je <strong>12</strong></p>
                    <button className="uputstva-modal-button" onClick={handleCloseModal}>Zatvori</button>
                </div>
            </div>
        </div>
    );
}

export default UputstvaModal;
