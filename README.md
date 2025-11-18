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
