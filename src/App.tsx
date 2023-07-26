import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Game from './components/Game';
import Connect from './components/connect/Connect';
import { Page404 } from './components/Page404';
import { io } from 'socket.io-client';
import { CssBaseline, Box } from '@mui/material';
import "./App.css";

function App() {
  console.log("App is running");
  return (
    <CssBaseline>
        <Router>
          <Box height="100vh">
            <Routes>
              <Route path='/' element={ <Navigate to="/connect"/>}/>
              <Route path='/connect' element={<Connect/>}/>
              <Route path='/game' element={<Game/>}/>
              <Route path='*' element={<Page404/>}/>
            </Routes>
          </Box>
        </Router>
    </CssBaseline>
  );
}

export default App;
