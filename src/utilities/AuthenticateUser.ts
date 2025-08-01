import { atobEx, btoaEx } from "@jsarmyknife/native--cryptographic";
import { DateNavigator, removeDecimal } from "@jsarmyknife/native--math";
import { stron } from "@jsarmyknife/native--parse";
import type { AstroCookies } from "astro";
import { ActionError } from "astro:actions";
import { ErrorCode } from "./Api";
import type { LOGIN_CUSTOMER_DETAILS } from "src/structure/Authentication";


export async function AuthenticateUser(cookies: AstroCookies, url:URL,  token:string,  customerInformation: LOGIN_CUSTOMER_DETAILS){
  const expiryDate = new DateNavigator().nextDay(7);
  const sessionInfo = btoaEx(token);

  // const key = stron(sessionInfo);
  // await kvSetValue(key, JSON.stringify({
  //   key: sessionInfo,
  //   exp: expiryDate.getTime(),
  // }));

  cookies.set("NNPV_SESSION_KEY", sessionInfo, {
    expires: expiryDate ,
    maxAge:removeDecimal((expiryDate.getTime() - new Date().getTime()) / 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: '/', 
    domain: url.hostname, 
  });

  cookies.set("NNPV_CUSTOMER_INFORMATION", btoaEx(JSON.stringify(customerInformation)), {
    expires: expiryDate ,
    maxAge:removeDecimal((expiryDate.getTime() - new Date().getTime()) / 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: '/', 
    domain: url.hostname, 
  });
}

export async function LogoutUser(cookies: AstroCookies, url:URL){
  if(cookies.has("NNPV_SESSION_KEY")){
    const sessionKey = cookies.get("NNPV_SESSION_KEY")?.value as string;
    const key = stron(sessionKey);
    // await kvDeleteValue(key);
  }
  cookies.delete("NNPV_SESSION_KEY", {
    httpOnly: true,
    secure: true,
    path: '/',
    domain: url.hostname,
  });
  cookies.delete("NNPV_CUSTOMER_INFORMATION", {
    httpOnly: true,
    secure: true,
    path: '/',
    domain: url.hostname,
  });
}

export async function IsLogin(cookies: AstroCookies, url: URL){
  const rawSessionKey = cookies.get("NNPV_SESSION_KEY")?.value;
  if(!rawSessionKey) return false;
  try {
    const key = stron(rawSessionKey);
    // const sessionData = await kvGetValue(key);
    // if(!sessionData) return false;
    // const sessionInfo = JSON.parse(sessionData);
    // if(sessionInfo.exp < new Date().getTime()) return false;

    if(
      !cookies.has("NNPV_SESSION_KEY") || 
      !cookies.has("NNPV_CUSTOMER_INFORMATION")
    ){
      cookies.delete("NNPV_SESSION_KEY", {
        httpOnly: true,
        secure: true,
        path: '/',
        domain: url.hostname,
      });
      cookies.delete("NNPV_CUSTOMER_INFORMATION", {
        httpOnly: true,
        secure: true,
        path: '/',
        domain: url.hostname,
      });
      return false;
    }

    const sessionKey = atobEx(cookies.get("NNPV_SESSION_KEY")?.value || "");
    if(!sessionKey){
      cookies.delete("NNPV_SESSION_KEY", {
        httpOnly: true,
        secure: true,
        path: '/',
        domain: url.hostname,
      });
      cookies.delete("NNPV_CUSTOMER_INFORMATION", {
        httpOnly: true,
        secure: true,
        path: '/',
        domain: url.hostname,
      });
      false;
    }

    //Check Customer Information
    const customerInformation = JSON.parse(atobEx(cookies.get("NNPV_CUSTOMER_INFORMATION")?.value || "")) as any;
    if(!customerInformation){
      cookies.delete("NNPV_SESSION_KEY", {
        httpOnly: true,
        secure: true,
        path: '/',
        domain: url.hostname,
      });
      cookies.delete("NNPV_CUSTOMER_INFORMATION", {
        httpOnly: true,
        secure: true,
        path: '/',
        domain: url.hostname,
      });
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

export async function IsLoginAction(cookies: AstroCookies, url: URL){
  const result = await IsLogin(cookies, url);
  return !result ? new ActionError({message:"User is not logged in", code: ErrorCode(401)}) : undefined;
}

export async function GetCustomerInformation(cookies: AstroCookies){
  const customerInfo = cookies.get("NNPV_CUSTOMER_INFORMATION")?.value;
  if(!customerInfo) return null;
  try {
    return JSON.parse(atobEx(customerInfo)) as LOGIN_CUSTOMER_DETAILS;
  } catch (error) {
    console.error("Error parsing customer information:", error);
    return null;
  }
}

export function GetCustomerInformationForce(cookies: AstroCookies){
  const customerInfo = cookies.get("NNPV_CUSTOMER_INFORMATION")?.value;
  return JSON.parse(atobEx(customerInfo as string)) as LOGIN_CUSTOMER_DETAILS;
}

export function GetSessionKey(cookies: AstroCookies){
  const sessionKey = cookies.get("NNPV_SESSION_KEY")?.value;
  if(!sessionKey) return null;
  try {
    return atobEx(sessionKey) as string;
  } catch (error) {
    return null;
  }
}
  