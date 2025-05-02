import React from 'react'

import { ReactComponent as GitHubIcon } from '../Images/GitHubIcon.svg'
import { ReactComponent as LinkedInIcon } from '../Images/LinkedInIcon.svg'

//=========================================================================================================================================================================

//Footer section with access to social pages
function Footer() {
    return (
        <div className='footer'>
            <p className='rights'>&copy; {new Date().getFullYear()} Benjamin Meyer. All rights reserved.</p>
            <ul className='socials'>
                <li>
                    <a href="https://github.com/Benjamin-Meyer-Dev" target="_blank" rel="nooperner noreferrer">
                        <GitHubIcon className='icon' />
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/benjamin-meyer-33618833a/" target="_blank" rel="nooperner noreferrer">
                        <LinkedInIcon className='icon' />
                    </a>
                </li>
            </ul>
        </div>
    )
}

//=========================================================================================================================================================================

export default Footer