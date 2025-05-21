#!/bin/bash
set -e

PROJECT_NAME="bg-color-changer"

echo "Creating new Vite + React project: $PROJECT_NAME"
npm create vite@latest $PROJECT_NAME -- --template react

cd $PROJECT_NAME

echo "Installing dependencies..."
npm install

echo "Installing Tailwind CSS and dependencies..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

echo "Configuring tailwind.config.cjs..."

# Overwrite tailwind.config.cjs (or tailwind.config.js)
cat > tailwind.config.cjs <<EOL
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOL

echo "Creating src/index.css with Tailwind directives..."
cat > src/index.css <<EOL
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

echo "Updating src/main.jsx to import index.css..."
sed -i.bak "s|import App from './App.jsx'|import App from './App.jsx'\nimport './index.css'|" src/main.jsx

echo "Creating src/App.jsx with color wheel background changer..."

cat > src/App.jsx <<'EOL'
import { useState } from 'react';

function App() {
  const [bgColor, setBgColor] = useState('#ffffff');

  const handleColorChange = (e) => {
    setBgColor(e.target.value);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center transition-all duration-500"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 bg-white px-4 py-2 rounded shadow-md">
          Pick a Background Color
        </h1>
        <input
          type="color"
          value={bgColor}
          onChange={handleColorChange}
          className="w-32 h-32 rounded-full border-none outline-none cursor-pointer shadow-lg"
        />
      </div>
    </div>
  );
}

export default App;
EOL

echo "Creating README.md..."

cat > README.md <<EOL
# 🎨 Background Color Picker App

This is a simple React application built with Vite and styled using Tailwind CSS. It features a color wheel in the center of the screen that allows users to change the entire background color dynamically.

## Features

- Real-time background color update using a color input (<input type="color">)
- Clean and responsive UI using Tailwind CSS
- Built with Vite for fast development and HMR
- Minimal and intuitive interface

## Installation & Usage

\`\`\`bash
npm install
npm run dev
\`\`\`

Open your browser at http://localhost:5173 to see the app.

## Tech Stack

- React 19
- Tailwind CSS 4
- Vite

---

Made with ❤️ using React and Tailwind CSS
EOL

echo "Setup complete! Starting dev server..."
npm run dev
