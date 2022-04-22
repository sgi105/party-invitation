import { styled, TextField } from '@mui/material'

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },

  '& .Mui-focused:after': {
    borderBottom: '2px solid white',
  },
})

export { StyledTextField }
