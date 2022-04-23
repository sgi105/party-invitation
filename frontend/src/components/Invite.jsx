import React from 'react'
import { Typography } from '@mui/material'

import { Button, Stack } from '@mui/material'
import { useState, useEffect } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Snackbar } from '@mui/material'
import PartyInfo from './PartyInfo'

function Invite() {
  const [code, setCode] = useState('')
  const [open, setOpen] = useState(false)
  const [spotRemaining, setSpotRemaining] = useState(0)

  useEffect(() => {
    // retrieve code from server
    setCode('XY123')

    // retrieve spots remaining
    setSpotRemaining(150)
  }, [])

  const handleClick = () => {
    navigator.clipboard.writeText(code)
    setOpen(true)
  }
  return (
    <>
      <Stack spacing={4}>
        <Stack>
          <Typography variant='h4'>You are in,</Typography>
          <Typography variant='h2'>Invite a friend.</Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant='caption' color='tomato' align='right'>
            {spotRemaining} spots remaining
          </Typography>

          <Button
            onClick={handleClick}
            variant='contained'
            endIcon={<ContentCopyIcon />}
            sx={{
              color: 'black',
              bgcolor: 'white',
            }}
          >
            Code: {code}
          </Button>
        </Stack>

        <Typography variant='caption'>
          Only one person can enter with this code. <br />본 초대 코드는 한 명만
          사용할 수 있습니다.
        </Typography>

        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={1000}
          message='Copied to clipboard'
        />
        <div style={{ position: 'fixed', bottom: '3rem', left: 0, right: 0 }}>
          <PartyInfo />
        </div>
      </Stack>
    </>
  )
}

export default Invite
