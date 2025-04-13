import React, { useEffect, useRef, useState } from 'react'
import Tile from './Tile'

import { TILE_COUNT } from './Constants'

function Line({ index, line, currentGuess, gameOver, errorFlag, lineShakeIndex, setGameOver }) {
    const [startLineShake, setStartLineShake] = useState(false)
    const [allTilesFlipped, setAllTilesFlipped] = useState(false)
    const [startBounce, setStartBounce] = useState(false)

    const hasMounted = useRef(false)

    useEffect(() => {
        if (hasMounted.current && index === lineShakeIndex) {
            setStartLineShake(true)
        } else {
            hasMounted.current = true
        }
    }, [index, errorFlag, lineShakeIndex])

    useEffect(() => {
        if (index === currentGuess && allTilesFlipped && gameOver) {
            setStartBounce(true)
        }
    }, [allTilesFlipped, index, currentGuess, gameOver])

    const handleTileFlip = () => {
        setAllTilesFlipped(true)
    }

    const handleLineShake = () => {
        setStartLineShake(false)
    }

    return (
        <div className={`line ${startLineShake ? 'shake' : null}`} onAnimationEnd={handleLineShake}>
            {[...Array(TILE_COUNT)].map((_, i) => (
                <Tile key={i} index={i} tile={line[i]} tileFlip={handleTileFlip} startBounce={startBounce} bounceEnd={setGameOver} />
            ))}
        </div>
    )
}

export default Line