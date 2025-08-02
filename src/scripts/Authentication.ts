// import { btoaEx } from "@jsarmyknife/native--cryptographic";
// import { DOMPopTransformer } from "@jsarmyknife/native--dom";
// import { Modal } from "@jsarmyknife/native--pop";
// import { pathTranslator, textTranslator } from "./Link";
// import { Storage } from "@jsarmyknife/native--storage";
// import { actions } from "astro:actions";

export function loginModal(goBackLink: string) {
  // const t = pathTranslator();
  // const l = textTranslator();
  // const loginRequiredModal = new Modal(DOMPopTransformer);
  // loginRequiredModal
  //   .type("info")
  //   .title(l("modal.login_required"))
  //   .message(l("notif.heads_up__"))
  //   .button("Log In & Continue")
  //   .callback(()=>{
  //     const cached = new Storage("reservation-cached");
  //     cached.store(btoaEx(goBackLink));
  //     location.href = t("/authentication/login");
  //   }).run();
}

export async function logoutProcess(){
  // const t = pathTranslator();
  // const logoutPop = new Modal(DOMPopTransformer);
  // const [_,closePop] =logoutPop.type("loading").title("Logging out").message("Please wait...").run();

  // const { error } = await actions.authentication.logout();
  // if (error) {
  //   console.error("Logout failed:", error);
  //   closePop();
  //   return;
  // }
  // // Redirect to home page after logout
  // window.location.href = t("/");
}