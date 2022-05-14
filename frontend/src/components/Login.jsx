import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledTextField } from './StyledComponents'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'
import { useState } from 'react'
import axios from 'axios'
import { Typography } from '@mui/material'

// const serverURL = process.env.REACT_APP_SERVER_URI

// axios.defaults.withCredentials = true

function Login({ code, setCode }) {
  const navigate = useNavigate()
  const url = '/api/codes'

  const [isValidCode, setIsValidCode] = useState(true)
  // const [code, setCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const onClickHandler = async () => {
    // const url = serverURL + '/codes'
    // const url = '/codes'

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') onClickHandler()
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
          // autoFocus
          fullWidth
          value={code}
          onChange={handleCode}
          onKeyDown={handleKeyPress}
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
          <ArrowCircleRightOutlinedIcon fontSize={'large'} />
        </IconButton>
        <Typography
          color='lightgray'
          variant='caption'
          align='center'
          sx={{
            // fontStyle: 'italic',
            marginTop: '-1rem',
            fontWeight: 100,
          }}
        >
          Enter
        </Typography>
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
        Already Resgistered? Click to check Info.
      </Button>
    </form>
  )
}

export default Login
