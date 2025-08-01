import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const cookies = {
  allow:  defineAction({
    input: z.boolean(),
    async handler(input, context){
      if(input){
        context.cookies.set("MGF_ALLOW_COOKIES", "true", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: '/', 
          domain: context.url.hostname, 
        });
      }else{
        context.cookies.set("MGF_ALLOW_COOKIES", "false", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: '/',
          domain: context.url.hostname,
        });
      }
      return input;
    }
  })
}