import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledTextField } from './StyledComponents'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LoginIcon from '@mui/icons-material/Login'
import { Icon } from '@mui/material'

function Login() {
  const navigate = useNavigate()

  const onClickHandler = () => {
    // verify invitation code

    // go to register page
    navigate('/register')
  }

  const handleCheckInfo = () => {
    navigate('/info')
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <div className='input-group'>
        <p>ENTER INVITATION CODE</p>
        {/* <input type='text' /> */}
        <StyledTextField
          id='invitation-code-input'
          // label='code'
          variant='standard'
          required
          autoFocus
          fullWidth
        />

        <IconButton onClick={onClickHandler}>
          <LoginIcon fontSize={'large'} />
        </IconButton>
      </div>
      <Button
        fullWidth
        variant='text'
        sx={{
          fontSize: 'x-small',
          textTransform: 'none',
          marginTop: 4,
          fontWeight: 400,
          // color: 'gray',
        }}
        onClick={handleCheckInfo}
      >
        Already Resgistered? Check Info.
      </Button>
    </form>
  )
}

export default Login
