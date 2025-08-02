import { z } from 'zod';

export interface REGISTER_PAYLOAD {
  firstName: string,
  lastName: string,
  email: string,
}

export interface LOGIN_PAYLOAD {
  email: string,
}

export interface LOGIN_RESPONSE{
  otpId: string,
}

export interface OTP_PAYLOAD {
  otpId: string,
  otpCode: string,
}

export interface OTP_RESPONSE {
  message:string,
  token: string,
}


export interface LOGIN_USER_DETAILS {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
}

export const Z_REGISTER_PAYLOAD = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});
