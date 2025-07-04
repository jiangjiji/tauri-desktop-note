import hotkeys from 'hotkeys-js'

export function registerHotkey() {
  hotkeys('ctrl+f', (event) => {
    event.preventDefault()

    const searchInput = document.getElementById('search-input')
    if (searchInput) {
      searchInput.focus()
    }
  })
}
