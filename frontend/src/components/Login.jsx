import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledTextField } from './StyledComponents'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LoginIcon from '@mui/icons-material/Login'
import { useState } from 'react'
import axios from 'axios'
const serverURL = process.env.REACT_APP_SERVER_URI

// axios.defaults.withCredentials = true

function Login({ code, setCode }) {
  const navigate = useNavigate()

  const [isValidCode, setIsValidCode] = useState(true)
  // const [code, setCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const onClickHandler = async () => {
    const url = serverURL + '/codes'

    // verify invitation code
    try {
      const res = await axios.post(url, {
        code: code,
      })
      console.log(res.data)
      const isValid = res.data.status === 200

      // update State
      setIsValidCode(isValid)

      // if valid, go to register page
      if (isValid) {
        navigate('/register')
      } else {
        setErrorMessage(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleCode = (e) => {
    setCode(e.target.value.toUpperCase())
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
          value={code}
          onChange={handleCode}
        />
        {!isValidCode && (
          <p
            style={{
              fontSize: '12px',
              color: 'tomato',
              width: '100%',
            }}
          >
            * {errorMessage}
          </p>
        )}

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
