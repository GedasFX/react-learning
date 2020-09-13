import { Auth, CognitoUser } from '@aws-amplify/auth';

class AccountService {
  public async signIn(username: string, password: string) {
    try {
      const user = (await Auth.signIn(username, password)) as CognitoUser;
      console.log(user);
      return user;
    } catch (error) {
      console.log('error signing in', error);
      throw error;
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
      console.log('error signing up:', error);
    }
  }
}

export default new AccountService();
