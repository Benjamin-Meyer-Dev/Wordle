import React from 'react'
import FetchWord from './hooks/fetchWord'
import './styles.css'

function App() {
    return (
        <div>
            <h1>Wordle</h1>
            <FetchWord />
        </div>
    )
}

export default App