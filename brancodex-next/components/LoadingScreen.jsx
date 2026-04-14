"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 1200);
    const t2 = setTimeout(() => setVisible(false), 1750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`loading-screen${fadeOut ? " loading-screen--fade" : ""}`}
      aria-hidden="true"
    >
      <div className="loading-logo">
        <span className="bran">Bran</span>
        <span className="code">Code</span>
        <span className="x">X</span>
      </div>
      <p className="loading-tagline">Building the Future, One Line at a Time</p>
      <div className="loading-bar-outer">
        <div className="loading-bar-inner" />
      </div>
    </div>
  );
}
