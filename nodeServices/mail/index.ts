export * from "./nodemailer";

import { nodeMailer } from "./nodemailer";
const mailer = nodeMailer.send({
  to: "",
  subject: "",
  html: " ",
});
