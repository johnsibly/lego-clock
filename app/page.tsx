"use client";

import { useState, useEffect } from "react";

// Digit patterns: 6 columns x 12 rows (full-width), colon 2 columns x 12 rows
const DIGIT_PATTERNS: Record<string, number[][]> = {
  "0": [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
  ],
  "1": [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
  ],
  "2": [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
  ],
  "3": [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],,
    [0, 0, 0, 0, 0, 0],
  ],
  "4": [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0],
  ],
  "5": [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
  ],
  "6": [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
  ],
  "7": [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0],
  ],
  "8": [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
  ],
  "9": [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
  ],
  ":": [
    [0, 0],
    [0, 0],
    [0, 0],
    [1, 1],
    [1, 1],
    [0, 0],
    [0, 0],
    [1, 1],
    [1, 1],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  "spacer": [
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
  ],
};

// Single LEGO stud component
function LegoStud({ isActive }: { isActive: boolean }) {
  const baseColor = isActive ? "#c4281c" : "#1a1a1a";
  const highlightColor = isActive ? "#e8503a" : "#2d2d2d";
  const shadowColor = isActive ? "#8b1c14" : "#0a0a0a";
  const studTopColor = isActive ? "#d63a2e" : "#222222";
  const logoColor = isActive ? "#a82218" : "#151515";

  return (
    <div
      className="lego-stud"
      style={{
        width: "var(--stud-size)",
        height: "var(--stud-size)",
        backgroundColor: baseColor,
        position: "relative",
        boxShadow: `
          inset 2px 2px 0 ${highlightColor},
          inset -2px -2px 0 ${shadowColor}
        `,
      }}
    >
      {/* The circular stud on top */}
      <div
        className="stud-circle"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "65%",
          height: "65%",
          borderRadius: "50%",
          backgroundColor: studTopColor,
          boxShadow: `
            inset 2px 2px 4px ${highlightColor},
            inset -2px -2px 4px ${shadowColor},
            0 2px 4px rgba(0,0,0,0.5)
          `,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* LEGO logo text */}
        <span
          style={{
            fontSize: "calc(var(--stud-size) * 0.12)",
            fontWeight: "900",
            fontFamily: "Arial Black, Arial, sans-serif",
            color: logoColor,
            letterSpacing: "-0.3px",
            textShadow: `0 0.5px 0 ${highlightColor}`,
            userSelect: "none",
          }}
        >
          LEGO
        </span>
      </div>
    </div>
  );
}

// Render a single digit or colon
function LegoCharacter({ char }: { char: string }) {
  const pattern = DIGIT_PATTERNS[char];
  if (!pattern) return null;

  return (
    <div className="lego-character">
      {pattern.map((row, rowIndex) => (
        <div key={rowIndex} className="lego-row">
          {row.map((cell, colIndex) => (
            <LegoStud key={colIndex} isActive={cell === 1} />
          ))}
        </div>
      ))}
    </div>
  );
}

// Main clock component
function LegoClock() {
  const [time, setTime] = useState<string>("");
  const [studSize, setStudSize] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTime(` ${hours}:${minutes}:${seconds} `);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const calculateStudSize = () => {
      // Total bricks: 6 digits (6 wide each) + 2 colons (2 wide each) + 7 spacers (1 wide each)
      // = 36 + 4 + 7 = 47 bricks
      // Plus padding: 0.75 * 2 = 1.5 stud-sizes, plus container padding (40px)
      const totalBricks = 47;
      const paddingBricks = 1.5;
      const containerPadding = 40; // 20px on each side
      const availableWidth = window.innerWidth - containerPadding;
      const size = availableWidth / (totalBricks + paddingBricks);
      setStudSize(size);
    };

    calculateStudSize();
  }, []);

  if (!time || studSize === null) return null;

  // Build display with spacers between all characters
  const displayChars: string[] = [];
  time.split("").forEach((char, index) => {
    if (char!=' ') {
      if (index > 0) {
        displayChars.push("spacer");
      }
      displayChars.push(char);
    }
  });

  return (
    <div className="lego-clock" style={{ "--stud-size": `${studSize}px` } as React.CSSProperties}>
      {displayChars.map((char, index) => (
        <LegoCharacter key={index} char={char} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="lego-container">
      <LegoClock />
    </div>
  );
}
