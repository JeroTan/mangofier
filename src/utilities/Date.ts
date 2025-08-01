import { transformDate } from "@jsarmyknife/native--math";

export function MonthDateOnly(date: Date|string){
  return transformDate(date, "mnt, dd yyyy").replace(/, \d{4}/, "")
}