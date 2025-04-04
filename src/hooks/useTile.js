import { useState } from 'react'

function useTile() {
    const [letter, setLetter] = useState("")
    const [status, setStatus] = useState()

    return { letter, setLetter, status, setStatus }
}

export default useTile