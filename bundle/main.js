import 'htmx.org'
import Alpine from 'alpinejs'
import axios from 'axios'

// Toss these libraries on the window for ease of use.
window.axios = axios
window.Alpine = Alpine

// Start Alpine when the page is ready.
window.addEventListener('DOMContentLoaded', (event) => {
  Alpine.start()
})

// Restart Alpine when the DOM is altered by HTMX.
document.body.addEventListener('htmx:afterSwap', () => {
  Alpine.start()
})
