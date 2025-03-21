import React from 'react'
import './App.css'
import { Controls } from 'ops/Controls'
import { Typography } from '@mui/material'

function App() {
  return (
        <div className="App">
          <header className="App-header">
              <Typography data-testid='dashboard-title'>
                  Title
              </Typography>
            <Controls/>
          </header>
        </div>
  )
}

export default App
