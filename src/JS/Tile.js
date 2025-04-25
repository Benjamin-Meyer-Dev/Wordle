import React, { useEffect, useState } from 'react'

import { BLANK_STRING, BOUNCE_DELAY, CLEAR_DELAY, FLIP_DELAY, TILE_BOUNCE_ANIMATION, TILE_COUNT, TILE_SHAKE_ANIMATION } from './Constants'

//=========================================================================================================================================================================

//Defines a tile on the playing board
function Tile({ row, col, tile, animations, tilesFlipped }) {
    const [bounce, setBounce] = useState(false)
    const [flip, setFlip] = useState(false)
    const [pop, setPop] = useState(false)
    const [shake, setShake] = useState(false)

    //=========================================================================================================================================================================

    //Handling the end of the shake animation
    const handleShakeEnd = (e) => {
        if (e.animationName === TILE_SHAKE_ANIMATION) {
            animations.shake?.onComplete(row)
        }
    }

    //=========================================================================================================================================================================

    //Handling the end of the flip animation
    const handleRowFlipEnd = () => {
        tile.frontLetter = BLANK_STRING
        tile.borderStatus = false

        if (col === TILE_COUNT - 1) {
            animations.flip?.onComplete(row)
        }
    }

    //=========================================================================================================================================================================

    //Handling the end of the board clear animation
    const handleBoardClearEnd = () => {
        tilesFlipped.current += 1

        if (tilesFlipped.current === TILE_COUNT * (animations.boardClear?.row + 1)) {
            animations.boardClear?.onComplete();
        }
    }

    //=========================================================================================================================================================================

    //Handling the end of the bounce animation
    const handleBounceEnd = (e) => {
        if (col === TILE_COUNT - 1 && e.animationName === TILE_BOUNCE_ANIMATION) {
            animations.bounce?.onComplete()
        } 
    }

    //=========================================================================================================================================================================

    //Use effect to set the shake property for the current row
    useEffect(() => {
        if (animations.shake?.row === row) {
            setShake(animations.shake.shouldShake)
        }
    }, [row, animations])

    //=========================================================================================================================================================================

    //Use effect to set the pop property for the current tile
    useEffect(() => {
        if (animations.pop?.row === row && animations.pop?.col === col) {
            setPop(animations.pop.shouldPop)
        }
    }, [row, col, animations])

    //=========================================================================================================================================================================

    //Use effect to set the flip property for the current row
    useEffect(() => {
        if (animations.flip?.row === row) {
            const flipTimeout = setTimeout(() => {
                setFlip(true)
            }, col * FLIP_DELAY)

            return () => clearTimeout(flipTimeout)
        }
    }, [row, col, tile, animations])

    //=========================================================================================================================================================================

    //Use effect to set the flip property for the entire board
    useEffect(() => {
        if (animations.boardClear?.shouldClear) {
            const boardClearTimeout = setTimeout(() => {
                setPop(false)
                setFlip(false)
                setBounce(false)
            }, CLEAR_DELAY)

            return () => clearTimeout(boardClearTimeout)
        }
    }, [animations])

    //=========================================================================================================================================================================

    //Use effect to set the bounce property for the current row
    useEffect(() => {
        if (animations.bounce?.row === row && animations.flip?.hasFlipped) {
            const bounceTimeout = setTimeout(() => {
                setBounce(true)
            }, col * BOUNCE_DELAY)

            return () => clearTimeout(bounceTimeout)
        }
    }, [row, col, animations])

    //=========================================================================================================================================================================

    //HTML structure with properties of an individual tile
    return (
        <div className={`tile-container ${shake ? 'shake' : null} ${flip ? 'flipped' : 'notflipped'}`} onAnimationEnd={handleShakeEnd} onTransitionEnd={(animations.boardClear?.shouldClear ? handleBoardClearEnd : handleRowFlipEnd)}>
            <div className={`tile ${pop ? 'pop' : null} ${bounce ? 'bounce' : null}`} onAnimationEnd={handleBounceEnd}>
                <div className={`tile-front ${tile.borderStatus ? 'active-border' : null}`}>
                    {tile.frontLetter}
                </div>
                <div className={`tile-back ${tile.guessStatus.status}`}>
                    {tile.backLetter}
                </div>
            </div>
        </div>
    )
}

//=========================================================================================================================================================================

export default Tile