import React from 'react'

import logoGif from "../media/logo.gif"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { Container, Box } from '@mui/system';
import { Divider, Typography } from '@mui/material';

export function Footer() {
  return (
    <>
      <Box paddingY={3} sx={{
        backgroundColor: '#e7e7e7d9'
      }}>
        <Container maxWidth='xl'>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Box className='organization'>
              <Box className='LogoBox'>
                <img src={logoGif} alt='this is gif' className='' />
                <Typography variant='subtitle1'>
                  What do we do? What don't we do
                </Typography>
              </Box>
              <Box className='footerIcons'>
                <TwitterIcon />
                <GitHubIcon />
              </Box>
            </Box>

            <Box className='ListItems'>
              <Typography variant='h6'>
                Links
              </Typography>
              <ul className='lists'>
                <li>IOCL website</li>
                <li>Project Repository</li>
              </ul>
            </Box>

            <Box className='ListItems'>
              <Typography variant='h6'>
                IOCL
              </Typography>
              <ul className='lists'>
                <li>About</li>
                <li>Careers</li>
              </ul>
            </Box>

            <Box className='ListItems' sx={{
              marginRight: 4
            }}>
              <Typography variant='h6'>
                Developers
              </Typography>
              <ul className='lists'>
                <li>Report an Bug</li>
                <li>Support Us</li>
              </ul>
            </Box>
          </Box>


          <Divider sx={{
            borderColor: 'rgba(0, 0, 0, 0.24)',
            margin: '0.5rem 0',
          }} />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant='caption'>
              © 2022-Present, Indian Oil Corp. Ltd.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>

  )
}

export default Footer;