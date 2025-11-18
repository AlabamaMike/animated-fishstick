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
