import React, { useEffect, useState } from "react";
import "./style.scss";

/**
 * A panel whose background rolls through a list of images with a crossfade.
 * Children render on top of the images. Rotation pauses on hover/focus and
 * is disabled for visitors who prefer reduced motion.
 * All styling lives in RollingPanel.scss.
 */
export default ({
  images = [],
  interval = 5000, // ms each image stays up
  // fade = 1200, // ms crossfade duration
  children,
}: any) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (paused || reduceMotion || images.length < 2) return ()=>{};
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      interval
    );
    return () => clearInterval(id);
  }, [paused, reduceMotion, images.length, interval]);

  return (
    <div className="carousal-animated">
        <section
        className="rolling-panel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        >
        {images.map((src:string, i:number) => (
            <div
            key={src}
            aria-hidden="true"
            className={`rolling-panel__slide${i === index ? " is-active" : ""}`}
            style={{ backgroundImage: `url(${src})` }}
            />
        ))}

        <div className="rolling-panel__scrim" />

        <div className="rolling-panel__content">{children}</div>

        <div
            className="rolling-panel__dots"
            role="tablist"
            aria-label="Background image"
        >
            {images.map((_, i) => (
            <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Show image ${i + 1}`}
                className={`rolling-panel__dot${i === index ? " is-active" : ""}`}
                onClick={() => setIndex(i)}
            />
            ))}
        </div>
        </section>
    </div>
  );
};
