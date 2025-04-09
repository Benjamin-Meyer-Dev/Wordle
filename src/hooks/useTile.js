import { useState } from 'react'

import { RESET_STRING, EMPTY_STATUS } from '../Constants'

function useTile() {
    const [letter, setLetter] = useState(RESET_STRING)
    const [status, setStatus] = useState(EMPTY_STATUS)

    return { letter, setLetter, status, setStatus }
}

export default useTile