import type { HTMLElementsWithProps } from "@jsarmyknife/native--dom/dist/utility";
import type { Subscription } from "@jsarmyknife/native--storage";

export type ELEMENT_PAGINATION = HTMLElementsWithProps<PAGINATION_PROPS>;
export interface PAGINATION_PROPS {
  currentPage: Subscription<number>,
  totalPages: Subscription<number>,
}