import React, { useEffect, useState } from 'react'
import { BLANK_STRING, BOUNCE_DELAY, FLIP_DELAY, TILE_COUNT } from './Constants'

function Tile({ index, tile, tileFlip, startBounce, bounceEnd }) {
    const [pop, setPop] = useState(false)
    const [flip, setFlip] = useState(false)
    const [bounce, setBounce] = useState(false)

    useEffect(() => {
        if (tile.letter !== BLANK_STRING) {
            setPop(true)
        } else {
            setPop(false)
        }
    }, [tile])

    useEffect(() => {
        if (tile.flippedStatus) {
            const timeout = setTimeout(() => {
                setFlip(true)
            }, index * FLIP_DELAY)

            return () => clearTimeout(timeout)
        }
    }, [index, tile])

    useEffect(() => {
        if (startBounce) {
            const timeout = setTimeout(() => {
                setBounce(true)
            }, index * BOUNCE_DELAY)
    
            return () => clearTimeout(timeout)
        }
    }, [index, startBounce])

    const handleFlipEnd = () => {
        if (index === TILE_COUNT - 1) {
            tileFlip()
        }
    }

    const handleBounceEnd = (event) => {
        if (event.animationName === 'bounceAnimation' && index === TILE_COUNT - 1) {
            bounceEnd()
        } 
    }

    return (
        <div className={`tile-container ${flip ? 'flipped' : null}`} onTransitionEnd={handleFlipEnd}>
            <div className={`tile ${pop ? 'pop' : null} ${bounce ? 'bounce' : null}`} onAnimationEnd={handleBounceEnd}>
                <div className={`tile-front ${tile.borderStatus ? 'active-border' : null}`}>
                    {tile.letter}
                </div>
                <div className={`tile-back ${tile.guessStatus}`}>
                    {tile.letter}
                </div>
            </div>
        </div>
    )
}

export default Tile