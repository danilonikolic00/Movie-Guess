import React, { useEffect, useState } from 'react';
import logo from '../../images/image.png';
import { Link } from 'react-router-dom';
import './Pocetna.css';
import UputstvaModal from './UputstvaModal';
import LoginModal from './LoginModal';
import RangListaModal from './RangListaModal';
import Cookies from 'js-cookie';

function Pocetna() {
    const [isUputstvaModalOpen, setIsUputstvaModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRangListaModalOpen, setIsRangListaModalOpen] = useState(false);
    const id = Cookies.get('id')

    const toggleUputstvaModal = () => {
        setIsUputstvaModalOpen(!isUputstvaModalOpen);
    };

    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    };

    const toggleRangListaModal = () => {
        setIsRangListaModalOpen(!isRangListaModalOpen);
    };

    const handleLogout = () => {
        Cookies.remove('id')
        window.location.reload();
    }

    return (
        <div className="container">
            <div className="image-container">
                <img
                    className="logo"
                    src={logo}
                />
                <div className="button-container">
                    <Link to="/igra">
                        <button className="button">Nova Igra</button>
                    </Link>
                    <button className="button" onClick={toggleUputstvaModal}>Uputstva</button>
                    <button className="button" onClick={toggleRangListaModal}>Rang Lista</button> {/* Button to open the RangListaModal */}
                    {!id && <button className="button" onClick={toggleLoginModal}>Prijava/Registracija</button>}
                    {id && <button className="button" onClick={handleLogout}>Logout</button>} {/* Render 'Logout' button if 'id' cookie exists */}
                </div>
            </div>
            <UputstvaModal isOpen={isUputstvaModalOpen} onClose={toggleUputstvaModal} />
            <LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} />
            <RangListaModal isOpen={isRangListaModalOpen} onClose={toggleRangListaModal} /> {/* Pass isOpen and onClose props to the RangListaModal */}
        </div>
    );
}

export default Pocetna;
