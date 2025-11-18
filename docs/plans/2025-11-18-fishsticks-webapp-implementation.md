# Fishsticks Animation Webapp Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a React-based sprite animation webapp that plays themed versions of the fishsticks joke with TTS audio and shareable URLs.

**Architecture:** Single-page React app with client-side routing, sprite-based animations using CSS transitions, Web Speech API for TTS, and URL parameters for theme selection.

**Tech Stack:** React 18, Vite, CSS Modules, Web Speech API, GitHub Pages

---

## Task 1: Project Setup and Dependencies

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `.gitignore`

**Step 1: Initialize React project with Vite**

Run:
```bash
npm create vite@latest . -- --template react
```

When prompted:
- Package name: animated-fishstick
- Select a framework: React
- Select a variant: JavaScript

Expected: Vite scaffolding created

**Step 2: Install dependencies**

Run:
```bash
npm install
```

Expected: Dependencies installed successfully

**Step 3: Update .gitignore**

Edit `.gitignore` to add:
```
# dependencies
node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build
/dist

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

**Step 4: Configure Vite for GitHub Pages**

Edit `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/animated-fishstick/',
})
```

**Step 5: Test development server**

Run:
```bash
npm run dev
```

Expected: Dev server starts on http://localhost:5173, shows default Vite React page

**Step 6: Commit initial setup**

Run:
```bash
git add .
git commit -m "chore: initialize React project with Vite"
```

---

## Task 2: Create Project Structure and Dialogue Data

**Files:**
- Create: `src/data/dialogues.js`
- Create: `src/components/ThemeSelector.jsx`
- Create: `src/components/AnimationPlayer.jsx`
- Create: `src/components/SpriteRenderer.jsx`
- Create: `src/components/DialogueDisplay.jsx`
- Create: `src/components/ShareButton.jsx`
- Create: `src/utils/tts.js`
- Create: `public/sprites/.gitkeep`

**Step 1: Create dialogue data structure**

Create `src/data/dialogues.js`:
```javascript
export const dialogues = {
  classic: [
    { speaker: 1, text: "Do you like fishsticks?" },
    { speaker: 2, text: "Yeah, I love fishsticks!" },
    { speaker: 1, text: "Do you like putting fishsticks in your mouth?" },
    { speaker: 2, text: "Yeah!" },
    { speaker: 1, text: "What are you, a gay fish?" },
    { speaker: 2, text: "..." },
  ],
  pirates: [
    { speaker: 1, text: "Do ye like fishsticks, matey?" },
    { speaker: 2, text: "Aye, I love me fishsticks!" },
    { speaker: 1, text: "Do ye like puttin' fishsticks in yer mouth?" },
    { speaker: 2, text: "Aye!" },
    { speaker: 1, text: "What are ye, a gay fish?" },
    { speaker: 2, text: "Arr...?" },
  ],
  space: [
    { speaker: 1, text: "Do you like space-fishsticks?" },
    { speaker: 2, text: "Affirmative, I love fishsticks!" },
    { speaker: 1, text: "Do you like putting fishsticks in your mouth?" },
    { speaker: 2, text: "Affirmative!" },
    { speaker: 1, text: "What are you, a gay fish?" },
    { speaker: 2, text: "Error... does not compute..." },
  ],
  fantasy: [
    { speaker: 1, text: "Dost thou enjoy fishsticks?" },
    { speaker: 2, text: "Verily, I love fishsticks!" },
    { speaker: 1, text: "Dost thou enjoy placing fishsticks in thy mouth?" },
    { speaker: 2, text: "Verily!" },
    { speaker: 1, text: "What art thou, a gay fish?" },
    { speaker: 2, text: "By the gods..." },
  ],
};

export const themes = {
  classic: {
    name: "Classic",
    color: "#4a5568",
  },
  pirates: {
    name: "Pirates",
    color: "#2c5282",
  },
  space: {
    name: "Space",
    color: "#5b21b6",
  },
  fantasy: {
    name: "Fantasy",
    color: "#065f46",
  },
};
```

**Step 2: Create component files with placeholders**

Create `src/components/ThemeSelector.jsx`:
```javascript
export default function ThemeSelector() {
  return <div>ThemeSelector</div>;
}
```

Create `src/components/AnimationPlayer.jsx`:
```javascript
export default function AnimationPlayer() {
  return <div>AnimationPlayer</div>;
}
```

Create `src/components/SpriteRenderer.jsx`:
```javascript
export default function SpriteRenderer() {
  return <div>SpriteRenderer</div>;
}
```

Create `src/components/DialogueDisplay.jsx`:
```javascript
export default function DialogueDisplay() {
  return <div>DialogueDisplay</div>;
}
```

Create `src/components/ShareButton.jsx`:
```javascript
export default function ShareButton() {
  return <div>ShareButton</div>;
}
```

**Step 3: Create TTS utility**

Create `src/utils/tts.js`:
```javascript
export const speak = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(utterance);
    return true;
  }
  return false;
};

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const isTTSSupported = () => {
  return 'speechSynthesis' in window;
};
```

**Step 4: Create sprites directory placeholder**

Run:
```bash
mkdir -p public/sprites
touch public/sprites/.gitkeep
```

**Step 5: Test imports**

Verify all files are created and no syntax errors:
```bash
npm run dev
```

Expected: Dev server runs without errors

**Step 6: Commit data structure**

Run:
```bash
git add src/data src/components src/utils public/sprites
git commit -m "feat: add dialogue data and component structure"
```

---

## Task 3: Build ThemeSelector Component

**Files:**
- Modify: `src/components/ThemeSelector.jsx`
- Create: `src/components/ThemeSelector.module.css`

**Step 1: Implement ThemeSelector component**

Edit `src/components/ThemeSelector.jsx`:
```javascript
import { themes } from '../data/dialogues';
import styles from './ThemeSelector.module.css';

export default function ThemeSelector({ onThemeSelect }) {
  const themeKeys = Object.keys(themes);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fishsticks Joke Generator</h1>
      <p className={styles.subtitle}>Choose your theme to begin</p>
      <div className={styles.grid}>
        {themeKeys.map((themeKey) => (
          <button
            key={themeKey}
            className={styles.card}
            onClick={() => onThemeSelect(themeKey)}
            style={{ borderColor: themes[themeKey].color }}
          >
            <div
              className={styles.preview}
              style={{ backgroundColor: themes[themeKey].color }}
            />
            <h3 className={styles.themeName}>{themes[themeKey].name}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Add ThemeSelector styles**

Create `src/components/ThemeSelector.module.css`:
```css
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.title {
  font-size: 3rem;
  color: white;
  margin-bottom: 0.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 900px;
  width: 100%;
}

.card {
  background: white;
  border: 4px solid transparent;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.preview {
  width: 100%;
  height: 120px;
  border-radius: 8px;
}

.themeName {
  font-size: 1.5rem;
  margin: 0;
  color: #333;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .grid {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
}
```

**Step 3: Test ThemeSelector in browser**

Update `src/App.jsx` temporarily:
```javascript
import ThemeSelector from './components/ThemeSelector';

function App() {
  return (
    <ThemeSelector onThemeSelect={(theme) => console.log('Selected:', theme)} />
  );
}

export default App;
```

Run: `npm run dev`

Expected: Theme selector displays with 4 theme cards, clicking logs theme to console

**Step 4: Commit ThemeSelector**

Run:
```bash
git add src/components/ThemeSelector.*
git commit -m "feat: implement ThemeSelector component with styling"
```

---

## Task 4: Build SpriteRenderer Component

**Files:**
- Modify: `src/components/SpriteRenderer.jsx`
- Create: `src/components/SpriteRenderer.module.css`

**Step 1: Implement SpriteRenderer component**

Edit `src/components/SpriteRenderer.jsx`:
```javascript
import { useState, useEffect } from 'react';
import styles from './SpriteRenderer.module.css';

export default function SpriteRenderer({ theme, activeSpeaker }) {
  const [spritesLoaded, setSpritesLoaded] = useState(false);
  const [error, setError] = useState(false);

  // For now, use placeholder colored boxes since we don't have sprites yet
  const bgColor = {
    classic: '#e2e8f0',
    pirates: '#1e40af',
    space: '#581c87',
    fantasy: '#064e3b',
  }[theme] || '#e2e8f0';

  const char1Color = {
    classic: '#ef4444',
    pirates: '#f97316',
    space: '#8b5cf6',
    fantasy: '#10b981',
  }[theme] || '#ef4444';

  const char2Color = {
    classic: '#3b82f6',
    pirates: '#eab308',
    space: '#ec4899',
    fantasy: '#f59e0b',
  }[theme] || '#3b82f6';

  useEffect(() => {
    // Simulate sprite loading
    setSpritesLoaded(true);
  }, [theme]);

  if (!spritesLoaded) {
    return <div className={styles.loading}>Loading sprites...</div>;
  }

  if (error) {
    return <div className={styles.error}>Failed to load sprites</div>;
  }

  return (
    <div className={styles.container} style={{ backgroundColor: bgColor }}>
      {/* Background placeholder */}
      <div className={styles.background} />

      {/* Character 1 (interviewer) */}
      <div
        className={`${styles.character} ${styles.character1} ${activeSpeaker === 1 ? styles.talking : ''}`}
        style={{ backgroundColor: char1Color }}
      >
        <div className={styles.characterLabel}>1</div>
      </div>

      {/* Character 2 (respondent) */}
      <div
        className={`${styles.character} ${styles.character2} ${activeSpeaker === 2 ? styles.talking : ''}`}
        style={{ backgroundColor: char2Color }}
      >
        <div className={styles.characterLabel}>2</div>
      </div>
    </div>
  );
}
```

**Step 2: Add SpriteRenderer styles**

Create `src/components/SpriteRenderer.module.css`:
```css
.container {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 2rem;
  transition: background-color 0.3s ease;
  overflow: hidden;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.character {
  position: relative;
  width: 120px;
  height: 180px;
  border-radius: 8px;
  z-index: 1;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.characterLabel {
  font-size: 3rem;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.character1 {
  margin-right: 2rem;
}

.character2 {
  margin-left: 2rem;
}

.talking {
  animation: bounce 0.5s ease infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.loading {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  color: #6b7280;
  font-size: 1.25rem;
}

.error {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fee2e2;
  color: #dc2626;
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .container {
    height: 300px;
    padding: 1rem;
  }

  .character {
    width: 80px;
    height: 120px;
  }

  .characterLabel {
    font-size: 2rem;
  }
}
```

**Step 3: Test SpriteRenderer in browser**

Update `src/App.jsx` temporarily:
```javascript
import { useState } from 'react';
import SpriteRenderer from './components/SpriteRenderer';

function App() {
  const [speaker, setSpeaker] = useState(1);

  return (
    <div>
      <SpriteRenderer theme="pirates" activeSpeaker={speaker} />
      <button onClick={() => setSpeaker(speaker === 1 ? 2 : 1)}>
        Toggle Speaker
      </button>
    </div>
  );
}

export default App;
```

Run: `npm run dev`

Expected: Sprite renderer shows background and 2 character boxes, clicking button makes them bounce

**Step 4: Commit SpriteRenderer**

Run:
```bash
git add src/components/SpriteRenderer.*
git commit -m "feat: implement SpriteRenderer with placeholder sprites"
```

---

## Task 5: Build DialogueDisplay Component

**Files:**
- Modify: `src/components/DialogueDisplay.jsx`
- Create: `src/components/DialogueDisplay.module.css`

**Step 1: Implement DialogueDisplay component**

Edit `src/components/DialogueDisplay.jsx`:
```javascript
import styles from './DialogueDisplay.module.css';

export default function DialogueDisplay({ text, speaker }) {
  if (!text) return null;

  return (
    <div className={styles.container}>
      <div className={`${styles.bubble} ${speaker === 1 ? styles.speaker1 : styles.speaker2}`}>
        <div className={styles.text}>{text}</div>
        <div className={`${styles.tail} ${speaker === 1 ? styles.tailLeft : styles.tailRight}`} />
      </div>
    </div>
  );
}
```

**Step 2: Add DialogueDisplay styles**

Create `src/components/DialogueDisplay.module.css`:
```css
.container {
  width: 100%;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
}

.bubble {
  position: relative;
  background-color: white;
  border-radius: 20px;
  padding: 1.5rem 2rem;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.3s ease;
}

.text {
  font-size: 1.25rem;
  color: #1f2937;
  line-height: 1.6;
  text-align: center;
}

.tail {
  position: absolute;
  bottom: -10px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid white;
}

.tailLeft {
  left: 20%;
}

.tailRight {
  right: 20%;
}

.speaker1 {
  border: 3px solid #ef4444;
}

.speaker2 {
  border: 3px solid #3b82f6;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .bubble {
    padding: 1rem 1.5rem;
    max-width: 90%;
  }

  .text {
    font-size: 1rem;
  }
}
```

**Step 3: Test DialogueDisplay in browser**

Update `src/App.jsx` temporarily:
```javascript
import DialogueDisplay from './components/DialogueDisplay';

function App() {
  return (
    <div>
      <DialogueDisplay text="Do you like fishsticks?" speaker={1} />
    </div>
  );
}

export default App;
```

Run: `npm run dev`

Expected: Speech bubble displays with text and colored border

**Step 4: Commit DialogueDisplay**

Run:
```bash
git add src/components/DialogueDisplay.*
git commit -m "feat: implement DialogueDisplay with speech bubbles"
```

---

## Task 6: Build ShareButton Component

**Files:**
- Modify: `src/components/ShareButton.jsx`
- Create: `src/components/ShareButton.module.css`

**Step 1: Implement ShareButton component**

Edit `src/components/ShareButton.jsx`:
```javascript
import { useState } from 'react';
import styles from './ShareButton.module.css';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <button className={styles.button} onClick={handleShare}>
      {copied ? '✓ Copied!' : '🔗 Share Link'}
    </button>
  );
}
```

**Step 2: Add ShareButton styles**

Create `src/components/ShareButton.module.css`:
```css
.button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.button:active {
  transform: translateY(0);
}
```

**Step 3: Test ShareButton in browser**

Update `src/App.jsx` temporarily:
```javascript
import ShareButton from './components/ShareButton';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <ShareButton />
    </div>
  );
}

export default App;
```

Run: `npm run dev`

Expected: Share button displays, clicking copies URL and shows "Copied!" message

**Step 4: Commit ShareButton**

Run:
```bash
git add src/components/ShareButton.*
git commit -m "feat: implement ShareButton with clipboard functionality"
```

---

## Task 7: Build AnimationPlayer Component

**Files:**
- Modify: `src/components/AnimationPlayer.jsx`
- Create: `src/components/AnimationPlayer.module.css`

**Step 1: Implement AnimationPlayer component**

Edit `src/components/AnimationPlayer.jsx`:
```javascript
import { useState, useEffect } from 'react';
import SpriteRenderer from './SpriteRenderer';
import DialogueDisplay from './DialogueDisplay';
import ShareButton from './ShareButton';
import { dialogues } from '../data/dialogues';
import { speak, stopSpeaking, isTTSSupported } from '../utils/tts';
import styles from './AnimationPlayer.module.css';

export default function AnimationPlayer({ theme, onBack }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(isTTSSupported());

  const dialogue = dialogues[theme];
  const currentDialogue = dialogue[currentFrame];

  useEffect(() => {
    // Start animation on mount
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (!isPlaying || currentFrame >= dialogue.length) {
      return;
    }

    const currentLine = dialogue[currentFrame];

    // Speak the line if TTS is enabled
    if (ttsEnabled) {
      speak(currentLine.text);
    }

    // Move to next frame after delay
    const timer = setTimeout(() => {
      if (currentFrame < dialogue.length - 1) {
        setCurrentFrame(currentFrame + 1);
      } else {
        setIsPlaying(false);
      }
    }, 2500); // 2.5 seconds per line

    return () => {
      clearTimeout(timer);
      stopSpeaking();
    };
  }, [currentFrame, isPlaying, dialogue, ttsEnabled]);

  const handleReplay = () => {
    setCurrentFrame(0);
    setIsPlaying(true);
  };

  const isComplete = currentFrame >= dialogue.length - 1 && !isPlaying;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <SpriteRenderer
          theme={theme}
          activeSpeaker={currentDialogue?.speaker}
        />

        <DialogueDisplay
          text={currentDialogue?.text}
          speaker={currentDialogue?.speaker}
        />

        {!ttsEnabled && (
          <div className={styles.ttsWarning}>
            ⚠️ Text-to-speech not supported in this browser
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button className={styles.button} onClick={onBack}>
          ← Back to Themes
        </button>

        {isComplete && (
          <button className={styles.button} onClick={handleReplay}>
            🔄 Replay
          </button>
        )}

        <ShareButton />
      </div>
    </div>
  );
}
```

**Step 2: Add AnimationPlayer styles**

Create `src/components/AnimationPlayer.module.css`:
```css
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0;
}

.ttsWarning {
  text-align: center;
  padding: 1rem;
  background-color: #fef3c7;
  color: #92400e;
  font-size: 0.875rem;
  margin: 1rem 2rem;
  border-radius: 8px;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background-color: white;
  border-top: 1px solid #e5e7eb;
}

.button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .content {
    padding: 1rem 0;
  }

  .controls {
    flex-direction: column;
    padding: 1rem;
  }

  .button {
    width: 100%;
  }
}
```

**Step 3: Test AnimationPlayer in browser**

Update `src/App.jsx` temporarily:
```javascript
import { useState } from 'react';
import AnimationPlayer from './components/AnimationPlayer';

function App() {
  return (
    <AnimationPlayer
      theme="pirates"
      onBack={() => console.log('Back clicked')}
    />
  );
}

export default App;
```

Run: `npm run dev`

Expected: Animation plays automatically, dialogue advances every 2.5 seconds, TTS speaks (if supported), shows replay button when complete

**Step 4: Commit AnimationPlayer**

Run:
```bash
git add src/components/AnimationPlayer.*
git commit -m "feat: implement AnimationPlayer with auto-play and TTS"
```

---

## Task 8: Wire Up Main App with URL Routing

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/App.css`
- Modify: `src/index.css`

**Step 1: Implement main App component with URL routing**

Edit `src/App.jsx`:
```javascript
import { useState, useEffect } from 'react';
import ThemeSelector from './components/ThemeSelector';
import AnimationPlayer from './components/AnimationPlayer';
import { themes } from './data/dialogues';
import './App.css';

function App() {
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Read theme from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get('theme');

    if (themeParam && themes[themeParam]) {
      setSelectedTheme(themeParam);
    }
  }, []);

  // Update URL when theme changes
  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    const url = new URL(window.location);
    url.searchParams.set('theme', theme);
    window.history.pushState({}, '', url);
  };

  const handleBack = () => {
    setSelectedTheme(null);
    const url = new URL(window.location);
    url.searchParams.delete('theme');
    window.history.pushState({}, '', url);
  };

  if (selectedTheme) {
    return <AnimationPlayer theme={selectedTheme} onBack={handleBack} />;
  }

  return <ThemeSelector onThemeSelect={handleThemeSelect} />;
}

export default App;
```

**Step 2: Update App.css**

Edit `src/App.css`:
```css
#root {
  width: 100%;
  margin: 0;
  padding: 0;
}
```

**Step 3: Update global styles**

Edit `src/index.css`:
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

**Step 4: Test full app flow in browser**

Run: `npm run dev`

Test the following:
1. Visit root URL - should show theme selector
2. Click a theme - should show animation player and update URL to `?theme=pirates`
3. Animation should auto-play through all dialogue
4. Click "Back to Themes" - should return to selector and clear URL param
5. Click share button - should copy URL with theme param
6. Manually visit URL with `?theme=space` - should load directly into animation

Expected: All navigation and URL state works correctly

**Step 5: Commit main app integration**

Run:
```bash
git add src/App.jsx src/App.css src/index.css
git commit -m "feat: integrate components with URL-based routing"
```

---

## Task 9: Add GitHub Pages Deployment Configuration

**Files:**
- Modify: `package.json`
- Create: `.github/workflows/deploy.yml`

**Step 1: Add deploy script to package.json**

Edit `package.json`, add to the `scripts` section:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

**Step 2: Install gh-pages package**

Run:
```bash
npm install --save-dev gh-pages
```

**Step 3: Create GitHub Actions workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 4: Test build locally**

Run:
```bash
npm run build
```

Expected: Build succeeds, creates `dist/` directory with optimized files

**Step 5: Preview production build**

Run:
```bash
npm run preview
```

Expected: Preview server starts, app works correctly with production build

**Step 6: Commit deployment configuration**

Run:
```bash
git add package.json package-lock.json .github/workflows/deploy.yml
git commit -m "chore: add GitHub Pages deployment configuration"
```

---

## Task 10: Create README Documentation

**Files:**
- Modify: `README.md`

**Step 1: Write comprehensive README**

Edit `README.md`:
```markdown
# Fishsticks Joke Animation Webapp

An interactive webapp that generates themed cartoon animations of the classic "Do you like fishsticks?" joke.

## Features

- 🎭 **4 Themed Versions**: Classic, Pirates, Space, and Fantasy
- 🎬 **Auto-playing Animations**: Sprite-based animations with smooth transitions
- 🔊 **Text-to-Speech**: Characters speak their dialogue using Web Speech API
- 🔗 **Shareable Links**: Share your favorite theme via URL
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Live Demo

Visit: [https://alabamamike.github.io/animated-fishstick/](https://alabamamike.github.io/animated-fishstick/)

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── components/          # React components
│   ├── ThemeSelector.jsx
│   ├── AnimationPlayer.jsx
│   ├── SpriteRenderer.jsx
│   ├── DialogueDisplay.jsx
│   └── ShareButton.jsx
├── data/               # Dialogue scripts and theme data
│   └── dialogues.js
├── utils/              # Utility functions
│   └── tts.js
└── App.jsx            # Main app component

public/
└── sprites/           # Character and background sprites (placeholders)
```

### Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS Modules** - Scoped component styling
- **Web Speech API** - Text-to-speech functionality
- **GitHub Pages** - Hosting

## Deployment

The app automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

Manual deployment:
```bash
npm run deploy
```

## Browser Compatibility

- Chrome/Edge (latest 2 versions) ✅
- Firefox (latest 2 versions) ✅
- Safari (latest 2 versions) ✅
- Text-to-speech requires browser support for Web Speech API

## Future Enhancements

- Additional themes (Western, Cyberpunk, Underwater)
- Custom sprite artwork
- User-customizable dialogue
- GIF export functionality
- Background music and sound effects

## License

MIT
```

**Step 2: Test README renders correctly**

View `README.md` in GitHub or a markdown preview tool

Expected: README displays correctly with proper formatting

**Step 3: Commit README**

Run:
```bash
git add README.md
git commit -m "docs: add comprehensive README"
```

---

## Task 11: Final Testing and Polish

**Step 1: Test all themes**

Run: `npm run dev`

Test each theme:
- Classic: Verify dialogue and colors
- Pirates: Verify pirate-speak dialogue
- Space: Verify sci-fi dialogue
- Fantasy: Verify medieval dialogue

Expected: All themes work correctly

**Step 2: Test URL sharing**

1. Select a theme (e.g., Pirates)
2. Click "Share Link" button
3. Open URL in new incognito window
4. Verify animation loads with correct theme

Expected: Shareable URLs work correctly

**Step 3: Test mobile responsiveness**

Open browser dev tools, test on different viewport sizes:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

Expected: Layout adapts properly to all screen sizes

**Step 4: Test browser compatibility**

If possible, test in:
- Chrome
- Firefox
- Safari
- Edge

Expected: Works in all modern browsers

**Step 5: Check for console errors**

Open browser console and test all features

Expected: No errors in console

**Step 6: Final commit**

If any fixes were needed:
```bash
git add .
git commit -m "fix: final polish and bug fixes"
```

---

## Task 12: Push and Deploy

**Step 1: Push all commits to remote**

Run:
```bash
git push -u origin claude/cartoon-animation-webapp-01As6Zn8AJ6v6kev2XfkLiXH
```

Expected: All commits pushed successfully

**Step 2: Merge to main branch**

If ready to deploy, merge feature branch to main:
```bash
git checkout main
git merge claude/cartoon-animation-webapp-01As6Zn8AJ6v6kev2XfkLiXH
git push origin main
```

Expected: GitHub Actions workflow triggers automatically

**Step 3: Enable GitHub Pages**

1. Go to repository Settings > Pages
2. Select "GitHub Actions" as the source
3. Wait for deployment to complete

Expected: Site deploys to `https://alabamamike.github.io/animated-fishstick/`

**Step 4: Verify live site**

Visit the deployed URL and test all functionality

Expected: Live site works identically to local development

---

## Success Criteria

✅ Users can select from 4 different themes
✅ Animations auto-play with sprite transitions
✅ Text-to-speech speaks dialogue (with graceful fallback)
✅ URL parameters allow direct theme linking
✅ Share button copies shareable URL
✅ Mobile responsive design
✅ Deployed to GitHub Pages
✅ No console errors
✅ Fast load time (< 3 seconds)

## Notes for Implementation

- **Sprites**: Currently using colored placeholder boxes. Replace with actual PNG sprites in `public/sprites/` when available.
- **TTS**: Web Speech API support varies by browser. The app handles this gracefully.
- **Timing**: Each dialogue line shows for 2.5 seconds. Adjust in `AnimationPlayer.jsx` if needed.
- **Themes**: Add more themes by extending `dialogues.js` and adding corresponding sprites.

## Estimated Time

- Tasks 1-3: 30 minutes (setup and data)
- Tasks 4-7: 2 hours (component development)
- Task 8: 30 minutes (integration)
- Tasks 9-12: 45 minutes (deployment and testing)

**Total**: ~4 hours for experienced developer
