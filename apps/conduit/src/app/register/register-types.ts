import { EmailAndPassword } from '../components/email-and-password/email-and-password.types';

export interface RegisterUser {
  username: string;
  emailAndPass: EmailAndPassword;
}

export interface RegisterServerErrors {
  errors: {
    username?: string[];
    password?: string[];
    email?: string[];
  }
}
