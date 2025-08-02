
import type { APIContext, MiddlewareNext } from "astro";
import { Middleware } from "./middleware";
import { sequence } from "astro:middleware";
// import { BlockWhenAuth } from "./auth/BlockWhenAuth";
// import { BlockWhenNotAuth } from "./auth/BlockWhenNotAuth";
import { pathTranslatorQ } from "src/i18/utils";


type ASTRO_CONTEXT = APIContext<Record<string, any>, Record<string, string | undefined>>
export const onRequest = sequence(MainMiddlewareEntryPoint);

async function MainMiddlewareEntryPoint(context: ASTRO_CONTEXT, next: MiddlewareNext) {
  //Skip if it is an action
  if (context.url.pathname.startsWith("/_actions")) {
    return next();
  }
  if(context.url.pathname.startsWith("/api")) {
    return next();
  }
  
  const t = pathTranslatorQ(context.url);

  const mid = new Middleware(context, next);

  //1st Middleware
  // await mid.group(async(mid)=>{
  //   //Check if maintenance
  //   await mid.path().except(["/memo/maintenance"], true).do(CheckIfMaintenance);
  //   await mid.path().select(["/memo/maintenance"], true).do(CheckIfLive);

  //   return mid.fin();
  // });

  //---> Check Auth
  await mid.group(async (mid) => {

    //Check if AUTH is for registration only
    // await mid.path().select([
    //   t("/auth/register/customer-detail")
    // ], true).do(() => { 
    //   if( !context.cookies.has("CRS_SESSION_KEY_ON_REGISTRATION") ){
    //     return context.redirect(t("/"));
    //   }
    // });

    // if(context.url.pathname.includes("/auth/register/completed")){
    //   return mid.fin();
    // }
    
    // await mid.path().select([
    //   t("/authentication")
    // ], true).do(BlockWhenAuth)

    // await mid.path().select([
    //   t("/profile"),
    //   t("/reservation"),
    // ], true).do(BlockWhenNotAuth)

    return mid.fin();
  });


  return await mid.result();
}
