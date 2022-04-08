import { ConfirmationResult } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export interface IFirebaseSmsContext {
  phone: string;
  sendSms: () => Promise<ConfirmationResult> | void;
  setphone: Dispatch<SetStateAction<string>>;
}
