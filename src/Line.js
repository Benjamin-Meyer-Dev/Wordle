import React from 'react'
import Tile from './Tile'
import { TILE_COUNT } from './Constants'

function Line({ letters }) {
    return (
        <div className='line'>
            {[...Array(TILE_COUNT)].map((_, i) => (
                <Tile key={i} index={i} letter={letters[i]}/>
            ))}
        </div>
    )
}

export default Line