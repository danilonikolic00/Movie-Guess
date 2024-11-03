import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './Igrica.css';
import Cookies from 'js-cookie';
import IgricaModal from './IgricaModal'
import Alert from '../Pocetna/Alert';

function Igrica() {
    const [textInput, setTextInput] = useState('')
    const [filmovi, setFilmovi] = useState([]);
    const [film, setFilm] = useState([])
    const [pokusaj, setPokusaj] = useState([])
    const [rezultat, setRezultat] = useState([])
    const [broj_pokusaja, setBrojPokusaja] = useState(0)
    const id = Cookies.get('id')
    const inputRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        VratiFilm()
    }, []);

    useEffect(() => {
        if (film.naziv)
            console.log(film.naziv)
    }, [rezultat]);

    useEffect(() => {
        if (textInput.trim() !== '') {
            VratiFilmove();
        } else {
            setFilmovi([]);
        }
    }, [textInput]);

    const handleInputChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleSelectFilm = (selectedFilm) => {
        setTextInput(selectedFilm);
        setFilmovi([])
        setDropdownVisible(false)
    };

    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleButtonClick();
        }
        setDropdownVisible(true)
    };

    const handlePlayAgain = () => {
        window.location.reload()
    };

    const showAlertMessage = (message) => {
        setAlertMessage(message)
        setShowAlert(true)
    };

    const hideAlertMessage = () => {
        setShowAlert(false);
    };

    const VratiFilmove = async () => {
        try {
            const response = await axios.get(`http://localhost:5189/Film/VratiFilmove/${textInput}`);
            setFilmovi(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const VratiFilm = async () => {
        try {
            const response = await axios.get('http://localhost:5189/Film/VratiFilm/');
            setFilm(response.data)
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleButtonClick = async () => {
        try {
            if (textInput === '') {
                const message = ('Niste uneli film,pokusajte ponovo!')
                showAlertMessage(message)
                return
            }

            const provera = await axios.get(`http://localhost:5189/Film/PostojiFilm/${textInput}`)
            if (provera.data === false) {
                const message2 = ('Ne postoji film sa ovim nazivom!')
                showAlertMessage(message2)
                return
            }

            const response = await axios.get(`http://localhost:5189/Film/VratiPostojeciFilm/${textInput}`);
            if (response.data)
                setPokusaj(prevState => [...prevState, response.data]);
            setBrojPokusaja(prevBrojPokusaja => prevBrojPokusaja + 1)

            const response2 = await axios.get(`http://localhost:5189/Film/UporediFilmove/${textInput}/${film.naziv}`)
            setTextInput('')
            setRezultat(prevState => [...prevState, response2.data]);

            if (response2.data[0] === true) {
                const message = `Pogodili ste film! Broj pokusaja: ${broj_pokusaja + 1} Broj bodova:${120 - broj_pokusaja * 10}`;
                if (id) {
                    await axios.put(`http://localhost:5189/Korisnik/AzurirajKorisnika/${id}/${true}/${broj_pokusaja + 1}`)
                }
                setModalMessage(message)
                setGameOver(true)
                setShowModal(true)
            }

            if (broj_pokusaja + 1 === 12 && response2.data[0] === false) {
                const message = `Niste pogodili film! Trazeni film:${film.naziv}`;
                if (id) {
                    await axios.put(`http://localhost:5189/Korisnik/AzurirajKorisnika/${id}/${false}/${broj_pokusaja + 1}`)
                }
                setModalMessage(message)
                setGameOver(true)
                setShowModal(true)
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <div className="container_igra">
            <div>
                {showAlert && <Alert message={alertMessage} onClose={hideAlertMessage} />}
                {showModal && <IgricaModal message={modalMessage} onPlayAgain={handlePlayAgain} />}
                <div className="input-overlay">
                    {dropdownVisible && textInput && filmovi.length>0 && (
                        <div className="dropdown" style={{ position: 'relative', width: inputRef.current ? inputRef.current.offsetWidth : 'auto' }}>
                            <ul className="dropdown-menu">
                                {filmovi.map((film, index) => (
                                    <li key={index} onClick={() => handleSelectFilm(film)}>
                                        {film}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <input
                        type="text"
                        value={textInput}
                        onChange={handleInputChange}
                        onKeyPress={handleEnterKeyPress}
                        placeholder="Unesite ime filma"
                        disabled={gameOver}
                    />
                    <button onClick={handleButtonClick}>Enter</button>
                    <div className='dodatno'>Trajanje: {Math.floor(film.duzina / 60)}h {film.duzina % 60}min Oskar:{film.oskar ? "Da" : "Ne"}
                    </div>
                    <div className="rezultati-container">
                        {rezultat.map((rez, index) => (
                            <div key={index} className="rezultat">
                                {pokusaj.length > index && pokusaj[index] && Object.values(pokusaj[index]).map((value, i) => {
                                    if (i === 4 && film.godina != value) {
                                        const starijiNoviji = film.godina < value ? "Stariji" : "Noviji";
                                        const backgroundColor = starijiNoviji === "Stariji" ? '#5252E4' : '#7D3CFF';
                                        return (
                                            <div>
                                                {index === pokusaj.length - 1 && <div className='film-detalji'>Godina</div>}
                                                <div
                                                    key={i}
                                                    className="rezultat-item"
                                                    style={{
                                                        backgroundColor: backgroundColor,
                                                        textAlign: 'center',
                                                        color: 'white'
                                                    }}
                                                >
                                                    {starijiNoviji}
                                                    <br></br>
                                                    ({value})
                                                </div>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div>
                                            {index === pokusaj.length - 1 &&
                                                <div className='film-detalji'>
                                                    {(i === 0) ? "Film" : null}
                                                    {(i === 1) ? "Zemlja" : null}
                                                    {(i === 2) ? "Reziser" : null}
                                                    {(i === 3) ? "Glumac" : null}
                                                    {(i === 4) ? "Godina" : null}
                                                    {(i === 5) ? "Zanr" : null}
                                                </div>}
                                            <div
                                                key={i}
                                                className="rezultat-item"
                                                style={{
                                                    backgroundColor: rez[i] ? '#4CAF50' : '#FF6D31 ',
                                                    textAlign: 'center',
                                                    color: 'white'
                                                }}
                                            >
                                                {value}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Igrica;
