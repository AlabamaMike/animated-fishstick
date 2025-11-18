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
