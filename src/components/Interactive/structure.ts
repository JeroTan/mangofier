import type { DATE_PICKER_PROPS } from "@components/Form/Calendar/structure";
import type { HTMLElementsWithProps } from "@jsarmyknife/native--dom/dist/utility";
import type { Subscription } from "@jsarmyknife/native--storage";
import type { ASSET_DETAILS } from "src/structure/Assets";
import type { GUEST, LOCATION, SCHEDULE } from "src/structure/Browse/Payload";
import type { Calendar } from "vanilla-calendar-pro";

export type ELEMENT_SEARCH_QUERY_FORM = HTMLElementsWithProps<SEARCH_QUERY_FORM_PROPS>;

export interface SEARCH_QUERY_FORM_PROPS{
  where: Subscription<LOCATION|null>,
  when: Subscription<SCHEDULE|null>,
  who: Subscription<GUEST|null>,
}

export type ELEMENT_GUEST_PICKER = HTMLElementsWithProps<GUEST_PICKER_PROPS>;
export interface GUEST_PICKER_PROPS {
  switch: Subscription<boolean>,
  guests: Subscription<GUEST>,
}


export type ELEMENT_SEARCH_DATE_PICKER = HTMLElementsWithProps<SEARCH_DATE_PICKER_PROPS>;
export type SEARCH_DATE_PICKER_PROPS = Omit<DATE_PICKER_PROPS, "value"> & {
  switch: Subscription<boolean>,
  value: Subscription<SCHEDULE|null>,
  onChange: (callback: (self: Calendar, event: Event)=> void) => void,
} ;


export type ELEMENT_ADDRESS_SUGGESTION = HTMLElementsWithProps<ADDRESS_SUGGESTION_PROPS>;
export interface ADDRESS_SUGGESTION_PROPS {
  inputAddress: Subscription<string>,
  switch: Subscription<boolean>,
  address: Subscription<LOCATION|null>,
}


export type ELEMENT_MAP = HTMLElementsWithProps<MAP_PROPS>;
export interface MAP_PROPS {
  initialLocation: Subscription<LOCATION|null>,
  outputLocation: Subscription<LOCATION|null>,
  updateMarkerShow: (list: ASSET_DETAILS[]) => void,
}


export type ELEMENT_PAGINATION = HTMLElementsWithProps<PAGINATION_PROPS>;
export interface PAGINATION_PROPS {
  currentPage: Subscription<number>,
  totalPages: Subscription<number>,
}