import Login from './components/Login'
import Register from './components/Register'
import Invite from './components/Invite'
import Info from './components/Info'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
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
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/invite' element={<Invite />} />
                <Route path='/info' element={<Info />} />
              </Routes>
            </motion.div>
          </div>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  )
}

export default App
