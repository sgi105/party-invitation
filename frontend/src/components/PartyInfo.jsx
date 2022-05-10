import React from 'react'
import { Typography, Stack } from '@mui/material'

function PartyInfo() {
  return (
    <Stack>
      <Typography variant='caption' align='center'>
        Place: Hapjeong | Time: 6/3 FRI 20:00
      </Typography>
      <Typography
        color='lightgray'
        variant='caption'
        align='center'
        sx={{
          fontStyle: 'italic',
          fontWeight: 100,
        }}
      >
        Exact place will be announced via phone/email. <br /> 세부 장소 확정되면
        문자로 안내 예정입니다.
      </Typography>
      <Typography
        color='gold'
        variant='caption'
        align='center'
        sx={{
          // fontStyle: 'italic',
          marginTop: '.5rem',
          fontWeight: 100,
        }}
      >
        Questions? Kakao ID : sgi105
      </Typography>
    </Stack>
  )
}

export default PartyInfo
