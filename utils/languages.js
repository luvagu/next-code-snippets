const languages = ['HTML', 'CSS', 'JavaScript', 'Python']

export const getLanguages = () => languages

export const getFormatedLang = (lang) => languages.find(language => language.toLowerCase() === lang.toLowerCase())
