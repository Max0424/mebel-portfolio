import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import de from "./de.json";
import es from "./es.json";
import ru from "./ru.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
    es: { translation: es },
    ru: { translation: ru }
  },
  lng: "en",          // default language
  fallbackLng: "en",  // fallback if translation missing
  interpolation: { escapeValue: false }
});

export default i18n;
