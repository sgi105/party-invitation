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
  const totalSpots = 100

  const getUserCount = async () => {
    const res = await axios.get(API_URL)
    setSpotRemaining(totalSpots - res.data.data)
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
    navigator.clipboard.writeText('Code: ' + newCode + '\nLink: URL')
    // setOpen(true)
  }
  return (
    <>
      <Stack spacing={10} align='center' padding='10px'>
        <Stack>
          <Typography variant='h4'>You are in, </Typography>
          <Typography variant='h3'>Invite a friend.</Typography>
        </Stack>
        <Stack spacing={1}>
          {/* <Typography variant='caption' color='tomato' align='right'>
            {spotRemaining} spots remaining
          </Typography> */}

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
          <Typography variant='caption' color='lightgray'>
            Only <span style={{ color: 'tomato' }}>one person </span>can enter
            with this code. <br />본 초대 코드로{' '}
            <span style={{ color: 'tomato' }}>한 명</span>만 입장할 수 있습니다.
          </Typography>
        </Stack>

        {/* <Typography
          color='lightgray'
          variant='caption'
          align='center'
          sx={{
            fontWeight: 100,
          }}
        >
          Questions? Kakao ID : sgi105
        </Typography> */}

        {/* <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={1000}
          message='Copied to clipboard'
        /> */}
        <PartyInfo />
      </Stack>
    </>
  )
}

export default Invite
