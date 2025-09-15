import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Test from './pages/Test';
import Create_Room from './pages/Create_Room';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/create-room"} element={<Create_Room />}></Route>
          <Route path={"*"} element={<Test />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
