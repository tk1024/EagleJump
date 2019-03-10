export const ChangeFavicon = (newFaviconUrl: string) => {
  const linkEl = document.createElement("link")
  linkEl.setAttribute("href", newFaviconUrl)
  linkEl.setAttribute("rel", "shortcut icon")
  removeCurrentFavicon()
  document.head.appendChild(linkEl)
}

const removeCurrentFavicon = () => {
  Array.from(
    document.querySelectorAll("[rel='icon'], [rel='shortcut icon']")
  ).map((el: HTMLElement) => {
    el.parentNode!.removeChild(el)
  })
}
