import { UserManager } from "oidc-client";

class AccountService {
  public readonly userManager = new UserManager({
    authority: `${window.location.origin}/api`,
    client_id: "js",
    redirect_uri: `${window.location.origin}/oauth/signin-callback.html`,
    post_logout_redirect_uri: `${window.location.origin}/oauth/signout-callback.html`,
    response_type: "id_token token",
    scope: "openid api",

    silent_redirect_uri: `${window.location.origin}/oauth/refresh-callback.html`,
    automaticSilentRenew: true,

    popupWindowFeatures:
      "location=no,toolbar=no,width=500,height=800,left=100,top=100",
  });

  public async signIn() {
    const u = await this.userManager.signinPopup();
    console.log(u);
    return u;
  }
}

export default new AccountService();
