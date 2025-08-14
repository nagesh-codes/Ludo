import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Enter_lobby from './pages/Enter_lobby';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Enter_lobby />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
