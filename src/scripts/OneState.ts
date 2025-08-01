import type { Subscription } from "@jsarmyknife/native--storage"

const stateGlobal: {
  [key: string|number]: Subscription<any>,
} = {};

export function setOneState<T>(key: string|number, state: Subscription<T>):Subscription<T> {
  if( stateGlobal[key] === undefined) {
    stateGlobal[key] = state as Subscription<T>;
  }
  return stateGlobal[key] as Subscription<T>;
}


