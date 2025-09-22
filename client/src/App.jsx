import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Create_Room from './pages/Create_Room';
import Join_Room from './pages/Join_Room';
import Loader from './pages/Loader'
import Waiting_Area from './pages/Waiting_Area';
import Main_Game from './pages/Main_Game';
import './css-files/all-keyframes.css'
import './App.css'
import { useEffect } from 'react';
import Dice from './pages/Dice';

function App() {
  useEffect(() => {
    window.particlesJS.load(
      "particles-js",
      "/particles.json",
    );
  }, []);

  return (
    <>
      {/* <div id="particles-js"></div> */}
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/create-room"} element={<Create_Room />}></Route>
          <Route path={"/join-room"} element={<Join_Room />}></Route>
          <Route path={"/join-room/:roomid"} element={<Join_Room />}></Route>
          <Route path={"/waiting-area"} element={<Waiting_Area />}></Route>
          <Route path={"/main-game"} element={<Main_Game />}></Route>
          <Route path={'*'} element={<Dice />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
