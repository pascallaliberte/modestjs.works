import { loadFonts, removeFonts, areFontsLoaded, onFontLoad} from './load-fonts.js'

const toggleSelector = `[data-behavior="toggle-fonts"]`
const toggleTextSelector = `${toggleSelector}, [data-behavior="toggle-text-on-font-change"]`

const setAllToggleText = () => {
  const textEls = document.querySelectorAll(toggleTextSelector)
  
  textEls.forEach(el => {
    if (!el.dataset.textLoaded || !el.dataset.textDisabled) return
    
    el.textContent = areFontsLoaded()? el.dataset.textLoaded: el.dataset.textDisabled  
  })
}

const enableToggles = () => {
  setAllToggleText()
  
  document.addEventListener('click', (e) => {
    const el = e.target
    if (!el.matches(toggleSelector)) return
    
    if (areFontsLoaded()) {
      removeFonts()
    } else {
      loadFonts()
    }
    setAllToggleText()
  })
  
  onFontLoad(() => {
    setAllToggleText()
  })
}

enableToggles()
