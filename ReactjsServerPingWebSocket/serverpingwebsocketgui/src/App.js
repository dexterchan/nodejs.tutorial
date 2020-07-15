import * as React from 'react';
import './App.css';
import MarketDataBoard from './components/marketdataBoard';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  app: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    border: '3px solid #73ad21',
  },
}));

function App() {
  const classes = useStyles();

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <>
      <Container className={classes.app} maxWidth={false} disableGutters>
        <ThemeProvider theme={darkTheme}>
          <MarketDataBoard />
        </ThemeProvider>
      </Container>
    </>
  );
}

export default App;
