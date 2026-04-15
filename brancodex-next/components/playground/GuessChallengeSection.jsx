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

const SOUND_CORRECT =
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_20fe5d7b46.mp3?filename=correct-2-46134.mp3";
const SOUND_WRONG =
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_fce676bfd6.mp3?filename=wrong-2-46134.mp3";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function playSound(url) {
  try {
    const audio = new Audio(url);
    audio.play();
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

  // ── Leaderboard save ─────────────────────────────────────────────────────

  const saveToLeaderboard = useCallback((name, score) => {
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
        `✅ Correct! Computer chose ${num} (${isEven ? "Even" : "Odd"})`,
      );
    } else {
      setGuessStreak(0);
      playSound(SOUND_WRONG);
      setGuessMsg(
        `❌ Wrong! Computer chose ${num} (${isEven ? "Even" : "Odd"})`,
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
        text: `⏰ Time's up! Capital: ${country.capital[0]} | Currency: ${Object.values(country.currencies)[0].name}`,
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
  }

  // ── Top 5 leaderboard ────────────────────────────────────────────────────

  const topFive = [...leaderboard]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      {/* Section intro header */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-14 text-center shadow-xl">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide animate-bounce">
            🎮 Logic Meets Geography
          </h2>
          <p className="text-lg md:text-xl font-light text-gray-300">
            Test your luck with numbers and sharpen your mind with capital &amp;
            currency challenges. Are you ready to conquer both worlds?
          </p>
        </div>
      </div>

      {/* Game card */}
      <div
        className="guess-challenge"
        style={{
          padding: "20px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="bg-white bg-opacity-95 rounded-xl shadow-2xl p-8 max-w-2xl w-full fade-in"
          style={{ boxShadow: "5px 5px 10px 0 rgba(0,0,0,0.7)" }}
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
              🎲 Guess &amp; Challenge 🌍
            </h1>
            <p className="text-lg text-gray-700">
              Test your luck and knowledge! Guess odd/even, then conquer the
              Capitals &amp; Currencies Challenge!
            </p>
          </div>

          {/* Leaderboard */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-indigo-700 mb-2">
              🏆 Leaderboard
            </h2>
            <div className="rounded bg-indigo-50 p-2 mb-2">
              {topFive.length === 0 && (
                <p className="text-gray-500 text-sm">No entries yet.</p>
              )}
              {topFive.map((entry, i) => (
                <div
                  key={i}
                  className="flex justify-between px-2 py-1 text-sm"
                  style={{ background: i % 2 === 0 ? "#f3f4f6" : "#e0e7ff" }}
                >
                  <span>
                    {i + 1}. {entry.name}
                  </span>
                  <span>{entry.score}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                High Score: <span className="font-bold">{highScore}</span>
              </span>
              {playerName && (
                <span>
                  Player: <span className="font-bold">{playerName}</span>
                </span>
              )}
            </div>
          </div>

          {/* ── SETUP ── */}
          {phase === PHASE.SETUP && (
            <div className="mb-6 text-center">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name"
                className="border p-2 rounded w-2/3 mb-4"
                onKeyDown={(e) => e.key === "Enter" && startGame()}
              />
              <br />
              <button
                onClick={startGame}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-bold transition"
              >
                Start Game
              </button>
            </div>
          )}

          {/* ── GUESS ── */}
          {phase === PHASE.GUESS && (
            <div>
              <h2 className="text-xl font-bold text-indigo-700 mb-2">
                Guess: Odd or Even?
              </h2>
              <div className="mb-2 text-gray-700">
                Round <strong>{guessRound}</strong> of 5
              </div>
              <div className="flex justify-center gap-6 mb-4">
                <button
                  onClick={() => handleGuess("odd")}
                  disabled={guessBusy || showProceed}
                  className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded font-bold transition"
                >
                  Odd
                </button>
                <button
                  onClick={() => handleGuess("even")}
                  disabled={guessBusy || showProceed}
                  className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-6 py-2 rounded font-bold transition"
                >
                  Even
                </button>
              </div>
              {guessMsg && (
                <p
                  className={`text-lg mb-2 font-semibold ${guessMsg.startsWith("✅") ? "text-green-700" : "text-red-600"}`}
                >
                  {guessMsg}
                </p>
              )}
              {guessStreak > 0 && !showProceed && (
                <p className="text-sm text-indigo-700 mb-2">
                  Current Streak: {guessStreak}
                </p>
              )}
              {showProceed && (
                <div className="text-center mt-4">
                  <p className="font-bold text-indigo-700 mb-3">
                    {guessResults.every(Boolean)
                      ? "🔥 Perfect streak! You unlocked bonuses!"
                      : "Guess rounds complete! Time for the challenge."}
                  </p>

                  {/* Continent picker — only shown on perfect streak */}
                  {guessResults.every(Boolean) && !continentPicked && (
                    <div className="mb-4">
                      <label className="font-semibold text-gray-700 mr-2">
                        Choose a continent:
                      </label>
                      <select
                        value={continent}
                        onChange={(e) => setContinent(e.target.value)}
                        className="border p-2 rounded mr-2"
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
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded font-bold transition"
                      >
                        Go
                      </button>
                    </div>
                  )}

                  {/* No perfect streak — go directly */}
                  {!guessResults.every(Boolean) && (
                    <button
                      onClick={() => goToChallenge(null)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-bold transition"
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
              <h2 className="text-xl font-bold text-indigo-700 mb-2">
                🌍 Capital &amp; Currency Challenge
              </h2>

              {/* Config info */}
              {challengeConfig && (
                <p
                  className={`mb-3 font-semibold text-sm ${perfectStreak ? "text-green-700" : "text-red-700"}`}
                >
                  {perfectStreak
                    ? "🔥 Perfect streak bonus! 30s, hints enabled, 2 pts per correct answer."
                    : "No perfect streak. 20s, no hints, 1 pt per correct answer."}
                </p>
              )}

              {loadingCountries && (
                <p className="text-indigo-600 font-semibold">
                  Loading countries…
                </p>
              )}

              {!loadingCountries &&
                countries.length > 0 &&
                challengeIdx < countries.length && (
                  <div>
                    {/* Timer */}
                    <p className="text-pink-700 font-bold mb-2">
                      ⏰ {timeLeft}s
                    </p>

                    {/* Country flag + name */}
                    <div className="flex items-center gap-4 mb-4">
                      {countries[challengeIdx].flags.png && (
                        <img
                          src={countries[challengeIdx].flags.png}
                          alt="Flag"
                          className="w-12 h-8 border rounded shadow"
                        />
                      )}
                      <span className="font-bold text-indigo-700 text-lg">
                        {countries[challengeIdx].name.common}
                      </span>
                    </div>

                    {/* Hint */}
                    {challengeConfig?.hints && !submitted && (
                      <p className="text-yellow-700 font-semibold mb-2">
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
                      <div className="mb-4">
                        <input
                          type="text"
                          value={capitalInput}
                          onChange={(e) => setCapitalInput(e.target.value)}
                          placeholder="Capital"
                          className="border p-2 rounded mb-2 w-full"
                          autoComplete="off"
                        />
                        <input
                          type="text"
                          value={currencyInput}
                          onChange={(e) => setCurrencyInput(e.target.value)}
                          placeholder="Currency"
                          className="border p-2 rounded mb-2 w-full"
                          autoComplete="off"
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            !submitted &&
                            handleSubmit(false)
                          }
                        />
                        <button
                          onClick={() => handleSubmit(false)}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold transition w-full"
                        >
                          Submit
                        </button>
                      </div>
                    )}

                    {/* Result */}
                    {challengeResult && (
                      <div className="mb-4">
                        {challengeResult.parts.map((p, i) => (
                          <div
                            key={i}
                            className={`px-3 py-1 rounded mb-1 text-white font-semibold ${p.ok ? "bg-green-500" : "bg-red-500"}`}
                          >
                            {p.text}
                          </div>
                        ))}
                        <div className="mt-2 flex items-center gap-2 text-gray-800">
                          {challengeResult.flag && (
                            <img
                              src={challengeResult.flag}
                              alt="Flag"
                              className="w-10 h-7 border rounded shadow"
                            />
                          )}
                          <span className="font-bold">
                            {challengeResult.countryName}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1">
                          Capital: <strong>{challengeResult.capital}</strong> |
                          Currency: <strong>{challengeResult.currency}</strong>
                        </p>
                        <button
                          onClick={nextChallenge}
                          className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-bold transition"
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
            <div className="text-center">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                🎉 Game Over!
              </h2>
              <p className="text-lg font-bold text-indigo-700 mb-4">
                Final Score: {finalScore}
              </p>
              <button
                onClick={resetAll}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-bold transition"
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
