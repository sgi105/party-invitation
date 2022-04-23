import React from 'react'
import { Typography, Stack } from '@mui/material'

function PartyInfo() {
  return (
    <Stack>
      <Typography variant='caption' align='center'>
        Place: Hongdae | Time: 5/21 SAT 18:00
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
        세부 장소 확정되면 문자로 안내 예정입니다
      </Typography>
    </Stack>
  )
}

export default PartyInfo
