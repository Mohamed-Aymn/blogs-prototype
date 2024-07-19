import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Editor from './Routes/Editor';
import './App.css'
import Default from './layouts/Default';

function App() {
  return (
    <BrowserRouter>
      <Default>
        <Routes>
          <Route path="/" element={<Navigate to="/editor" />} />
          <Route path="/editor" Component={Editor} />
        </Routes>
      </Default>
    </BrowserRouter>
  )
}

export default App
