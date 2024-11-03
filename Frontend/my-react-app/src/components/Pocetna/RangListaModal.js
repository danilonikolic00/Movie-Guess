import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RangListaModal.css';

function RangListaModal({ isOpen, onClose }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (isOpen) {
            preuzmiKorisnike();
        }
    }, [isOpen]);

    const preuzmiKorisnike = async () => {
        try {
            const response = await axios.get('http://localhost:5189/Korisnik/VratiRangListu');
            setUsers(response.data);

        } catch (error) {
            console.error('Error fetching user statistics:', error);
        }
    };

    const handleCloseModal = () => {
        onClose();
    };

    if (!isOpen) return null;

    // Inside RangListaModal component's return statement
return (
    <div className="modal-overlay" onClick={handleCloseModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content rang-lista-modal">
                <h3>Rang Lista</h3>
                <div className="user-list-container">
                    <div className="user-list">
                        {users.map((user, index) => (
                            <div key={index} className="user-item">
                                <p>{index+1}.{user.korisnickoIme}</p>
                                <p><strong>Pogodjeni:</strong> {user.brojPogodjenih}</p>
                                <p><strong>Odigrano:</strong> {user.brojOdigranih}</p>
                                <p><strong>Uspesnost (%):</strong> {user.uspesnost.toFixed(0)}</p>
                                <p><strong>Ukupan Skor:</strong> {user.ukupanSkor}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default RangListaModal;
