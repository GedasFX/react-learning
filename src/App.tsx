import React, { useEffect } from "react";
import SignInPage from "./pages/account/SignInPage/SignInPage";
import { ThemeProvider } from "@material-ui/core";
import Amplify, { Hub } from "@aws-amplify/core";
import { Auth, CognitoUser } from "@aws-amplify/auth";
import awsConfig from "./aws-exports";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { accountActions } from "./store/account";
import GlobalStyles from "./layout/GlobalStyles";
import theme from "./theme";

Amplify.configure(awsConfig);

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((s: RootState) => s.account);

  useEffect(() => {
    const updateUser = async () => {
      const userData = (await Auth.currentAuthenticatedUser()) as CognitoUser;
      const session = await Auth.currentSession();

      dispatch(
        accountActions.signInSuccess({
          user: {
            username: userData.getUsername(),
            token: session.getAccessToken().getJwtToken(),
          },
        })
      );
    };

    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "cognitoHostedUI":
          updateUser();
          break;
        case "signOut":
          dispatch(accountActions.signOut());
          break;
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
      }
    });

    updateUser();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
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
    </ThemeProvider>
  );
}

export default App;
