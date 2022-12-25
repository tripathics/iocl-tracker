import React from 'react'

import logoGif from "../media/logo.gif"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export function Footer() {
  return (
    <> 
        <div className='footer'>

            <div className='LogoBox'>
                <img src={logoGif} alt='this is gif' className=''></img>
            </div> 

            <div className='ListItems'>

            <ul className='lists'>
                <li>Locate</li>
                <li>Report an Bug</li>
                <li>Support Us</li>
            </ul>
            </div>

             <div className='footerIcons'>
              <FacebookIcon/>
              <TwitterIcon/>
              <GitHubIcon/>
              <LinkedInIcon/>
             </div>

             <div style={{textAlign:"center"}}>
                copywrite policy @2022
             </div>

        </div>
    </>
     
  )
}

export default Footer;