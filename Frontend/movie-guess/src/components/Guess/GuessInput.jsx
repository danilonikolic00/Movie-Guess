import './GuessInput.css'
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/image.png"
import GameModal from '../UI/GameModal';

const checkMovie = async (movie) => {
    const provera = await axios.get(`http://localhost:5189/Film/PostojiFilm/${movie}`)
    if (provera.data === false) {
        return null
    }
    const response = await axios.get(`http://localhost:5189/Film/VratiPostojeciFilm/${movie}`);
    return response.data
}

const GuessInput = (props) => {
    const [enteredMovie, setEnteredMovie] = useState('');
    const [moviesDropdown, setMoviesDropdown] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(true);
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        if (!dropdownVisible)
            return
        if (enteredMovie.trim() !== '') {
            getMovies();
            setDropdownVisible(true);
        } else {
            setMoviesDropdown([]);
            setDropdownVisible(false);
        }
    }, [enteredMovie]);

    const handleChangeMovie = (event) => {
        setEnteredMovie(event.target.value);

        if (event.target.value.trim() !== '') {
            setDropdownVisible(true);
        }
    };

    const getMovies = async () => {
        try {
            const response = await axios.get(`http://localhost:5189/Film/VratiFilmove/${enteredMovie}`);
            setMoviesDropdown(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleSelectFilm = (selectedFilm) => {
        setEnteredMovie(selectedFilm);
        setMoviesDropdown([]);
        setDropdownVisible(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleClick();
        }
    }

    const handleClick = async () => {
        if (enteredMovie === '') {
            setAlertMessage("No movie entered!")
            return;
        }
        try {
            const movieData = await checkMovie(enteredMovie);
            if (!movieData)
                setAlertMessage("Movie not found!")
            props.onAddGuess(movieData);
            setEnteredMovie('');
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleCloseAlert = () => {
        setAlertMessage(null);
    }
    return (
        <div className="input-form">
            {alertMessage && <GameModal
                message={alertMessage}
                onClose={handleCloseAlert}
                isAlert
            />}
            <div className="logo">
                <img src={logo} alt="" />
                <h1>Movie Guess</h1>
            </div>
            <div className="input-button">
                <div className="input-container">
                    <input type="text"
                        value={enteredMovie}
                        onChange={handleChangeMovie}
                        disabled={props.disabled}
                        className='input'
                        placeholder='Enter movie name...'
                        onKeyDown={handleKeyPress}
                    />
                    {dropdownVisible && (
                        <div className="dropdown">
                            <ul className="dropdown-menu">
                                {moviesDropdown.map((film, index) => (
                                    <li key={index} onClick={() => handleSelectFilm(film)}>
                                        {film}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <button
                    className="button-20"
                    onClick={handleClick}
                >
                    Submit
                </button>
            </div>
            <div className="additional">
                <p>Oscar: {props.movie.oskar ? "Yes" : "No"} </p>
                <p>Duration: {Math.floor(props.movie.duzina / 60)}h {props.movie.duzina % 60}min </p>
            </div>
            <div className="instruction">
                <div className="correct">Correct</div>
                <div className="wrong">Wrong</div>
                <div className="older">Older</div>
                <div className="newer">Newer</div>
            </div>
        </div>
    );
}

export default GuessInput;