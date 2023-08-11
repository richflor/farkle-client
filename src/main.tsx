import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router} from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: "#7137D0"
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <App />
          </Router>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
