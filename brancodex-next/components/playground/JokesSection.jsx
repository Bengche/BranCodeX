/**
 * components/playground/JokesSection.jsx
 *
 * Fetches a random joke from the Official Joke API on button click.
 * 'use client' — button interaction + fetch.
 */

"use client";

import { useState } from "react";

const API_URL = "https://official-joke-api.appspot.com/random_joke";

export default function JokesSection() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchJoke() {
    setLoading(true);
    setError("");
    setJoke(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setJoke(data);
    } catch {
      setError("Could not fetch a joke. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="jokes-section">
      <div className="jokes-inner">
        <h2 className="section-title">Random Joke Generator</h2>
        <p className="jokes-intro">
          Sometimes you need a laugh. Hit the button for a fresh joke.
        </p>

        <button
          type="button"
          className="jokes-btn"
          onClick={fetchJoke}
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="fa fa-spinner fa-spin"></i> Fetching...
            </>
          ) : (
            <>
              <i className="fa fa-dice"></i> Get a joke
            </>
          )}
        </button>

        {error && (
          <p className="jokes-error" role="alert">
            {error}
          </p>
        )}

        {joke && (
          <div className="joke-card" aria-live="polite">
            <p className="joke-setup">{joke.setup}</p>
            <p className="joke-punchline">{joke.punchline}</p>
          </div>
        )}
      </div>
    </section>
  );
}
