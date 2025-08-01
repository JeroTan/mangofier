import { ActionError, type ActionErrorCode } from "astro:actions";
import { HttpNativePlate } from "@jsarmyknife/native--http";
import type { AstroCookies } from "astro";

export function api(url: URL, cookies: AstroCookies, addons?:string){
  // let AUTH = GetSessionKey(cookies);
  // if(!AUTH){
  //   AUTH = import.meta.env.SECRET_CRS_API_BASIC_AUTH_KEY;
  // }
  const http= new HttpNativePlate(`${import.meta.env.SECRET_MANGA_API_URL||url.origin}${addons || ""}`, {
    "Access-Control-Request-Headers":"Authorization, Content-Type",
    "Access-Control-Request-Method":"GET, POST, PUT, PATCH, DELETE, get, post, put, patch, delete",
    // "Authorization" :`Bearer ${AUTH}`,
    "Content-Type":"application/json",
  });
  return http
}

export function apiF(url: URL, cookies: AstroCookies){
  const api2 =  api(url, cookies, "/frontstore");
  return api2
}

export function ErrorCode(statusCode: number): ActionErrorCode{
  if(statusCode >= 500){
    return "INTERNAL_SERVER_ERROR";
  }

  switch (statusCode) {
    //Bad Request
    case 400:
      return "BAD_REQUEST";
    //Unauthorized
    case 401:
      return "UNAUTHORIZED";
    case 403:
      return "FORBIDDEN";
    //Not Found
    case 404:
      return "NOT_FOUND";
    //Conflict
    case 409:
      return "CONFLICT";
    //Timeout
    case 412:
      return "PRECONDITION_FAILED";
    //Unsupported Media Type
    case 415:
      return "UNSUPPORTED_MEDIA_TYPE";
    //Unprocessable Content
    case 422:
      return "UNPROCESSABLE_CONTENT";
    //Too Many Requests
    case 429:
      return "TOO_MANY_REQUESTS";
      //Client Closed Request
    default:
      return "BAD_REQUEST";
  }
}

export async function  checkApiErrorAction(response: Response){
  if(!(response.status == 200 || response.status == 201)){
    console.log(`Error Status: ${response.status} with response |\` ${await response.clone().text()} \`|`)
    throw new ActionError({message: await ApiErrorMessagePlus(response, response.status), code:ErrorCode(response.status)});
  }
}

export function ErrorMessage(msg: string){
  try{
    const temp = JSON.parse(msg) as {error:string, message:string, details: string, detail:string};
    if(temp.details){
      return temp.details;
    }
    if(temp.detail){
      return temp.detail;
    }
    if(temp.error){
      return temp.error;
    }
    if(temp.message){
      return temp.message;
    }  
    return msg;
  }catch(e){
    return msg;
  }
}

export async function ApiErrorMessagePlus(response: Response, statusCode: number){
  switch(statusCode){
    case 422:
      return await response.clone().text();
    default:
      return await ApiErrorMessage(response);
  }
}

export async function ApiErrorMessage(response: Response){
  return ErrorMessage(await response.clone().text());
}


export function appendFormData(data: any, parentKey?: string, formData= new FormData()): FormData {
  if (data && typeof data === "object" && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      const value = data[key];
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      if (value && typeof value === "object" && !(value instanceof File)) {
        appendFormData(value, fullKey, formData);
      } else {
        formData.append(fullKey, value instanceof File ? value : String(value));
      }
    });
  } else if (parentKey) {
    formData.append(parentKey, data);
  }
  return formData;
}

export function getPage(url: URL){
  try{
    const rawResult = url.searchParams.get("page");
    if(rawResult == null || rawResult === ""){
      return 1;
    }
    if(isNaN(Number(rawResult))){
      return 1;
    }
    return Number(rawResult);
  }catch{
    return 1;
  }
}

export function getSearch(url: URL){
  try{
    const rawResult = url.searchParams.get("search");
    if(rawResult == null || rawResult === ""){
      return "";
    }
    return rawResult;
  }catch{
    return "";
  }
}