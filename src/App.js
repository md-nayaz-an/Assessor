import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import Home from "./Home";

function App() {
  const screenQuery = useMediaQuery('(min-width: 576px) and (max-width: 991.98px)');

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#27005D',
      },
      secondary: {
        main: '#9400FF',
      },
      background: {
        default: '#E4F1FF',
        paper: '#aed2ff',
      },
    },
    breakpoints: {
      values: {
        xs: screenQuery ? 1 : 0,
        lg: 1024,
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
