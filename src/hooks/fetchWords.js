import { useEffect } from 'react'

function FetchWords() {
    useEffect(() => {
        async function getAllWords() {
            try {
                const response = await fetch("https://random-word-api.herokuapp.com/all")
                const result = await response.json()
                const filteredWords = result.filter(word => word.length === 5)

                localStorage.setItem('wordleWords', JSON.stringify(filteredWords))
            } catch (err) {
                console.error("Failed to fetch or store words: ", err)
            }
        }

        getAllWords()
    }, [])

    return null
}

export default FetchWords