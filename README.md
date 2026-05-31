# Password Strength Checker

An interactive terminal-styled password strength checker built with React + Vite + TypeScript.

## Features

- Real-time password strength rating: Very Weak / Weak / Medium / Strong
- Checks for length, uppercase, lowercase, numbers, and special characters
- Detects common passwords (e.g. `password`, `admin`, `123456`)
- Shows improvement suggestions
- Visual strength bar with colour coding
- Quick-try example passwords

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Install & Run

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output goes into the `dist/` folder. You can serve it with:

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── App.tsx          # Main password checker component + logic
│   ├── main.tsx         # React entry point
│   ├── index.css        # Global styles (Tailwind)
│   └── ...
├── public/              # Static assets
├── index.html           # HTML entry point
├── vite.config.ts       # Vite config
└── package.json
```

## Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
