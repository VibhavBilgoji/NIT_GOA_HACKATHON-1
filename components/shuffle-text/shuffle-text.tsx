"use client";

import { useEffect, useRef, useState } from "react";

interface ShuffleTextProps {
  text: string;
  className?: string;
  duration?: number;
  charset?: string;
}

export function ShuffleText({
  text,
  className = "",
  duration = 2000,
  charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
}: ShuffleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isShuffling, setIsShuffling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const frameRef = useRef(0);

  const shuffleText = () => {
    setIsShuffling(true);
    frameRef.current = 0;

    const targetText = text;
    const iterations = Math.floor(duration / 30);
    const revealDelay = iterations / targetText.length;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      frameRef.current += 1;

      setDisplayText(
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";

            // Calculate when this character should be revealed
            const revealFrame = Math.floor(index * revealDelay);

            if (frameRef.current >= revealFrame + (iterations * 0.7)) {
              return char;
            }

            // Shuffle characters
            return charset[Math.floor(Math.random() * charset.length)];
          })
          .join("")
      );

      if (frameRef.current >= iterations) {
        setDisplayText(targetText);
        setIsShuffling(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, 30);
  };

  useEffect(() => {
    // Trigger shuffle on mount
    const timer = setTimeout(() => {
      shuffleText();
    }, 300);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text]);

  return (
    <span
      className={className}
      onMouseEnter={() => !isShuffling && shuffleText()}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      {displayText}
    </span>
  );
}
