/* eslint-disable prettier/prettier */
interface To {
  email: string;
  name: string;
}

interface Cc {
  email: string;
  name: string;
}

interface From {
  email: string;
  name: string;
}

interface Personalization {
  to: To[];
  cc?: Cc[];
  bcc?: [];
  from: From;
}

interface From2 {
  email: string;
  name: string;
}

interface ReplyTo {
  email: string;
  name: string;
}

interface Content {
  type: string;
  value: string;
}

export interface SendEmailInterface {
  [x: string]: any;
  personalizations: Personalization[];
  from: From2;
  reply_to: ReplyTo;
  subject: string;
  content: Content[];
}
