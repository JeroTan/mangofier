import type { ErrorInferenceObject } from "astro/actions/runtime/utils.js";
import { isInputError, type ActionError } from "astro:actions";


export class ErrorFields<T extends ErrorInferenceObject>{
  private error: ActionError<T>;
  private hasError: boolean = false;

  constructor(error: ActionError<T>){
    if(isInputError(error))
      this.hasError = true;
    this.error = error;
  }

  f(key: keyof T, doWhenErrorCallback: (errorMessage:string[])=>void){
    if(!this.hasError){
      return this;
    }
    const fieldErrors = ((this.error as any).fields as any)[key];
    if(fieldErrors && fieldErrors.length > 0){
      doWhenErrorCallback(fieldErrors as string[]);
      return this;
    }
    return this;
  }
}