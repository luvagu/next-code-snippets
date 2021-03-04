export const defaultLangs = ['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'PHP']

export const getFormatedLang = (lang) => defaultLangs.find(language => language.toLowerCase() === lang.toLowerCase().trim())
