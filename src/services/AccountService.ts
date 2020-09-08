import { Auth } from "@aws-amplify/auth";

class AccountService {
  public async signIn(username: string, password: string) {
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      return user;
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  public async signUp(username: string, password: string, email: string) {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }
}

export default new AccountService();
