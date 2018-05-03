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

export function setLanguage (lang: string) {
    if (language != lang) {
        language = lang;
    }
}