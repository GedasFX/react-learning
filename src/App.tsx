import React from "react";
import SignInPage from "./pages/account/SignInPage/SignInPage";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SignInPage />
    </MuiThemeProvider>
  );
}

export default App;
