import { NativeModules, Platform } from "react-native";

//need to know the locale for date formatting
const locale =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

export function dateFormatter(date) {
  date = new Date(date);
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let year = date.getFullYear();
  return locale === "en_US"
    ? `${month}/${day}/${year}`
    : `${day}/${month}/${year}`;
}
