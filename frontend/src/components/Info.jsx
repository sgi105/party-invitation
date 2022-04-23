import React from 'react'
import { useState, useEffect } from 'react'
import { StyledTextField } from './StyledComponents'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import axios from 'axios'
const serverURL = process.env.REACT_APP_SERVER_URI

function Info({ setNewCode, setInvitationData }) {
  const navigate = useNavigate()
  const [phoneText, setPhoneText] = useState('')
  const [buttonDisabled, SetbuttonDisabled] = useState(true)
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

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

  useEffect(() => {
    isValidPhoneNumber && phoneText
      ? SetbuttonDisabled(false)
      : SetbuttonDisabled(true)
  }, [phoneText, isValidPhoneNumber])

  const handleSubmit = async () => {
    // get info by phone number
    try {
      const url = serverURL + '/users/' + phoneText
      const res = await axios.get(url)
      console.log(res)

      if (res.data.status === 200) {
        console.log(res.data.data)
        setNewCode(res.data.data.code)
        setInvitationData(res.data.data)
        setErrorMessage('')

        navigate('/invite')
      } else {
        setErrorMessage(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='input-group register'>
      <StyledTextField
        value={phoneText}
        onChange={handlePhone}
        id='phone-input'
        label='Phone'
        variant='standard'
        placeholder='010-1234-5678'
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

      {errorMessage && (
        <p
          style={{
            fontSize: '12px',
            // marginTop: '-1.6rem',
            marginBottom: '-24px',
            color: 'tomato',
            width: '100%',
          }}
        >
          * {errorMessage}
        </p>
      )}

      <Button
        onClick={handleSubmit}
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
          mt: 3,
        }}
        type={'submit'}
        disabled={buttonDisabled}
      >
        Check Info
      </Button>
    </div>
  )
}

export default Info
