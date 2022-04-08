import React, { createContext, useContext, useEffect, useState } from "react";
import {
  browserPopupRedirectResolver,
  browserSessionPersistence,
  ConfirmationResult,
  initializeAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app, IFirebaseSmsContext } from ".";

declare const window: Window &
  typeof globalThis & {
    recaptchaVerifier: RecaptchaVerifier;
  };

const FirebaseSmsDefault: IFirebaseSmsContext = {
  phone: "",
  sendSms: () => {},
  setphone: () => {},
};

export const FirebaseSmsContext =
  createContext<IFirebaseSmsContext>(FirebaseSmsDefault);

const FirebaseSmsProvider: React.FC = ({ children }) => {
  const [phone, setphone] = useState<string>("");

  const auth = initializeAuth(app, {
    persistence: browserSessionPersistence,
    popupRedirectResolver: browserPopupRedirectResolver,
  });

  // load firebase sms captcha
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      },
      auth
    );
  }, [auth]);

  const sendSms = async (): Promise<ConfirmationResult> =>
    await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);

  return (
    <FirebaseSmsContext.Provider value={{ phone, sendSms, setphone }}>
      {children}
    </FirebaseSmsContext.Provider>
  );
};

const useFirebaseSms = () => {
  return useContext(FirebaseSmsContext);
};

export { FirebaseSmsProvider, useFirebaseSms };
