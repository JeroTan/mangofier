import type { ASTRO_CONTEXT } from "./../middleware";

export function BlockWhenAuth(context:ASTRO_CONTEXT){
  if( context.cookies.has("MGF_SESSION_KEY") && context.cookies.has("MGF_CUSTOMER_INFORMATION") ){
    return context.redirect("/");
  }
}