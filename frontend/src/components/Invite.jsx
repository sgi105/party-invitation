import React from 'react'
import { Typography } from '@mui/material'

import { Button, Stack } from '@mui/material'
import { useState, useEffect } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Snackbar } from '@mui/material'
import PartyInfo from './PartyInfo'
import axios from 'axios'
const API_URL = '/api/users/count'

function Invite({ newCode, invitationData, setNewCode, setInvitationData }) {
  const [open, setOpen] = useState(false)
  const [spotRemaining, setSpotRemaining] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const getUserCount = async () => {
    const res = await axios.get(API_URL)
    setSpotRemaining(100 - res.data.data)
  }

  useEffect(() => {
    // save to local storage
    if (!newCode || !invitationData) {
      // after refresh, there is no state, so use local storage, and set the state to local storage
      // localStorage -> state
      setNewCode(localStorage.getItem('newCode'))
      setInvitationData(JSON.parse(localStorage.getItem('invitationData')))
      setButtonDisabled(JSON.parse(localStorage.getItem('invitationData')).used)
    } else {
      // if there is state, use the state, and save it to local storage
      // state -> localStorage
      localStorage.setItem('newCode', newCode)
      localStorage.setItem('invitationData', JSON.stringify(invitationData))
      setButtonDisabled(invitationData.used)
    }

    // retrieve spots remaining
    getUserCount()

    // try {
    // let res
    // const apiCall = async () => {
    // const res = await axios.get(API_URL)
    // }
    // apiCall()

    //   if (res.data.status === 200) {
    //     setSpotRemaining(res.data.data)
    //   } else {
    //     setSpotRemaining(25)
    //   }
    // } catch (err) {
    //   console.log(err)
    // }
  }, [newCode, invitationData, setNewCode, setInvitationData])

  const handleClick = () => {
    navigator.clipboard.writeText(newCode)
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
            endIcon={buttonDisabled ? '' : <ContentCopyIcon />}
            sx={{
              color: 'black',
              bgcolor: 'white',
            }}
            disabled={buttonDisabled}
          >
            {buttonDisabled
              ? `Thanks, You invited ${invitationData.guestName}`
              : `Code: ${newCode}`}
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
