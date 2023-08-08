import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Game from './components/Game';
import Connect from './components/connect/Connect';
import { Page404 } from './components/Page404';
import "./App.css";
import { Box } from '@mui/material';
import { AppDispatch } from './store/store';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { unsetLogoutInfo } from './store/userSlice';
import { resetGame } from "./slicers/gameSlice";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useNavigate } from "react-router-dom";

function App() {

  const dispatch = useDispatch<AppDispatch>();

  const app = useSelector((state:RootState)=> state.user)
  const user = app.value.name;
  const connected = app.connected;
  const error = app.error
  const navigate = useNavigate();

  useEffect(()=> {
    if(connected) {
      console.log("to game")
      navigate("/game");
    }
  }, [connected])
  
  const location = useLocation().pathname;
  const [lastLocation, setLastLocation] = useState('')
  useEffect(() => {
    if (lastLocation === '/game') {
      dispatch(unsetLogoutInfo());
      dispatch(resetGame())
      console.log('back from game')
    }
    setLastLocation(location)
  }, [location])

  return (
          <Box height="100vh">
            <Routes>
              <Route path='/' element={ <Navigate to="/connect"/>}/>
              <Route path='/connect' element={<Connect/>}/>
              <Route path='/game' element={<Game/>}/>
              <Route path='*' element={<Page404/>}/>
            </Routes>
          </Box>
  );
}

export default App;
