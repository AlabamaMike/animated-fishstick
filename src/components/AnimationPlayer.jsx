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
