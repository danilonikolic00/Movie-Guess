import React from 'react';
import './IgricaModal.css';
import { Link } from 'react-router-dom';

const Modal = ({ message, onPlayAgain }) => {
    return (
        <div className="modal-background-igrica">
            <div className="modal-igrica">
                <p>{message}</p>
                <div className='button-container-igrica'>
                    <button className='button-primary' onClick={onPlayAgain}>Igraj ponovo</button>
                    <Link to="/">
                        <button className='button-secondary'>Pocetna</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Modal;
