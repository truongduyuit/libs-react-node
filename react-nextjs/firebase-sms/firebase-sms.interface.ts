import { ConfirmationResult } from "firebase/auth";

export interface IFirebaseSmsContext {
  phone: string;
  onSendSms: () => Promise<ConfirmationResult> | void;
}
