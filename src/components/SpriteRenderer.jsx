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
