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
