import './Game.css'
import axios from "axios";
import GuessInput from "../Guess/GuessInput";
import GuessList from "../Guess/GuessList";
import GameModal from "../UI/GameModal"
import { useEffect, useState } from "react";

const compareMovies = async (movie, generatedMovie) => {
    const response = await axios.get(`http://localhost:5045/Film/UporediFilmove/${movie}/${generatedMovie}`)
    return response.data
}

const Game = () => {
    const [generatedMovie, setGeneratedMovie] = useState([]);
    const [guesses, setGuesses] = useState([]);
    const [enteredMovies, setEnteredMovies] = useState([]);
    const [isOver, setIsOver] = useState(false);
    const [modalMessage, setModalMessage] = useState(null);

    useEffect(() => {
        getMovie()
    }, []);

    useEffect(() => {
        isGameOver()
    }, [guesses])

    const getMovie = async () => {
        const response = await axios.get('http://localhost:5045/Film/VratiFilm/');
        setGeneratedMovie(response.data)
    }

    const isGameOver = () => {
        if (guesses.length === 10) {
            setIsOver(true);
            setModalMessage(`Game over! Movie: ${generatedMovie.naziv}`);
            return true;
        }
        return false;
    };

    const gameWon = (guess) => {
        if (guess) {
            const points = (10 - guesses.length) * 10;
            setIsOver(true);
            setModalMessage(`Game won! Points ${points}`);
            return true;
        }
        return false;
    };

    const addGuessHandler = async (movie) => {
        const guess = await compareMovies(movie.naziv, generatedMovie.naziv);
        setEnteredMovies(prev => [movie, ...prev]);
        setGuesses(prev => [guess, ...prev]);
        gameWon(guess[0]);
    };

    const closeModal = () => {
        setModalMessage(null);
        window.location.reload()
    };

    return (
        <div className="game-container">
            {modalMessage && (
                <GameModal
                    message={modalMessage}
                    onClose={closeModal}
                    isAlert={false}
                />
            )}
            <GuessInput
                movie={generatedMovie}
                disabled={isOver}
                onAddGuess={addGuessHandler}
            />
            <p className='remain'> Remain Guesses: {10 - guesses.length}</p>
            <GuessList
                result={guesses}
                enteredMovies={enteredMovies}
                movieYear={generatedMovie.godina}
            />
        </div>
    );
}

export default Game;