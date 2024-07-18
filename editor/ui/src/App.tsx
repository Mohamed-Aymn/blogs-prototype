import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Editor from './Routes/Editor';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/editor" />} />
        <Route path="/editor" Component={Editor} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
