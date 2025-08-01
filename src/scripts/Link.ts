import { getLangFromUrl, useTranslatedPath, useTranslations } from "src/i18/utils";

export function getURL(){
  return new URL(location.href);
}

export function pathTranslator(){
  const lang = getLangFromUrl(getURL());
  return useTranslatedPath(lang);
}

export function textTranslator(){
  const lang = getLangFromUrl(getURL());
  return useTranslations(lang);
}