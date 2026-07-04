# Tic-Tac-Toe

A two-player Tic-Tac-Toe game built with React + Vite.

## Features
- Two players take turns as **X** and **O** on the same device
- Turn indicator shows whose move it is
- Automatic winner / draw detection with an animated line through the winning row
- "Restart round" to play again, and "Reset match" to also clear the score
- Running scoreboard for X, O, and draws

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`) in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Deploying (e.g. GitHub Pages / Vercel / Netlify)

This is a standard Vite app — `npm run build` outputs a static `dist/` folder that
you can deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Tic-Tac-Toe game with React"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

## Project structure

```
tic-tac-toe/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── index.css
```
