import Login from './components/Login'
import Register from './components/Register'
import Invite from './components/Invite'
import Info from './components/Info'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useState } from 'react'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const [code, setCode] = useState('')
  const [newCode, setNewCode] = useState('')
  const [invitationData, setInvitationData] = useState({})

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <AnimatePresence>
          <div className='container'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Routes>
                <Route
                  path='/'
                  element={<Login code={code} setCode={setCode} />}
                />
                <Route
                  path='/register'
                  element={<Register code={code} setNewCode={setNewCode} />}
                />
                <Route
                  path='/invite'
                  element={
                    <Invite
                      newCode={newCode}
                      setNewCode={setNewCode}
                      invitationData={invitationData}
                      setInvitationData={setInvitationData}
                    />
                  }
                />
                <Route
                  path='/info'
                  element={
                    <Info
                      setNewCode={setNewCode}
                      setInvitationData={setInvitationData}
                    />
                  }
                />
              </Routes>
            </motion.div>
          </div>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  )
}

export default App
