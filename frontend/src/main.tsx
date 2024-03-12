import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import { Layout } from './pages/layout.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route index element={<App />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
