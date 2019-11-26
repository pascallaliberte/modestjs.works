const fontList = `Source+Code+Pro:400,700|Lato:400,400i,700,700i|Noto+Serif:400,400i,700,700i`
const stylesheetUrl = `https://fonts.googleapis.com/css?family=${fontList}`;

let onFontLoadCallbacks = []
let previousFontClasses = []

const getFontShorthandsAndSlugsFromFontList = () => {
  let fonts = fontList.split('|')
  fonts = fonts.map(font => {
    const [name, variantList] = font.split(':')
    return {
      name: name.replace(/\+/g, ' '),
      variantList: variantList.split(',')
    }
  })
  let shortHandsAndSlugs = []
  fonts.forEach(font => {
    const fontNameSlug = font.name.replace(/\s/g, '-').toLowerCase()
    const sizeAndFontName = ` 1em '${font.name}'`
    if (font.variantList.length == 0) {
      shortHandsAndSlugs.push({
        shorthand: sizeAndFontName,
        slug: fontNameSlug
      })
      return
    }
    font.variantList.forEach(variantString => {
      let shorthand = isNaN(variantString)? 'italic ': '';
      shorthand += parseInt(variantString)
      shorthand += sizeAndFontName
      shortHandsAndSlugs.push({
        shorthand,
        slug: `${fontNameSlug}-${variantString}-loaded`
      })
    })
  })
  return shortHandsAndSlugs
}

const addStylesheet = () => {

  const head = document.head
  let link = document.createElement("link")

  link.type = "text/css"
  link.rel = "stylesheet"
  link.href = stylesheetUrl

  head.appendChild(link)
}

const removeStylesheet = () => {
  let link = document.head.querySelector(`link[href="${stylesheetUrl}"]`)
  if (link) {
    link.remove()
  }
}

const removeUnusedFontClasses = () => {
  const shortHandsAndSlugs = getFontShorthandsAndSlugsFromFontList()
  shortHandsAndSlugs.forEach(shortHandAndSlug => {
    const {slug} = shortHandAndSlug
    document.documentElement.classList.remove(slug)
    previousFontClasses.push(slug)
  })
}

const onFontLoad = (callback) => {
  onFontLoadCallbacks.push(callback)
}

const notifyFontLoaded = () => {
  onFontLoadCallbacks.forEach(callback => {
    callback()
  })
}

const initAddFontClassesOnFontLoad = () => {
  if (!('fonts' in document)) return;
  
  const shortHandsAndSlugs = getFontShorthandsAndSlugsFromFontList()
  
  shortHandsAndSlugs.forEach(shortHandAndSlug => {
    const {shorthand, slug} = shortHandAndSlug
    document.fonts.load(shorthand).then(() => {
      document.documentElement.classList.add(slug)
      notifyFontLoaded()
    })
  })
}

const forceAddFontClasses = () => {
  const shortHandsAndSlugs = getFontShorthandsAndSlugsFromFontList()
  shortHandsAndSlugs.forEach(shortHandAndSlug => {
    const {shorthand, slug} = shortHandAndSlug
    document.documentElement.classList.add(slug)
  })
}

const addBackPreviousFontClasses = () => {
  previousFontClasses.forEach(slug => {
    document.documentElement.classList.add(slug)
  })
}

const loadFonts = () => {
  addStylesheet()
  if (!('fonts' in document)) return forceAddFontClasses();
  addBackPreviousFontClasses();
}

const removeFonts = () => {
  removeStylesheet()
  removeUnusedFontClasses()
}

const areFontsLoaded = () => {
  return null != document.head.querySelector(`link[href="${stylesheetUrl}"]`)
}

const initFonts = () => {
  initAddFontClassesOnFontLoad()
  loadFonts()
}

export {
  initFonts,
  loadFonts,
  removeFonts,
  areFontsLoaded,
  onFontLoad
}
