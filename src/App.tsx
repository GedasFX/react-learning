import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core';
import theme from './theme';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

const useStyles = makeStyles(() => ({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%',
    },
    body: {
      backgroundColor: '#f4f6f8',
      height: '100%',
      width: '100%',
    },
    a: {
      textDecoration: 'none',
    },
    '#root': {
      height: '100%',
      width: '100%',
    },
  },
}));
function App() {
  const routing = useRoutes(routes);
  useStyles();

  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>;
}

export default App;
