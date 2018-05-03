declare function require(url: string);
const languageData = require("../data/languages.json");

// navigator.language isn't standardized so checking possible values
// defaulting to English if no language detected
var language = (navigator.language ||
        navigator["userLanguage"] ||
        navigator["browserLanguage"] ||
        navigator["systemLanguage"] ||
        "en"
    // only keep the first 2 letters if longer than 2 chars
    ).substring(0,2);

export function getLanguage () : string {
    return language;
}

/**
 * set language via select element
 * @param lang new language code
 * @return true if language change requires a dom update
 */
export function setLanguage (lang: string) : boolean {
    var requiresUpdate = false;
    if (language != lang) {
        requiresUpdate = languageData[language].rtl !== languageData[lang].rtl;
        language = lang;
    }
    return requiresUpdate;    
}

export function getLangDirection () : string {
    return languageData[language].rtl ? "rtl" : "ltr";
}