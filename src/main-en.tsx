import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.professional'
import '@fontsource-variable/archivo/standard.css'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App lang="en" />
  </React.StrictMode>,
)
