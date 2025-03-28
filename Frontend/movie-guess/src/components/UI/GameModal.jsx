import './GameModal.css'

const GameModal = (props) => {

    return (
        <div className="modal">
            <p>{props.message}</p>
            <button className='button-20' onClick={props.onClose}>{props.isAlert ? "Close" : "Play Again"}</button>
        </div>
    );
}

export default GameModal