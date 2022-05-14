import React from 'react'
import { useState, useEffect } from 'react'
import {
  // FormControlLabel,
  FormHelperText,
  ToggleButton,
  ToggleButtonGroup,
  // FormGroup,
} from '@mui/material'
import Button from '@mui/material/Button'
import { StyledTextField } from './StyledComponents'
import { useNavigate } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox'
import { Typography } from '@mui/material'
import PartyInfo from './PartyInfo'
import axios from 'axios'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Stack } from '@mui/material'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import isFuture from 'date-fns/isFuture'

// const serverURL = process.env.REACT_APP_SERVER_URI

function Register({ code, setNewCode }) {
  const [gender, setGender] = useState('')
  const [nameText, setNameText] = useState('')
  const [phoneText, setPhoneText] = useState('')
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true)
  const [buttonDisabled, SetbuttonDisabled] = useState(true)
  const [checkbox, setCheckbox] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [copiedAlertMessage, setCopiedAlertMessage] = useState('ㅤ')
  const [userCount, setUserCount] = useState(0)
  const earlyBirdDeadline = new Date('2022/05/18')
  const regularDeadline = new Date('2022/05/25')

  const getUserCount = async () => {
    const res = await axios.get('/api/users/count')
    setUserCount(res.data.data)
  }

  const navigate = useNavigate()
  const url = '/api/users'

  useEffect(() => {
    checkbox && phoneText && nameText && isValidPhoneNumber && gender
      ? SetbuttonDisabled(false)
      : SetbuttonDisabled(true)

    getUserCount()
  }, [nameText, phoneText, gender, checkbox, isValidPhoneNumber])

  const handleGender = (e) => {
    setGender(e.target.value)
  }

  const handleName = (e) => {
    setNameText(e.target.value)
  }
  const handlePhone = (e) => {
    let num = e.target.value

    // don't accept input that's not a number
    // set max length to 11
    if (!/^[0-9]*$/.test(num) || num.length > 11) return

    if (/^01([0|1|6|7|8|9])([0-9]{7,})$/.test(num)) {
      setIsValidPhoneNumber(true)
    } else {
      setIsValidPhoneNumber(false)
    }

    setPhoneText(num)
  }

  const handleClick = () => {
    // deprecated due to not working on mobile
    // navigator.clipboard.writeText('Code: ' + newCode + '\nLink: URL')
    // setOpen(true)

    // show message above that it was copied
    setCopiedAlertMessage('Copied!')
    setTimeout(() => {
      setCopiedAlertMessage('ㅤ')
    }, 2000)
  }

  const handleSumbit = async (e) => {
    e.preventDefault()

    // validation logic

    // send data to server
    try {
      // const url = serverURL + '/users'
      // const url = '/users'
      const res = await axios.post(url, {
        number: phoneText,
        name: nameText,
        gender: gender,
        invitedCode: code,
      })

      console.log(res)

      if (res.data.status === 200) {
        setNameText('')
        setPhoneText('')
        setGender('')

        // set new code
        setNewCode(res.data.data.invitationCode)

        // redirect to the next page
        navigate('/invite')
      } else {
        setErrorMessage(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSumbit}>
      <div className='input-group register'>
        <Typography variant='h4' align='center' marginBottom={'-1rem'}>
          Welcome. <br />
          You're invited.
        </Typography>
        <PartyInfo />
        <StyledTextField
          value={nameText}
          onChange={handleName}
          id='name-input'
          label='Name'
          variant='standard'
          required
          // autoFocus
          fullWidth
        />
        <StyledTextField
          value={phoneText}
          onChange={handlePhone}
          id='phone-input'
          label='Phone'
          variant='standard'
          placeholder='01012345678'
          required
          fullWidth
          type={'tel'}
        />
        {!isValidPhoneNumber && (
          <p
            style={{
              fontSize: '12px',
              marginTop: '-1.6rem',
              marginBottom: '-24px',
              color: 'tomato',
              width: '100%',
            }}
          >
            * enter a valid number
          </p>
        )}
        <StyledTextField
          value={code}
          // onChange={handlePhone}
          disabled={true}
          id='code-input'
          label='Code'
          variant='standard'
          // placeholder='01012345678'
          // required
          fullWidth
          // type={'text'}
        />
        <ToggleButtonGroup
          fullWidth
          value={gender}
          exclusive
          onChange={handleGender}
          required
        >
          <ToggleButton fullWidth value='male'>
            MALE
          </ToggleButton>
          <ToggleButton fullWidth value='female'>
            FEMALE
          </ToggleButton>
        </ToggleButtonGroup>
        <FormHelperText
          sx={{
            marginTop: '-1.6rem',
          }}
        >
          *choose your gender
        </FormHelperText>

        <Stack spacing={1}>
          <Typography variant='caption' align='right'>
            {copiedAlertMessage}
          </Typography>
          <Button
            id='btnCopy'
            data-clipboard-text={'002802-04-111492 국민'}
            onClick={handleClick}
            variant='contained'
            endIcon={<ContentCopyIcon sx={{ width: '16px' }} />}
            sx={{
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.16)',
              fontSize: '.7rem',
              fontWeight: 'light',
            }}
          >
            002802-04-111492 국민 신가인
          </Button>
          {/* <ToggleButtonGroup
            fullWidth
            orientation='vertical'
            value={gender}
            exclusive
            onChange={handleGender}
            required
          >
            <ToggleButton fullWidth value='earlyBird' color='primary'>
              Early bird | ₩35,000
            </ToggleButton>
            <ToggleButton fullWidth value='regular'>
              Regular | ₩50,000
            </ToggleButton>
          </ToggleButtonGroup> */}
          {isFuture(earlyBirdDeadline) && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // marginBottom: '-1.3rem',
              }}
            >
              <Checkbox
                // size=''
                checked={checkbox}
                onChange={(e) => setCheckbox(e.target.checked)}
                sx={{ '&.Mui-checked': { color: 'lightgray' } }}
              />

              <p style={{ fontSize: '13px' }}>
                EARLY BIRD | 35,000원 송금 완료
              </p>
              <Typography
                color='lightgray'
                variant='caption'
                align='center'
                sx={{
                  fontSize: '.7rem',
                  fontStyle: 'italic',
                  fontWeight: 100,
                  marginLeft: '5px',
                  color: 'tomato',
                }}
              >
                {formatDistanceToNow(earlyBirdDeadline) + ' left'}
                {/* 50 spots. {50 - userCount} remaining */}
              </Typography>
            </div>
          )}

          {!isFuture(earlyBirdDeadline) && (
            <div
              style={{
                marginTop: '1rem',
              }}
            ></div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '-.5rem',
              marginLeft: '-0.4rem',
            }}
          >
            <Checkbox
              // size=''
              disabled={isFuture(earlyBirdDeadline)}
              onChange={(e) => setCheckbox(e.target.checked)}
              sx={{ '&.Mui-checked': { color: 'lightgray' } }}
            />

            <p style={{ fontSize: '13px' }}> REGULAR | 50,000원 송금 완료</p>
            <Typography
              color={isFuture(earlyBirdDeadline) ? 'lightgray' : 'tomato'}
              variant='caption'
              align='center'
              sx={{
                fontSize: '.7rem',
                fontStyle: 'italic',
                fontWeight: 100,
                marginLeft: '5px',
              }}
            >
              {formatDistanceToNow(regularDeadline) + ' left'}
              {/* 100 spots. 100 remaining */}
            </Typography>
          </div>
          <Typography
            color='lightgray'
            variant='caption'
            align='center'
            sx={{
              fontSize: '.7rem',
              fontStyle: 'italic',
              fontWeight: 100,
              marginTop: '-2.2rem',
            }}
          >
            *다른 입금자명으로 입금할 경우, <br />
            카카오톡(sgi105) 문의 주세요.
          </Typography>
        </Stack>
        {/* <FormHelperText
          sx={{
            marginTop: '-2.5rem',
          }}
        >
          *신청자와 입금자명이 다를 경우 하단의 카카오톡으로 말씀해주세요
        </FormHelperText> */}
        {errorMessage && (
          <Typography variant='caption' align='center' color='tomato'>
            {errorMessage}
          </Typography>
        )}

        <Button
          fullWidth
          variant='contained'
          sx={{
            bgcolor: 'white',
            color: 'black',
            '&:hover': {
              bgcolor: 'black',
              color: 'white',
              border: 'solid 1px white',
            },
          }}
          type={'submit'}
          disabled={buttonDisabled}
        >
          Register
        </Button>
        {/* <Typography
          color='lightgray'
          variant='caption'
          align='center'
          sx={{
            // fontStyle: 'italic',
            fontWeight: 100,
          }}
        >
          Questions? Kakao ID : sgi105
        </Typography> */}
      </div>
    </form>
  )
}

export default Register
