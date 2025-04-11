import React, { useEffect, useState } from 'react'
import Tile from './Tile'

import { TILE_COUNT } from './Constants'

function Line({ index, line, currentGuess, gameOver }) {
    const [allTilesFlipped, setAllTilesFlipped] = useState(false)
    const [startBounce, setStartBounce] = useState(false)

    useEffect(() => {
        if (index === currentGuess && allTilesFlipped && gameOver) {
            setStartBounce(true)
        }
    }, [allTilesFlipped, index, currentGuess, gameOver])

    const handleTileFlip = () => {
        setAllTilesFlipped(true)
    }

    return (
        <div className='line'>
            {[...Array(TILE_COUNT)].map((_, i) => (
                <Tile key={i} index={i} tile={line[i]} tileFlip={handleTileFlip} startBounce={startBounce} />
            ))}
        </div>
    )
}

export default Line