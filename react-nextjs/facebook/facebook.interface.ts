/**
 * FB Login Status:
 * connected: the person is logged into Facebook and logged into your app
 * not_authorized: the person is logged into Facebook but not your app
 * unknown: người đó không đăng nhập Facebook nên bạn không biết họ có đăng nhập ứng dụng của mình
 */
export type FBLoginStatus = "connected" | "not_authorized" | "unknown";

export interface FBLoginResponse {
  status: FBLoginStatus;
  authResponse?: {
    accessToken?: string;
    expiresIn?: string;
    signedRequest?: string;
    userID?: string;
  };
}

export interface IFacebookContext {
  loginResponse: FBLoginResponse;
  onLogin: () => void;
}
