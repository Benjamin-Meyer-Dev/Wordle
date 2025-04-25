import { useEffect, useState, useCallback } from 'react'

import { BLANK_STRING, FIRST_SLICE, NEW_LINE, USED_WORDS_LIMIT, WORD_BANK_PATH } from './Constants'

//=========================================================================================================================================================================

//Defines the word bank and picks a word for the user to guess
const WordBank = () => {
    const [storedWords, setStoredWords] = useState([])
    const [usedWords, setUsedWords] = useState([])
    const [wordToGuess, setWordToGuess] = useState(BLANK_STRING)

    //=========================================================================================================================================================================

    //Gets the word list from the saved .txt file
    const getWordList = async () => {
        const response = await fetch(WORD_BANK_PATH)
        const text = await response.text()
        const words = text.split(NEW_LINE).map(word => word.trim().toUpperCase())

        setStoredWords(words)
        return words
    }

    //=========================================================================================================================================================================

    //Picks a random for that was not recently used for the user to guess
    const pickRandomWord = useCallback(async () => {
        let wordList = storedWords

        if (storedWords.length === 0) {
            wordList = await getWordList()
        }

        const availableWords = wordList.filter(word => !usedWords.includes(word))
        const chosenWord = availableWords[Math.floor(Math.random() * availableWords.length)]

        setUsedWords(prev => {
            const updated = [...prev, chosenWord]
            return updated.length > USED_WORDS_LIMIT ? updated.slice(FIRST_SLICE) : updated
        })

        setWordToGuess(chosenWord)
    }, [storedWords, usedWords])

    
    //=========================================================================================================================================================================

    //Use effect to get a random word on mount
    useEffect(() => {
        pickRandomWord()
        // eslint-disable-next-line
    }, [])

    //=========================================================================================================================================================================

    return { storedWords, wordToGuess, pickRandomWord, getWordList }
}

//=========================================================================================================================================================================

export default WordBank
