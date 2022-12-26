import { Box, Button, TextField } from '@material-ui/core'
import React from 'react'
import LayoutComponent from '../layout/layoutcomponent'

const TestComp = () => {
  return (
    <LayoutComponent>
      <div style={{
        width: "100%",
        maxWidth: "640px",
        margin: "auto",
        padding: "2rem 0"
      }}>

        <Box component='form'>
          <TextField label='Your name' variant='outlined' required={true} />
          <Button type='submit' variant='outlined'>Submit</Button>
        </Box>
        
      </div>
    </LayoutComponent>
  )
}

export default TestComp