# Rock Paper Scissor Showdown

A small browser-based Rock-Paper-Scissors game with a simple contact page and lightweight utilities.

🎮 Live Demo:
https://duebenpresleylewis.github.io/rock-paper-scissors-showdown/

## Features
- Play a single-round Rock-Paper-Scissors game against the computer
- Local score persistence using `localStorage`
- Small contact page with email validation and placeholder email-sending script
- Toast notifications utility

## Project Structure

- Assets/                 — static assets (favicon, images)
- pages/                  — extra pages: `about.html`, `contact.html`
- scripts/                — shared JS (toast, emailValidation, email placeholder)
- src/                    — main app pages (`index.html`) and `script.js`
- styles/                 — CSS files (global and page styles)

## Quick Start (serve locally)

Many browsers block module imports and some features when opened over `file://`. Serve the project with a simple HTTP server and open `src/index.html`.

Using Python 3 (recommended):

```bash
python -m http.server 8000
# then open http://localhost:8000/src/index.html
```

Or use any static server you prefer (Live Server, `http-server`, etc.).

## Notes & Known Issues

- `script.js` is loaded as a JavaScript module (`type="module"`). Inline HTML handlers like `onclick="playGame('rock')"` will fail unless those functions are available on the global `window` object. The project exposes `playGame` and `resetScore` on `window` to preserve the current inline handlers.
- The `confetti` library is loaded from a CDN in `src/index.html`; if you see errors, either move the CDN `<script>` above the module script or the code will guard the `confetti` call at runtime.
- `emailValidation.js` assumes the presence of an element with id `user-email`. If the script is included on pages without that element it can throw — the validation should check for the element before using it.
- `email.js` is currently a placeholder; implement sending logic or remove the reference.

## Development Tips

- Prefer replacing inline `onclick` handlers with `addEventListener` calls inside `script.js` for cleaner modular code.
- When changing modules or imports, serve files over HTTP to avoid CORS/module loading issues.

## 🛠️ Built With & Credits

### 🎵 Audio & Sound Effects
All audio tracks and sound effects used in this game are licensed under the [Pixabay Content License](https://pixabay.com/service/license/) (Free for commercial use, no attribution required, but highly appreciated).

*   **Rock Selection Sound** – [Sound Effect Title](URL_LINK_TO_ASSET) by [Creator Name](URL_LINK_TO_CREATOR_PROFILE)
*   **Paper Selection Sound** – [Sound Effect Title](URL_LINK_TO_ASSET) by [Creator Name](URL_LINK_TO_CREATOR_PROFILE)
*   **Scissors Selection Sound** – [Sound Effect Title](URL_LINK_TO_ASSET) by [Creator Name](URL_LINK_TO_CREATOR_PROFILE)
*   **Background Music (Main Menu)** – "[Track Title](URL_LINK_TO_ASSET)" by [Artist Name](URL_LINK_TO_CREATOR_PROFILE)



## Contributing

Feel free to open issues or submit PRs. Keep changes small and focused.

---
Created for learning and demo purposes.
