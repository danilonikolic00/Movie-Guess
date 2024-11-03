import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import './LoginModal.css'
import Alert from './Alert';

function LoginModal({ isOpen, onClose }) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleCloseModal = () => {
        onClose();
    };

    const showAlertMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
    };

    const hideAlertMessage = (event) => {
        setShowAlert(false);
    };

    if (!isOpen) return null;

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        const usernameField = document.getElementById('username');
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirmPassword');
        if (usernameField) usernameField.value = '';
        if (passwordField) passwordField.value = '';
        if (confirmPasswordField) confirmPasswordField.value = '';
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await axios.get(`http://localhost:5189/Korisnik/Login/${username}/${password}`);
            if (response.data === 0) {
                const message = ('Pogresni podaci za prijavu!')
                showAlertMessage(message)
                return
            }
            console.log(response.data);
            Cookies.set('id', response.data)
            handleCloseModal()
        } catch (error) {
            //alert('Pogresni podaci za prijavu!')
            return
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (password !== confirmPassword) {
            const message = ('Unesite iste lozinke!')
            showAlertMessage(message)
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5189/Korisnik/Register/${username}/${password}`);
            alert(response.data);
            handleCloseModal();
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content login-modal">
                    <h2>{isLoginMode ? "Prijava" : "Registracija"}</h2>
                    <form onSubmit={isLoginMode ? handleLogin : handleRegister}>
                        <div>
                            <label htmlFor="username">Korisnicko ime:</label>
                            <input type="text" id="username" name="username" />
                        </div>
                        <div>
                            <label htmlFor="password">Lozinka:</label>
                            <input type="password" id="password" name="password" />
                        </div>
                        {isLoginMode ? null : (
                            <div>
                                <label htmlFor="confirmPassword">Potvrdite lozinku:</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" />
                            </div>
                        )}
                        <button type="submit">{isLoginMode ? "Prijava" : "Registracija"}</button>
                        {showAlert && <Alert message={alertMessage} onClose={hideAlertMessage} />}
                    </form>
                    <p>{isLoginMode ? "Nemas nalog?" : "Imas nalog?"} <button onClick={toggleMode}>{isLoginMode ? "Registruj se" : "Prijavi se"}</button></p>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
