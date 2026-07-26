# The Growth Project

A calm daily wellness app — intentions, reflections, grounding, and AI support. Everything stays on your device.

## Features

- **Home** — Set your one thing, add up to three daily intentions, log an evening mood and reflection
- **Daily Spark** — A small sensory or reflective prompt each morning, cycling through a curated list
- **Space** — Park thoughts in a tagged jar, write to release without saving, collect kind words
- **Settle** — Box breathing with live 4-count timer, colour-fill grounding, 5-4-3-2-1 sensory exercise
- **Clarity** — Real AI companion (Claude Sonnet) for processing hard moments; saves sessions to archive
- **You** — Profile context for the AI, feature toggles, data export, and privacy controls

## Privacy

All data is stored in `localStorage` — on your device only. No server, no account, no cloud sync. Export your data anytime as a plain text file.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Stack

- **React 18** + **Vite 5**
- **Tabler Icons** (webfont)
- **Inter** (Google Fonts)
- **Anthropic Claude API** (Clarity feature — requires the API to be accessible from your host)

## Project structure

```
src/
  pages/
    Home.jsx       # One thing, intentions, spark, evening check-in
    Space.jsx      # Jar, kind words, release
    Settle.jsx     # Box breathing, colour fill, grounding
    Clarity.jsx    # AI chat + archive
    Settings.jsx   # Profile, feature toggles, privacy
  components/
    UI.jsx         # Shared design system components
  hooks/
    useStore.js    # Central state with localStorage persistence
  utils/
    sparks.js      # Spark prompt library
  styles/
    global.css     # CSS variables (light + dark mode), reset
  App.jsx          # Shell, navigation, toast
  main.jsx         # Entry point
```

## Customisation

- **Sparks** — Edit `src/utils/sparks.js` to add or change prompts
- **Theme** — All colours live as CSS variables in `src/styles/global.css`; dark mode is handled via `prefers-color-scheme`
- **AI system prompt** — Edit the `systemPrompt` string in `src/pages/Clarity.jsx`

## License

MIT
