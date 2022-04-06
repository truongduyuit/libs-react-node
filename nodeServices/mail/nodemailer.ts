import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface INodeMailerSender {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

interface INodeMailerContructor {
  username: string;
  password: string;
}

class NodeMailer {
  private static instance: NodeMailer;
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  private constructor({ username, password }: INodeMailerContructor) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: username,
        pass: password,
      },
    });
  }

  public static getInstance({ username, password }: INodeMailerContructor) {
    return NodeMailer.instance || new NodeMailer({ username, password });
  }

  async send({ to, subject, text, html }: INodeMailerSender) {
    return await this.transporter.sendMail({ to, subject, text, html });
  }
}

const nodeMailer = NodeMailer.getInstance({
  username: process.env.MAIL_USERNAME || "/your-username/",
  password: process.env.MAIL_PASSWORD || "/your-password/",
});

Object.freeze(nodeMailer);
export { nodeMailer };
