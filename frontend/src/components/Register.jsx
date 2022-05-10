import React from 'react'
import { useState, useEffect } from 'react'
import { FormHelperText, ToggleButton, ToggleButtonGroup } from '@mui/material'
import Button from '@mui/material/Button'
import { StyledTextField } from './StyledComponents'
import { useNavigate } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox'
import { Typography } from '@mui/material'
import PartyInfo from './PartyInfo'
import axios from 'axios'
// const serverURL = process.env.REACT_APP_SERVER_URI

function Register({ code, setNewCode }) {
  const [gender, setGender] = useState('')
  const [nameText, setNameText] = useState('')
  const [phoneText, setPhoneText] = useState('')
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true)
  const [buttonDisabled, SetbuttonDisabled] = useState(true)
  const [checkbox, setCheckbox] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const url = '/api/users'

  useEffect(() => {
    checkbox && phoneText && nameText && isValidPhoneNumber && gender
      ? SetbuttonDisabled(false)
      : SetbuttonDisabled(true)
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Checkbox
            // size=''
            checked={checkbox}
            onChange={(e) => setCheckbox(e.target.checked)}
            sx={{ '&.Mui-checked': { color: 'lightgray' } }}
          />
          <p style={{ fontSize: '13px' }}>
            002802-04-111492 국민 신가인 | 30,000원 송금 완료
          </p>
        </div>
        {/* <FormHelperText
          sx={{
            marginTop: '-2.5rem',
          }}
        >
          *신청자와 입금자명이 다를 경우 하단의 카카오톡으로 말씀해주세요
        </FormHelperText> */}
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
          *입금자명이 신청자와 다를 경우 상단의 카카오톡으로 말씀해주세요
        </Typography>
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
