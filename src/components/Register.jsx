import React from 'react'
import { useState, useEffect } from 'react'
import { FormHelperText, ToggleButton, ToggleButtonGroup } from '@mui/material'
import Button from '@mui/material/Button'
import { StyledTextField } from './StyledComponents'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [gender, setGender] = useState('')
  const [nameText, setNameText] = useState('')
  const [phoneText, setPhoneText] = useState('')
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true)
  const [buttonDisabled, SetbuttonDisabled] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    nameText && isValidPhoneNumber && gender
      ? SetbuttonDisabled(false)
      : SetbuttonDisabled(true)
  }, [nameText, phoneText, gender])

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

    // if (num.length < 3) setPhoneText(num)
    // else if (num.length >= 3 && num.length < 9) {
    //   num = num.replace('-', '')
    //   setPhoneText(num.substring(0, 3) + '-' + num.substring(3))
    // } else if (num.length >= 9) {
    //   num = num.replace('-', '')
    //   setPhoneText(
    //     num.substring(0, 3) + '-' + num.substring(3, 7) + '-' + num.substring(8)
    //   )
    // }
  }

  const handleSumbit = (e) => {
    e.preventDefault()

    // validation logic

    // send data to server
    console.log({
      nameText,
      phoneText,
      gender,
    })

    setNameText('')
    setPhoneText('')
    setGender('')

    // redirect to the next page
    navigate('/invite')
  }

  return (
    <form onSubmit={handleSumbit}>
      <div className='input-group register'>
        <p>WELCOME, YOU'RE INVITED</p>

        <StyledTextField
          value={nameText}
          onChange={handleName}
          id='name-input'
          label='Name'
          variant='standard'
          required
          autoFocus
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
              color: 'tomato',
              width: '100%',
            }}
          >
            *enter a valid number
          </p>
        )}
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
      </div>
    </form>
  )
}

export default Register
