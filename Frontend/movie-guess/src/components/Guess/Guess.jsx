import './Guess.css'
import Tile from "./Tile";

const Guess = (props) => {

    const movieValues = [
        props.enteredMovie.naziv,
        props.enteredMovie.zemlja,
        props.enteredMovie.reziser,
        props.enteredMovie.glumac,
        props.enteredMovie.godina,
        props.enteredMovie.zanr
    ];

    const items = ['Name', 'Country', 'Director', 'Lead Actor', 'Year', 'Genre']

    return (
        <div className="guess-container">
            {props.guess.map((isCorrect, index) =>
                <Tile
                    key={index}
                    boolean={isCorrect}
                    movieDetail={movieValues[index]}
                    nameDetail={items[index]}
                    movieYear={props.movieYear}
                    isYear={index === 4}
                />
            )}
        </div>
    );
};

export default Guess;