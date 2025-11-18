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
