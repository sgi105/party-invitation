import React from 'react'
import { useState, useEffect } from 'react'
import { StyledTextField } from './StyledComponents'
import Button from '@mui/material/Button'

function Info() {
  const [phoneText, setPhoneText] = useState('')
  const [buttonDisabled, SetbuttonDisabled] = useState(true)
  const handlePhone = (e) => {
    setPhoneText(e.target.value)
  }

  useEffect(() => {
    phoneText ? SetbuttonDisabled(false) : SetbuttonDisabled(true)
  }, [phoneText])

  return (
    <div>
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
