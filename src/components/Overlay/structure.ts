import type { HTMLElementsWithProps } from "@jsarmyknife/native--dom";
import type { Subscription } from "@jsarmyknife/native--storage";

export type SCREEN_SHOW_ELEMENT = HTMLElementsWithProps<SCREEN_SHOW_PROPS>;

export interface SCREEN_SHOW_PROPS {
  switch: Subscription<boolean>,
  content: Subscription<HTMLElement|Node>,
}