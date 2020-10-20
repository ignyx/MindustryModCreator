import { addMessages, init, getLocaleFromPathname } from 'svelte-i18n'
// Loads translations
import en from './bundles/en.json'
import fr from './bundles/fr.json'

// This is synchronous loading, and will get quite heavy.
// I couldn't get the async to work properly, you are welcome to make it functional.
// https://github.com/kaisermann/svelte-i18n/blob/master/docs/Getting%20Started.md
addMessages('en', en)
addMessages('fr', fr)

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromPathname(/^\/(.*?)\//),
})
