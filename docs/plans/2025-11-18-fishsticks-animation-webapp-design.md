# Fishsticks Joke Animation Webapp - Design Document

**Date:** 2025-11-18
**Project:** Animated Fishstick Cartoon Generator

## Overview

A single-page webapp that generates themed cartoon animations of the classic "Do you like fishsticks?" joke. Users select from preset themes (Classic, Pirates, Space, Fantasy) and watch an auto-playing sprite-based animation with text-to-speech audio. Animations are shareable via URL.

## High-Level Architecture & User Flow

### Architecture
- **Single Page Application (SPA)** built with React
- **Static hosting** (GitHub Pages, Netlify, or Vercel)
- **No backend** - all logic runs client-side in the browser
- **URL-based state** - Selected theme encoded in URL parameters for sharing

### User Flow
1. User lands on homepage with title and theme selector
2. User picks a theme (Classic, Pirates, Space, or Fantasy)
3. Page updates URL with `?theme=pirates` and starts animation
4. Animation auto-plays through the full dialogue sequence with sprite transitions and TTS audio
5. When complete, user can replay, choose different theme, or copy shareable link

### Core Components
- `ThemeSelector` - Grid of theme cards to choose from
- `AnimationPlayer` - Container that orchestrates the sprite sequence
- `DialogueDisplay` - Shows current character dialogue with speech bubbles
- `SpriteRenderer` - Renders character/background sprites for current frame
- `ShareButton` - Copies current URL to clipboard

## Sprite System & Animation Mechanics

### Sprite Organization
```
/public/sprites/
  /classic/
    bg.png
    character1-idle.png
    character1-talking.png
    character2-idle.png
    character2-talking.png
  /pirates/
    bg.png
    character1-idle.png
    character1-talking.png
    character2-idle.png
    character2-talking.png
  /space/
    bg.png
    character1-idle.png
    character1-talking.png
    character2-idle.png
    character2-talking.png
  /fantasy/
    bg.png
    character1-idle.png
    character1-talking.png
    character2-idle.png
    character2-talking.png
```

Each theme includes:
- **Background sprite** - Static scene background
- **Character sprites** - 2 characters (interviewer/respondent), each with idle and talking states
- Simple PNG files with transparent backgrounds

### Animation Sequence

The fishsticks joke breaks down into 6 dialogue beats:

1. **Character 1:** "Do you like fishsticks?"
2. **Character 2:** "Yeah, I love fishsticks!"
3. **Character 1:** "Do you like putting fishsticks in your mouth?"
4. **Character 2:** "Yeah!"
5. **Character 1:** "What are you, a gay fish?"
6. **Character 2:** *confused reaction*

### Timing System
- Each dialogue line displays for ~2-3 seconds
- Active speaker shows "talking" sprite with bounce animation
- Inactive character shows "idle" sprite
- TTS speaks the line simultaneously
- Smooth fade transitions between frames

## Theme Variations & Dialogue Adaptation

### Classic Theme
- **Setting:** Simple living room or interview setup
- **Characters:** Generic interviewer and confident respondent
- **Dialogue:** Standard South Park fishsticks joke verbatim
- **Style:** Clean, simple sprites with minimal detail

### Pirates Theme
- **Setting:** Ship deck or tavern
- **Characters:** Pirate captain and crew member
- **Dialogue adapted:**
  - "Do ye like fishsticks, matey?"
  - "Aye, I love me fishsticks!"
  - "Do ye like puttin' fishsticks in yer mouth?"
  - "Aye!"
  - "What are ye, a gay fish?"
  - *confused arr*

### Space Theme
- **Setting:** Spaceship interior or alien planet
- **Characters:** Astronaut/alien interviewer and space explorer
- **Dialogue adapted:**
  - "Do you like space-fishsticks?"
  - "Affirmative, I love fishsticks!"
  - Uses sci-fi terminology while keeping the joke structure

### Fantasy Theme
- **Setting:** Castle or medieval tavern
- **Characters:** Wizard/knight and adventurer
- **Dialogue adapted:**
  - "Dost thou enjoy fishsticks?"
  - "Verily, I love fishsticks!"
  - Medieval/fantasy language style

Each theme maintains the core joke structure but adapts vocabulary and setting for immersion.

## Technical Implementation & State Management

### React Component Structure
```
App
├── ThemeSelector (landing page)
├── AnimationPlayer (main container)
│   ├── SpriteRenderer (displays bg + characters)
│   ├── DialogueDisplay (speech bubbles)
│   ├── AudioController (TTS management)
│   └── ProgressIndicator (shows current scene)
└── ShareButton
```

### State Management
- Use React `useState` and `useEffect` hooks (no Redux needed - simple state)
- Key state variables:
  - `currentTheme` - Selected theme from URL params
  - `currentFrame` - Which dialogue beat we're on (0-5)
  - `isPlaying` - Animation playback status
  - `dialogueData` - Loaded dialogue script for current theme

### Text-to-Speech Integration
- Use Web Speech API (`window.speechSynthesis`)
- Each dialogue line triggers TTS when frame appears
- Fallback handling for browsers without TTS support (show dialogue only)
- Optional: Let users mute TTS while keeping visual animation

### URL State
- Use React Router or simple `window.location.search`
- Format: `?theme=pirates`
- On load, read URL param and set initial theme
- Share button copies `window.location.href`

## Styling & Visual Design

### CSS Approach
- Use CSS Modules or styled-components for scoped styling
- Mobile-responsive design (works on phones and desktops)
- Simple, clean UI with focus on the animation

### Layout
- **Landing page:** Centered title "Fishsticks Joke Generator" with 4 theme cards in a grid
- **Animation view:** Full-screen sprite display with dialogue overlay at bottom
- **Theme cards:** Visual preview thumbnails with theme name

### Animation CSS
- Character sprites use CSS transforms for "talking" bounce effect
- Fade transitions between dialogue frames
- Speech bubbles: rounded corners, tail pointing to speaking character
- Smooth entrance/exit animations

### Color Scheme
Each theme has its own color palette:
- **Classic:** Neutral grays and whites
- **Pirates:** Ocean blues and wood browns
- **Space:** Deep purples and neon accents
- **Fantasy:** Greens and golds

### Typography
- Clean sans-serif for UI elements
- Theme-appropriate fonts for dialogue (monospace for space, serif for fantasy, etc.)

## Error Handling & Browser Compatibility

### Error Scenarios
- **Missing sprites:** Show placeholder if sprite fails to load (colored box with text)
- **TTS not supported:** Gracefully degrade to visual-only mode with notice
- **Invalid theme in URL:** Redirect to landing page with default theme selector
- **Network issues:** All assets bundled/cached, so works offline after first load

### Browser Compatibility
- **Target:** Modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- **TTS support:** Check for `window.speechSynthesis` availability
- **Fallbacks:** Provide visual-only experience if features unavailable

### Performance
- Lazy load sprite images per theme (don't load all themes upfront)
- Preload current theme's sprites before starting animation
- Keep sprite file sizes small (optimize PNGs, ~50-100KB each)
- Smooth 60fps animations using CSS transforms (GPU accelerated)

### User Experience
- Loading indicator while sprites load
- Replay button after animation completes
- "Back to themes" button to choose different theme
- Clear visual feedback for all interactions

## Testing & Deployment

### Testing Strategy
- **Manual testing:** Test each theme's animation sequence in different browsers
- **TTS testing:** Verify voice playback works and dialogue timing is correct
- **Mobile testing:** Ensure responsive layout works on various screen sizes
- **Share link testing:** Verify URL params correctly load themes when shared

### Development Workflow
1. Use Create React App or Vite for quick setup
2. Local dev server with hot reload
3. Test on localhost before deploying

### Deployment
- **Platform:** GitHub Pages (free, simple, perfect for static sites)
- **Process:**
  1. Build production bundle (`npm run build`)
  2. Deploy to `gh-pages` branch
  3. Enable GitHub Pages in repo settings
- **URL:** `https://alabamamike.github.io/animated-fishstick`
- **Updates:** Push to main branch, rebuild, redeploy

### Project Structure
```
/src
  /components (React components)
  /data (dialogue scripts JSON)
  /styles (CSS files)
  /utils (helper functions)
/public
  /sprites (theme sprite images)
  index.html
```

## Future Enhancements
(Optional, not in initial build)
- More themes (Western, Cyberpunk, Underwater, etc.)
- User-customizable dialogue
- Download animation as GIF
- Background music and sound effects
- Character customization within themes

## Success Criteria
- Users can select any of 4 themes and see a complete animation
- Animation plays smoothly with proper sprite transitions
- TTS audio speaks dialogue clearly (or degrades gracefully)
- Shareable links work correctly across devices
- Mobile responsive and works on common browsers
- Loads quickly (< 3 seconds initial load)
