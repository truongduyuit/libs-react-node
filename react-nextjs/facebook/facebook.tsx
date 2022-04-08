import React, { createContext, useContext, useEffect, useState } from "react";
import { facebookConfigs } from "./facebook.config";
import { FBLoginResponse, IFacebookContext } from "./facebook.interface";

declare const window: Window &
  typeof globalThis & {
    fbAsyncInit: Function;
  };

declare const FB: any;

const FacebookDefault: IFacebookContext = {
  loginResponse: { status: "not_authorized" },
  login: () => {},
};

export const FacebookContext = createContext<IFacebookContext>(FacebookDefault);

const FacebookProvider: React.FC = () => {
  const [loginResponse, setloginResponse] = useState<FBLoginResponse>({
    status: "not_authorized",
  });

  // load facebook sdk
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init(facebookConfigs);

      FB.AppEvents.logPageView();

      login();
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.setAttribute("src", "https://connect.facebook.net/en_US/sdk.js");
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const login = async () =>
    await FB.getLoginStatus(function (response: FBLoginResponse) {
      setloginResponse(response);
    });

  return (
    <FacebookContext.Provider
      value={{
        loginResponse,
        login,
      }}
    ></FacebookContext.Provider>
  );
};

const useFacebook = () => {
  return useContext(FacebookContext);
};

export { FacebookProvider, useFacebook };
