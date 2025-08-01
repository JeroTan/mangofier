import { atobEx, btoaEx } from "@jsarmyknife/native--cryptographic";
import { HttpNativePlate } from "@jsarmyknife/native--http";
import { splitMobileNumber } from "@jsarmyknife/native--math";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { api } from "src/utilities/Api";
import { AuthenticateUser, IsLoginAction, LogoutUser } from "src/utilities/AuthenticateUser";
// import { AuthenticateUser, LogoutUser } from "src/utility/AuthenticateUser";

export const authentication = {

  loginRequestOTP: defineAction({
    input: z.object({
      email: z.string().email(),
    }),
    async handler(input, ctx){
      
    }
  }),
  loginResendOTP: defineAction({
    input: z.object({
      otpId: z.string().uuid(),
    }),
    async handler(input, ctx){
      
    }
  }),
  loginWithOTP: defineAction({
    input: z.object({
      otpId: z.string().uuid(),
      otp: z.string().min(6, {
        message: `OTP must be at least 6 characters long`,
      }),
    }),
    async handler(input, ctx){
     
    }
  }),
  register: defineAction({
    input: z.object({
      email: z.string().email().min(2).max(100),
      firstName: z.string().min(2).max(64),
      lastName: z.string().min(2).max(64),
      phoneNumber: z.string().refine((val) => {
        const decomposeNumber = splitMobileNumber(val);
        if( decomposeNumber.number.length > decomposeNumber.numberFormat.max || decomposeNumber.number.length < decomposeNumber.numberFormat.min ){
          return false;
        }
        return true;
      }, {
        message: "Invalid phone number",
      }),
    }),
    async handler(input, ctx){
     
    }
  }),
  registerResendOTP: defineAction({
    input: z.object({
      otpId: z.string().uuid(),
    }),
    async handler(input, _){
    
    }
  }),
  registerWIthOTP: defineAction({
    input: z.object({
      otpId: z.string().uuid(),
      otp: z.string().min(6, {
        message: `OTP must be at least 6 characters long`,
      }),
    }),
    async handler(input, _){
    
    }
  }),
  logout: defineAction({
    async handler(_, context){
      await LogoutUser(context.cookies, context.url);
    }
  }),

  isLogin :defineAction({
    async handler(_, context){
     
    }
  })

};