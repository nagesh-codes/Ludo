import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Test from './pages/Test';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"*"} element={<Test />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
