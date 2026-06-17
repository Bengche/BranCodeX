/**
 * components/playground/GuessChallengeSection.jsx
 *
 * "Guess & Challenge" game ported from the original playground.html.
 * Phase 1 — Odd/Even guessing (5 rounds).
 * Phase 2 — Capital & Currency challenge (3 countries).
 *
 * Perfect streak (5/5) unlocks: 30s, hints, 2pts, continent picker.
 * Otherwise: 20s, no hints, 1pt, random countries.
 */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import GlobalLeaderboard from "./GlobalLeaderboard";

// ─── Backend ──────────────────────────────────────────────────────────────────

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

async function fetchGCBoard() {
  const res = await fetch(`${BACKEND_URL}/api/leaderboard/guess-challenge`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  const data = await res.json();
  return data.leaderboard;
}

async function submitGCScore(player, score) {
  const res = await fetch(`${BACKEND_URL}/api/leaderboard/guess-challenge`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player, score }),
  });
  if (!res.ok) throw new Error("Failed to submit score");
  return res.json();
}

// ─── Static country data (fallback when API is unavailable) ──────────────────

const STATIC_COUNTRIES = [
  {
    name: { common: "France" },
    capital: ["Paris"],
    currencies: { EUR: { name: "Euro" } },
    flags: { png: "https://flagcdn.com/w320/fr.png" },
    region: "Europe",
  },
  {
    name: { common: "Nigeria" },
    capital: ["Abuja"],
    currencies: { NGN: { name: "Nigerian naira" } },
    flags: { png: "https://flagcdn.com/w320/ng.png" },
    region: "Africa",
  },
  {
    name: { common: "Brazil" },
    capital: ["Brasília"],
    currencies: { BRL: { name: "Brazilian real" } },
    flags: { png: "https://flagcdn.com/w320/br.png" },
    region: "Americas",
  },
  {
    name: { common: "Japan" },
    capital: ["Tokyo"],
    currencies: { JPY: { name: "Japanese yen" } },
    flags: { png: "https://flagcdn.com/w320/jp.png" },
    region: "Asia",
  },
  {
    name: { common: "Australia" },
    capital: ["Canberra"],
    currencies: { AUD: { name: "Australian dollar" } },
    flags: { png: "https://flagcdn.com/w320/au.png" },
    region: "Oceania",
  },
  {
    name: { common: "Canada" },
    capital: ["Ottawa"],
    currencies: { CAD: { name: "Canadian dollar" } },
    flags: { png: "https://flagcdn.com/w320/ca.png" },
    region: "Americas",
  },
  {
    name: { common: "Egypt" },
    capital: ["Cairo"],
    currencies: { EGP: { name: "Egyptian pound" } },
    flags: { png: "https://flagcdn.com/w320/eg.png" },
    region: "Africa",
  },
  {
    name: { common: "India" },
    capital: ["New Delhi"],
    currencies: { INR: { name: "Indian rupee" } },
    flags: { png: "https://flagcdn.com/w320/in.png" },
    region: "Asia",
  },
  {
    name: { common: "Germany" },
    capital: ["Berlin"],
    currencies: { EUR: { name: "Euro" } },
    flags: { png: "https://flagcdn.com/w320/de.png" },
    region: "Europe",
  },
  {
    name: { common: "South Africa" },
    capital: ["Pretoria"],
    currencies: { ZAR: { name: "South African rand" } },
    flags: { png: "https://flagcdn.com/w320/za.png" },
    region: "Africa",
  },
  {
    name: { common: "Argentina" },
    capital: ["Buenos Aires"],
    currencies: { ARS: { name: "Argentine peso" } },
    flags: { png: "https://flagcdn.com/w320/ar.png" },
    region: "Americas",
  },
  {
    name: { common: "China" },
    capital: ["Beijing"],
    currencies: { CNY: { name: "Chinese yuan" } },
    flags: { png: "https://flagcdn.com/w320/cn.png" },
    region: "Asia",
  },
  {
    name: { common: "Italy" },
    capital: ["Rome"],
    currencies: { EUR: { name: "Euro" } },
    flags: { png: "https://flagcdn.com/w320/it.png" },
    region: "Europe",
  },
  {
    name: { common: "New Zealand" },
    capital: ["Wellington"],
    currencies: { NZD: { name: "New Zealand dollar" } },
    flags: { png: "https://flagcdn.com/w320/nz.png" },
    region: "Oceania",
  },
  {
    name: { common: "Russia" },
    capital: ["Moscow"],
    currencies: { RUB: { name: "Russian ruble" } },
    flags: { png: "https://flagcdn.com/w320/ru.png" },
    region: "Europe",
  },
  {
    name: { common: "Mexico" },
    capital: ["Mexico City"],
    currencies: { MXN: { name: "Mexican peso" } },
    flags: { png: "https://flagcdn.com/w320/mx.png" },
    region: "Americas",
  },
  {
    name: { common: "Kenya" },
    capital: ["Nairobi"],
    currencies: { KES: { name: "Kenyan shilling" } },
    flags: { png: "https://flagcdn.com/w320/ke.png" },
    region: "Africa",
  },
  {
    name: { common: "Spain" },
    capital: ["Madrid"],
    currencies: { EUR: { name: "Euro" } },
    flags: { png: "https://flagcdn.com/w320/es.png" },
    region: "Europe",
  },
  {
    name: { common: "Turkey" },
    capital: ["Ankara"],
    currencies: { TRY: { name: "Turkish lira" } },
    flags: { png: "https://flagcdn.com/w320/tr.png" },
    region: "Asia",
  },
  {
    name: { common: "United Kingdom" },
    capital: ["London"],
    currencies: { GBP: { name: "Pound sterling" } },
    flags: { png: "https://flagcdn.com/w320/gb.png" },
    region: "Europe",
  },
];

// Web Audio tones — no external CDN needed
const SOUND_CORRECT = "correct";
const SOUND_WRONG = "wrong";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.value = 0.15;
    if (type === "correct") {
      osc.frequency.value = 880;
      osc.type = "sine";
    } else {
      osc.frequency.value = 220;
      osc.type = "sawtooth";
    }
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch (_) {}
}

// ─── Phases ───────────────────────────────────────────────────────────────────

const PHASE = {
  SETUP: "setup",
  GUESS: "guess",
  CHALLENGE: "challenge",
  FINAL: "final",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function GuessChallengeSection() {
  // --- top-level state ---
  const [phase, setPhase] = useState(PHASE.SETUP);
  const [playerName, setPlayerName] = useState("");
  const [nameInput, setNameInput] = useState("");

  // leaderboard
  const [leaderboard, setLeaderboard] = useState([]);
  const [highScore, setHighScore] = useState(0);

  // --- guess phase ---
  const [guessRound, setGuessRound] = useState(1);
  const [guessStreak, setGuessStreak] = useState(0);
  const [guessResults, setGuessResults] = useState([]);
  const [guessMsg, setGuessMsg] = useState("");
  const [guessBusy, setGuessBusy] = useState(false);
  const [showProceed, setShowProceed] = useState(false);

  // --- challenge phase ---
  const [challengeConfig, setChallengeConfig] = useState(null); // { hints, points, maxTime }
  const [countries, setCountries] = useState([]);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [challengeScore, setChallengeScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [capitalInput, setCapitalInput] = useState("");
  const [currencyInput, setCurrencyInput] = useState("");
  const [challengeResult, setChallengeResult] = useState(null); // null | { html, flag, country, capital, currency }
  const [submitted, setSubmitted] = useState(false);
  const [continent, setContinent] = useState("Africa");
  const [continentPicked, setContinentPicked] = useState(false);
  const [perfectStreak, setPerfectStreak] = useState(false);
  const [loadingCountries, setLoadingCountries] = useState(false);

  // --- final ---
  const [finalScore, setFinalScore] = useState(0);

  // --- global leaderboard ---
  const [globalBoard, setGlobalBoard] = useState([]);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalError, setGlobalError] = useState(false);
  const [madeTopTen, setMadeTopTen] = useState(false);

  const timerRef = useRef(null);
  const scoreRef = useRef(0); // track score synchronously for end-of-timer

  // ── Load persisted data on mount ─────────────────────────────────────────

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("guessChallengeLeaderboard") || "[]",
      );
      setLeaderboard(saved);
      setHighScore(
        Number(localStorage.getItem("guessChallengeHighScore") || 0),
      );
    } catch (_) {}
  }, []);

  // ── Global leaderboard load ───────────────────────────────────────────────

  useEffect(() => {
    loadGlobalBoard();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadGlobalBoard() {
    setGlobalLoading(true);
    setGlobalError(false);
    try {
      const data = await fetchGCBoard();
      setGlobalBoard(data);
    } catch {
      setGlobalError(true);
    } finally {
      setGlobalLoading(false);
    }
  }

  // ── Leaderboard save (local + global) ────────────────────────────────────

  const saveToLeaderboard = useCallback((name, score) => {
    // Local device leaderboard
    setLeaderboard((prev) => {
      const updated = [...prev, { name, score }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      try {
        localStorage.setItem(
          "guessChallengeLeaderboard",
          JSON.stringify(updated),
        );
      } catch (_) {}
      return updated;
    });
    setHighScore((prev) => {
      const next = Math.max(prev, score);
      try {
        localStorage.setItem("guessChallengeHighScore", String(next));
      } catch (_) {}
      return next;
    });

    // Global leaderboard — non-fatal if it fails
    submitGCScore(name, score)
      .then((resp) => {
        setGlobalBoard(resp.leaderboard);
        setMadeTopTen(resp.madeTopTen);
      })
      .catch(() => {});
  }, []);

  // ── Timer management ─────────────────────────────────────────────────────

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  // ── Phase: START ─────────────────────────────────────────────────────────

  function startGame() {
    const name = nameInput.trim() || "Player";
    setPlayerName(name);
    setGuessRound(1);
    setGuessStreak(0);
    setGuessResults([]);
    setGuessMsg("");
    setGuessBusy(false);
    setShowProceed(false);
    setPhase(PHASE.GUESS);
  }

  // ── Phase: GUESS ─────────────────────────────────────────────────────────

  function handleGuess(pick) {
    if (guessBusy) return;
    setGuessBusy(true);
    const num = Math.floor(Math.random() * 100) + 1;
    const isEven = num % 2 === 0;
    const correct = (pick === "even" && isEven) || (pick === "odd" && !isEven);

    setGuessResults((prev) => {
      const next = [...prev, correct];
      return next;
    });

    if (correct) {
      setGuessStreak((s) => s + 1);
      playSound(SOUND_CORRECT);
      setGuessMsg(
        `Correct! Computer chose ${num} (${isEven ? "Even" : "Odd"})`,
      );
    } else {
      setGuessStreak(0);
      playSound(SOUND_WRONG);
      setGuessMsg(
        `Incorrect. Computer chose ${num} (${isEven ? "Even" : "Odd"})`,
      );
    }

    setTimeout(() => {
      setGuessBusy(false);
      setGuessMsg("");
      if (guessRound < 5) {
        setGuessRound((r) => r + 1);
      } else {
        setShowProceed(true);
      }
    }, 1200);
  }

  // ── Phase: CHALLENGE setup ────────────────────────────────────────────────

  async function goToChallenge(pickedContinent) {
    clearTimer();
    const isPerfect = guessResults.length === 5 && guessResults.every(Boolean);
    setPerfectStreak(isPerfect);
    const config = isPerfect
      ? { hints: true, points: 2, maxTime: 30 }
      : { hints: false, points: 1, maxTime: 20 };
    setChallengeConfig(config);
    setChallengeIdx(0);
    setChallengeScore(0);
    scoreRef.current = 0;
    setChallengeResult(null);
    setSubmitted(false);
    setCapitalInput("");
    setCurrencyInput("");
    setLoadingCountries(true);
    setPhase(PHASE.CHALLENGE);

    let pool = STATIC_COUNTRIES;
    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/capital",
      );
      const data = await res.json();
      const mapped = data.data
        .map((c) => {
          const match = STATIC_COUNTRIES.find(
            (s) => s.name.common.toLowerCase() === c.name.toLowerCase(),
          );
          return (
            match || {
              name: { common: c.name },
              capital: [c.capital || "Unknown"],
              currencies: { CUR: { name: "Unknown" } },
              flags: { png: "" },
              region: "Unknown",
            }
          );
        })
        .filter(
          (c) =>
            c.capital[0] !== "Unknown" &&
            c.flags.png &&
            Object.values(c.currencies)[0].name !== "Unknown",
        );
      if (mapped.length > 0) pool = mapped;
    } catch (_) {
      // fallback already set
    }

    let filtered = pool;
    if (isPerfect && pickedContinent) {
      const byContinent = pool.filter((c) => c.region === pickedContinent);
      if (byContinent.length >= 3) filtered = byContinent;
    }

    const picked = shuffleArr(filtered).slice(0, 3);
    setCountries(picked);
    setLoadingCountries(false);
  }

  // ── Challenge question effect ─────────────────────────────────────────────

  useEffect(() => {
    if (phase !== PHASE.CHALLENGE || loadingCountries || countries.length === 0)
      return;
    if (challengeIdx >= countries.length) {
      endGame();
      return;
    }
    clearTimer();
    setSubmitted(false);
    setChallengeResult(null);
    setCapitalInput("");
    setCurrencyInput("");
    setTimeLeft(challengeConfig.maxTime);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          handleSubmit(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearTimer();
  }, [phase, countries, challengeIdx, loadingCountries]);

  function handleSubmit(timeout = false) {
    clearTimer();
    setSubmitted(true);
    const country = countries[challengeIdx];
    if (!country) return;
    const correctCapital = country.capital[0].toLowerCase();
    const correctCurrency = Object.values(
      country.currencies,
    )[0].name.toLowerCase();

    let earned = 0;
    const parts = [];

    if (!timeout) {
      const capOk = capitalInput.trim().toLowerCase() === correctCapital;
      const curOk = currencyInput.trim().toLowerCase() === correctCurrency;
      if (capOk) {
        earned += challengeConfig.points;
        parts.push({ text: "Capital: Correct! ✅", ok: true });
        playSound(SOUND_CORRECT);
      } else {
        parts.push({
          text: `Capital: Wrong! Correct: ${country.capital[0]}`,
          ok: false,
        });
        playSound(SOUND_WRONG);
      }
      if (curOk) {
        earned += challengeConfig.points;
        parts.push({ text: "Currency: Correct! ✅", ok: true });
        playSound(SOUND_CORRECT);
      } else {
        parts.push({
          text: `Currency: Wrong! Correct: ${Object.values(country.currencies)[0].name}`,
          ok: false,
        });
        playSound(SOUND_WRONG);
      }
    } else {
      parts.push({
        text: `Time is up. Capital: ${country.capital[0]} | Currency: ${Object.values(country.currencies)[0].name}`,
        ok: false,
      });
      playSound(SOUND_WRONG);
    }

    scoreRef.current += earned;
    setChallengeScore((s) => s + earned);
    setChallengeResult({
      parts,
      flag: country.flags.png,
      countryName: country.name.common,
      capital: country.capital[0],
      currency: Object.values(country.currencies)[0].name,
    });
  }

  function nextChallenge() {
    setChallengeIdx((i) => i + 1);
  }

  function endGame() {
    clearTimer();
    setFinalScore(scoreRef.current);
    saveToLeaderboard(playerName, scoreRef.current);
    setPhase(PHASE.FINAL);
  }

  function resetAll() {
    clearTimer();
    setPhase(PHASE.SETUP);
    setNameInput("");
    setGuessRound(1);
    setGuessStreak(0);
    setGuessResults([]);
    setGuessMsg("");
    setGuessBusy(false);
    setShowProceed(false);
    setChallengeConfig(null);
    setCountries([]);
    setChallengeIdx(0);
    setChallengeScore(0);
    scoreRef.current = 0;
    setChallengeResult(null);
    setSubmitted(false);
    setCapitalInput("");
    setCurrencyInput("");
    setContinent("Africa");
    setContinentPicked(false);
    setLoadingCountries(false);
    setMadeTopTen(false);
  }

  // ── Top 5 local leaderboard ───────────────────────────────────────────────

  const topFive = [...leaderboard]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      {/* Section intro header */}
      <div className="guess-section-hero">
        <div className="guess-section-hero-inner">
          <h2>Logic Meets Geography</h2>
          <p>
            Test your instincts with odd-or-even rounds, then move into a fast
            capital and currency challenge.
          </p>
        </div>
      </div>

      {/* Game card */}
      <div className="guess-challenge">
        <div className="guess-card fade-in">
          {/* Header */}
          <div className="guess-header">
            <h1>Guess &amp; Challenge</h1>
            <p>
              Guess odd or even, then prove your geography knowledge across
              timed challenge rounds.
            </p>
          </div>

          {/* Local device leaderboard — compact top 5 */}
          <div className="guess-local-board">
            <h2 className="guess-local-board-title">
              <i className="fa fa-laptop" /> This Device — Top 5
            </h2>
            <div className="guess-local-board-card">
              {topFive.length === 0 && (
                <p className="guess-local-empty">No entries yet.</p>
              )}
              {topFive.map((entry, i) => (
                <div key={i} className="guess-local-row">
                  <span>
                    {i + 1}. {entry.name}
                  </span>
                  <span className="guess-local-score">{entry.score}</span>
                </div>
              ))}
            </div>
            <div className="guess-local-meta">
              <span>
                Personal best:{" "}
                <span className="guess-local-meta-val">{highScore}</span>
              </span>
              {playerName && (
                <span>
                  Playing as:{" "}
                  <span className="guess-local-meta-val">{playerName}</span>
                </span>
              )}
            </div>
          </div>

          {/* Global leaderboard */}
          <GlobalLeaderboard
            board={globalBoard}
            loading={globalLoading}
            error={globalError}
            onRefresh={loadGlobalBoard}
            madeTopTen={phase === PHASE.FINAL && madeTopTen}
          />

          {/* ── SETUP ── */}
          {phase === PHASE.SETUP && (
            <div className="guess-setup">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name"
                className="guess-input"
                onKeyDown={(e) => e.key === "Enter" && startGame()}
              />
              <button
                onClick={startGame}
                className="guess-btn guess-btn--primary"
              >
                Start Game
              </button>
            </div>
          )}

          {/* ── GUESS ── */}
          {phase === PHASE.GUESS && (
            <div>
              <h2 className="guess-phase-title">Guess: Odd or Even?</h2>
              <div className="guess-phase-sub">
                Round <strong>{guessRound}</strong> of 5
              </div>
              <div className="guess-round-actions">
                <button
                  onClick={() => handleGuess("odd")}
                  disabled={guessBusy || showProceed}
                  className="guess-btn guess-btn--secondary"
                >
                  Odd
                </button>
                <button
                  onClick={() => handleGuess("even")}
                  disabled={guessBusy || showProceed}
                  className="guess-btn guess-btn--success"
                >
                  Even
                </button>
              </div>
              {guessMsg && (
                <p
                  className={`guess-round-message ${guessMsg.startsWith("Correct") ? "guess-round-message--ok" : "guess-round-message--bad"}`}
                >
                  {guessMsg}
                </p>
              )}
              {guessStreak > 0 && !showProceed && (
                <p className="guess-streak-msg">
                  Current Streak: {guessStreak}
                </p>
              )}
              {showProceed && (
                <div className="guess-proceed">
                  <p className="guess-proceed-title">
                    {guessResults.every(Boolean)
                      ? "Perfect streak. Bonus mode unlocked."
                      : "Guess rounds complete! Time for the challenge."}
                  </p>

                  {/* Continent picker — only shown on perfect streak */}
                  {guessResults.every(Boolean) && !continentPicked && (
                    <div className="guess-continent-picker">
                      <label className="guess-continent-label">
                        Choose a continent:
                      </label>
                      <select
                        value={continent}
                        onChange={(e) => setContinent(e.target.value)}
                        className="guess-select"
                      >
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                      </select>
                      <button
                        onClick={() => {
                          setContinentPicked(true);
                          goToChallenge(continent);
                        }}
                        className="guess-btn guess-btn--primary"
                      >
                        Go
                      </button>
                    </div>
                  )}

                  {/* No perfect streak — go directly */}
                  {!guessResults.every(Boolean) && (
                    <button
                      onClick={() => goToChallenge(null)}
                      className="guess-btn guess-btn--primary"
                    >
                      Go to Challenge
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── CHALLENGE ── */}
          {phase === PHASE.CHALLENGE && (
            <div>
              <h2 className="guess-phase-title">
                Capital &amp; Currency Challenge
              </h2>

              {/* Config info */}
              {challengeConfig && (
                <p
                  className={`guess-config-note ${perfectStreak ? "guess-config-note--ok" : "guess-config-note--warn"}`}
                >
                  {perfectStreak
                    ? "Bonus mode: 30s, hints enabled, 2 points per correct answer."
                    : "No perfect streak. 20s, no hints, 1 pt per correct answer."}
                </p>
              )}

              {loadingCountries && (
                <p className="guess-loading-msg">Loading countries…</p>
              )}

              {!loadingCountries &&
                countries.length > 0 &&
                challengeIdx < countries.length && (
                  <div>
                    {/* Timer */}
                    <p className="guess-timer">{timeLeft}s remaining</p>

                    {/* Country flag + name */}
                    <div className="guess-country-row">
                      {countries[challengeIdx].flags.png && (
                        <img
                          src={countries[challengeIdx].flags.png}
                          alt="Flag"
                          className="guess-country-flag"
                        />
                      )}
                      <span className="guess-country-name">
                        {countries[challengeIdx].name.common}
                      </span>
                    </div>

                    {/* Hint */}
                    {challengeConfig?.hints && !submitted && (
                      <p className="guess-hint-msg">
                        Hint: Capital starts with{" "}
                        <strong>
                          {countries[challengeIdx].capital[0].charAt(0)}
                        </strong>
                        , Currency starts with{" "}
                        <strong>
                          {Object.values(
                            countries[challengeIdx].currencies,
                          )[0].name.charAt(0)}
                        </strong>
                      </p>
                    )}

                    {/* Inputs */}
                    {!submitted && (
                      <div className="guess-inputs-wrap">
                        <input
                          type="text"
                          value={capitalInput}
                          onChange={(e) => setCapitalInput(e.target.value)}
                          placeholder="Capital"
                          className="guess-input"
                          autoComplete="off"
                        />
                        <input
                          type="text"
                          value={currencyInput}
                          onChange={(e) => setCurrencyInput(e.target.value)}
                          placeholder="Currency"
                          className="guess-input"
                          autoComplete="off"
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            !submitted &&
                            handleSubmit(false)
                          }
                        />
                        <button
                          onClick={() => handleSubmit(false)}
                          className="guess-btn guess-btn--success guess-btn--block"
                        >
                          Submit
                        </button>
                      </div>
                    )}

                    {/* Result */}
                    {challengeResult && (
                      <div className="guess-result-wrap">
                        {challengeResult.parts.map((p, i) => (
                          <div
                            key={i}
                            className={`guess-result-pill ${p.ok ? "guess-result-pill--ok" : "guess-result-pill--bad"}`}
                          >
                            {p.text}
                          </div>
                        ))}
                        <div className="guess-country-summary">
                          {challengeResult.flag && (
                            <img
                              src={challengeResult.flag}
                              alt="Flag"
                              className="guess-country-flag guess-country-flag--small"
                            />
                          )}
                          <span className="guess-country-summary-name">
                            {challengeResult.countryName}
                          </span>
                        </div>
                        <p className="guess-country-summary-meta">
                          Capital: <strong>{challengeResult.capital}</strong> |
                          Currency: <strong>{challengeResult.currency}</strong>
                        </p>
                        <button
                          onClick={nextChallenge}
                          className="guess-btn guess-btn--primary"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}

          {/* ── FINAL ── */}
          {phase === PHASE.FINAL && (
            <div className="guess-final">
              <h2 className="guess-final-title">Game Complete</h2>
              <p className="guess-final-score">Final Score: {finalScore}</p>
              <button
                onClick={resetAll}
                className="guess-btn guess-btn--primary"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
