import { ui, defaultLang, showDefaultLang, languages } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    //If there is two word like en and th remove it
    for(const key in languages) {
      if (path.startsWith(`/${key}/`)) {
        path = path.replace(`/${key}`, '');
        break;
      }
    }
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
  }
}

export function pathTranslatorQ(url: URL) {
  const lang = getLangFromUrl(url);
  return useTranslatedPath(lang);
}

export function textTranslatorQ(url: URL){
  const lang = getLangFromUrl(url);
  return useTranslations(lang);
}