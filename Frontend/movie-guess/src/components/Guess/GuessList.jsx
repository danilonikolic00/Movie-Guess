import './GuessList.css'
import Guess from "./Guess";

const GuessList = (props) => {
    return (
        props.result.length > 0 && (<div className="guess-list-container">
            {props.result.map((guessArray, index) => (
                <div className="detail" key={index}>
                    <Guess
                        guess={guessArray}
                        enteredMovie={props.enteredMovies[index]}
                        isFirstGuess={index === 0}
                        movieYear={props.movieYear}
                    />
                </div>
            ))}
        </div>)
    );
}

export default GuessList