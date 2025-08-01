import type { HTMLElementsWithProps } from "@jsarmyknife/native--dom";
import type { Subscription } from "@jsarmyknife/native--storage";
import { Calendar } from "vanilla-calendar-pro";

export type ELEMENT_DATE_PICKER = HTMLElementsWithProps<DATE_PICKER_PROPS>;

export type DATE_PICKER_PROPS = {
  picker: Calendar,
  displayConverter: Subscription<((date:string) => string)|null|undefined>,
  input: HTMLInputElement,
  value: Subscription<string>,
}


export type ELEMENT_TIME_PICKER = HTMLElementsWithProps<TIME_PICKER_PROPS>;

export type TIME_PICKER_PROPS = {
  picker: Calendar,
  displayConverter: Subscription<((date:string) => string)|null|undefined>,
  minTime: Subscription<string>,
  maxTime: Subscription<string>,
  input: HTMLInputElement,
  value: Subscription<string>,
}


export type ELEMENT_DATA_TIME_PICKER = HTMLElementsWithProps<DATE_TIME_PICKER_PROPS>;

export type DATE_TIME_PICKER_PROPS = {
  min: Subscription<Date|null|undefined>,
  max: Subscription<Date|null|undefined>,
  minTimeBetween: Subscription<string>,
  maxTimeBetween: Subscription<string>,
  dateInput: HTMLInputElement,
  timeInput: HTMLInputElement,
  datePicker: Calendar,
  timePicker: Calendar,
  value: Subscription<string>,
}