import React, { useEffect, useState } from "react";
import SignInPage from "./pages/account/SignInPage/SignInPage";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

import Amplify, { Hub } from "@aws-amplify/core";
import { Auth, CognitoUser } from "@aws-amplify/auth";
import awsConfig from "./aws-exports";

Amplify.configure(awsConfig);

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const getUser = () => Auth.currentAuthenticatedUser() as Promise<CognitoUser>;

function App() {
  console.log(Auth);
  getUser().then((p) => console.log(p));

  const [user, setUser] = useState<CognitoUser | undefined>(undefined);

  useEffect(() => {
    const updateUser = () => getUser().then((userData) => setUser(userData));

    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "cognitoHostedUI":
          updateUser();
          break;
        case "signOut":
          setUser(undefined);
          break;
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
      }
    });

    updateUser();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <p>User: {user ? JSON.stringify(user) : "None"}</p>
        {user ? (
          <button onClick={() => Auth.signOut()}>Sign Out</button>
        ) : (
          <button onClick={() => Auth.federatedSignIn()}>
            Federated Sign In
          </button>
        )}
      </div>
      <SignInPage />
    </MuiThemeProvider>
  );
}

export default App;
