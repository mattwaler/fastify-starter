import './alpine'
import 'htmx.org'
import axios from 'axios'

// Toss axios on the window so we can use it in Alpine.
window.axios = axios

// Reinitialize Alpine When HTMX Alters the DOM.
document.body.addEventListener('htmx:afterSwap', () => {
  Alpine.start()
})

// Creating a store
document.addEventListener('alpine:initializing', () => {
  Alpine.store('message', 'Hello from Alpine v3!')
})
