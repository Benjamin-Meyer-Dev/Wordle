import React from 'react'

function Error({ message, fadeOut }) {
    return (
        <div className={`error-message ${fadeOut ? 'fade-out' : ''}`}>
            {message}
        </div>
    )
}

export default Error