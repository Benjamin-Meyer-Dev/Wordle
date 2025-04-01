import { useState, useEffect } from 'react'

function FetchWord() {
    const [word, setWord] = useState(null)
    
    useEffect(() => {
        async function getWord() {
            const response = await fetch("https://random-word-api.herokuapp.com/word?length=5")
            const result = await response.json()

            setWord(result[0])
        }

        getWord()
    }, [])

    return (
        <div>
            {word && <h2>{word.toUpperCase()}</h2>}
        </div>
    )
}

export default FetchWord