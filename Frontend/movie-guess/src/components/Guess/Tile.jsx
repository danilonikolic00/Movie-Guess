import './Tile.css'

const Tile = (props) => {

    const baseTileStyle = {
        backgroundColor: props.boolean ? '#211C84' : '#B5A8D5',
    };

    const yearTileStyle = {
        backgroundColor: (props.movieDetail > props.movieYear) ? '#4D55CC' : '#7A73D1', 
    };

    const tileStyle = (props.isYear && props.movieDetail != props.movieYear) ? yearTileStyle : baseTileStyle;

    return (
        <div className='tile-detail'>
            {props.nameDetail}
            <div className='tile' style={tileStyle}>
                {props.movieDetail}
            </div>
        </div>
    );
}

export default Tile;