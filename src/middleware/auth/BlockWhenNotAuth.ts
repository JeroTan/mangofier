import { atobEx } from "@jsarmyknife/native--cryptographic";
import type { ASTRO_CONTEXT } from "./../middleware";

export function BlockWhenNotAuth(context:ASTRO_CONTEXT){
  if(
    !context.cookies.has("MGF_SESSION_KEY") || 
    !context.cookies.has("MGF_CUSTOMER_INFORMATION")
  ){
    context.cookies.delete("MGF_SESSION_KEY", {
      httpOnly: true,
      secure: true,
      path: '/',
      domain: context.url.hostname,
    });
    context.cookies.delete("MGF_CUSTOMER_INFORMATION", {
      httpOnly: true,
      secure: true,
      path: '/',
      domain: context.url.hostname,
    });
    return context.redirect("/authentication/login");
  }


  //Get Cookies to Double Check Everything
  try{
    //Check Session Cookies First
    const sessionKey = atobEx(context.cookies.get("MGF_SESSION_KEY")?.value || "");
    if(!sessionKey){
      context.cookies.delete("MGF_SESSION_KEY", {
        httpOnly: true,
        secure: true,
        path: '/',
        domain: context.url.hostname,
      });
      context.cookies.delete("MGF_CUSTOMER_INFORMATION", {
        httpOnly: true,
        secure: true,
        path: '/',
        domain: context.url.hostname,
      });
      return context.redirect("/authentication/login");
    }

    //Check Customer Information
    const customerInformation = JSON.parse(atobEx(context.cookies.get("MGF_CUSTOMER_INFORMATION")?.value || "")) as any;
    if(!customerInformation){
      context.cookies.delete("MGF_SESSION_KEY", {
        httpOnly: true,
        secure: true,
        path: '/',
        domain: context.url.hostname,
      });
      context.cookies.delete("MGF_CUSTOMER_INFORMATION", {
        httpOnly: true,
        secure: true,
        path: '/',
        domain: context.url.hostname,
      });
      return context.redirect("/authentication/login");
    }
  }catch{
    context.cookies.delete("MGF_SESSION_KEY", {
      httpOnly: true,
      secure: true,
      path: '/',
      domain: context.url.hostname,
    });
    context.cookies.delete("MGF_CUSTOMER_INFORMATION", {
      httpOnly: true,
      secure: true,
      path: '/',
      domain: context.url.hostname,
    });
    return context.redirect("/authentication/login");
  }
}