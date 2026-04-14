/**
 * components/playground/QuizSection.jsx
 *
 * Full quiz game ported from the original playground.js.
 * 'use client' — all interactive (timers, state, localStorage).
 *
 * Questions come from:
 *  1. OpenTDB API (General Knowledge, Science, History, etc.)
 *  2. Custom Cameroon History questions (50)
 *  3. Custom Riddles (20)
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  cameroonHistoryQuestions,
  riddlesQuestions,
  apiCategories,
  TOTAL_QUESTIONS,
  DIFFICULTY,
} from '../../data/quizData';

// ─── Sound URLs (royalty-free, from Pixabay CDN) ──────────────────────────────

const SOUNDS = {
  correct: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7b89dfa72b.mp3?filename=correct-2-46134.mp3',
  wrong:   'https://cdn.pixabay.com/download/audio/2023/09/14/audio_a03a90d6a1.mp3?filename=wrong-answer-126515.mp3',
  next:    'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a13c49.mp3?filename=next-2-46205.mp3',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function decodeHtml(html) {
  if (typeof window === 'undefined') return html;
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

async function loadQuestions() {
  let pool = [];

  // 1. OpenTDB API categories
  for (const cat of apiCategories) {
    try {
      const url = `https://opentdb.com/api.php?amount=20&category=${cat.id}&difficulty=${DIFFICULTY}&type=multiple`;
      const res  = await fetch(url, { cache: 'no-store' });
      const data = await res.json();
      if (data.results?.length) {
        pool = pool.concat(data.results.map((q) => ({ ...q, categoryName: cat.name })));
      }
    } catch {
      // Skip silently — custom questions will still be present
    }
  }

  // 2. Add custom questions
  pool = pool.concat(cameroonHistoryQuestions, riddlesQuestions);

  // 3. Deduplicate by question text
  const seen = new Set();
  pool = pool.filter((q) => {
    const key = decodeHtml(q.question);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return shuffle(pool).slice(0, TOTAL_QUESTIONS);
}

function playSound(url) {
  try {
    const a = new Audio(url);
    a.volume = 0.4;
    a.play().catch(() => {});
  } catch {
    // Audio may be unavailable in some environments
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** The category/name entry screen shown before the game starts. */
function SetupScreen({ onStart }) {
  const [name, setName] = useState('');
  return (
    <div className="quiz-screen quiz-setup">
      <h2 className="quiz-screen-title">General Knowledge Quiz</h2>
      <p className="quiz-screen-sub">
        20 questions drawn from science, history, Cameroon facts, riddles, and
        more.
      </p>

      <label className="quiz-label" htmlFor="quiz-player-name">
        Your name (optional)
      </label>
      <input
        id="quiz-player-name"
        className="quiz-input"
        type="text"
        maxLength={40}
        value={name}
        placeholder="e.g. Amina"
        onChange={(e) => setName(e.target.value)}
      />

      <button
        type="button"
        className="quiz-start-btn"
        onClick={() => onStart(name.trim() || 'Player')}
      >
        Start Quiz
      </button>
    </div>
  );
}

/** The live question screen. */
function QuizScreen({ playerName, highScore, onEnd, onQuit }) {
  const [questions, setQuestions]   = useState([]);
  const [index, setIndex]           = useState(0);
  const [passed, setPassed]         = useState(0);
  const [failed, setFailed]         = useState(0);
  const [timeLeft, setTimeLeft]     = useState(30);
  const [picked, setPicked]         = useState(null); // { correct, selected }
  const [loading, setLoading]       = useState(true);

  const timerRef = useRef(null);

  // Load questions on mount
  useEffect(() => {
    loadQuestions().then((qs) => {
      setQuestions(qs);
      setLoading(false);
    });
  }, []);

  // Timer effect — runs whenever index or loading changes
  useEffect(() => {
    if (loading || picked !== null) return; // don't run timer after pick

    setTimeLeft(30);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          // Auto-fail
          const q = questions[index];
          setPicked({ selected: null, correct: q?.correct_answer });
          setFailed((f) => f + 1);
          playSound(SOUNDS.wrong);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [index, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  function handlePick(answer) {
    if (picked !== null) return; // already answered
    clearInterval(timerRef.current);

    const q = questions[index];
    setPicked({ selected: answer, correct: q.correct_answer });

    if (decodeHtml(answer) === decodeHtml(q.correct_answer)) {
      setPassed((p) => p + 1);
      playSound(SOUNDS.correct);
    } else {
      setFailed((f) => f + 1);
      playSound(SOUNDS.wrong);
    }
  }

  function handleNext() {
    playSound(SOUNDS.next);
    const nextIndex = index + 1;
    if (nextIndex >= questions.length) {
      onEnd({ passed, failed, total: questions.length });
    } else {
      setPicked(null);
      setIndex(nextIndex);
    }
  }

  if (loading) {
    return (
      <div className="quiz-screen" style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6366f1' }}>
          <i className="fa fa-spinner fa-spin"></i> Loading questions...
        </p>
      </div>
    );
  }

  const q        = questions[index];
  const answers  = q ? shuffle([q.correct_answer, ...q.incorrect_answers]) : [];
  const progress = ((index) / (questions.length || 1)) * 100;

  return (
    <div className="quiz-screen quiz-main">
      {/* Header row */}
      <div className="quiz-header-row">
        <span className="quiz-player-tag">
          <i className="fa fa-user"></i> {playerName}
        </span>
        <span className="quiz-score-tag">
          Best: {highScore}
        </span>
        <button type="button" className="quiz-quit-btn" onClick={onQuit}>
          Quit
        </button>
      </div>

      {/* Progress bar */}
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Stats row */}
      <div className="quiz-stats-row">
        <span className="quiz-stat passed">
          <i className="fa fa-check"></i> {passed}
        </span>
        <span className="quiz-stat question-counter">
          {index + 1} / {questions.length}
        </span>
        <span className={`quiz-stat timer${timeLeft <= 10 ? ' urgent' : ''}`}>
          <i className="fa fa-clock"></i> {timeLeft}s
        </span>
        <span className="quiz-stat failed">
          <i className="fa fa-xmark"></i> {failed}
        </span>
      </div>

      {/* Question */}
      <div className="quiz-question-box">
        <p className="quiz-category-label">{decodeHtml(q.categoryName)}</p>
        <p className="quiz-question-text">{decodeHtml(q.question)}</p>
      </div>

      {/* Answer buttons */}
      <div className="quiz-options">
        {answers.map((ans) => {
          let state = '';
          if (picked !== null) {
            if (decodeHtml(ans) === decodeHtml(picked.correct)) state = ' correct';
            else if (ans === picked.selected) state = ' wrong';
            else state = ' dimmed';
          }
          return (
            <button
              key={ans}
              type="button"
              className={`quiz-option-btn${state}`}
              disabled={picked !== null}
              onClick={() => handlePick(ans)}
            >
              {decodeHtml(ans)}
            </button>
          );
        })}
      </div>

      {/* Feedback + Next */}
      {picked !== null && (
        <div className="quiz-feedback-row">
          {picked.selected === null ? (
            <p className="quiz-feedback timeout">
              Time&apos;s up! Answer: <strong>{decodeHtml(picked.correct)}</strong>
            </p>
          ) : decodeHtml(picked.selected) === decodeHtml(picked.correct) ? (
            <p className="quiz-feedback correct">Correct!</p>
          ) : (
            <p className="quiz-feedback wrong">
              Wrong! Correct: <strong>{decodeHtml(picked.correct)}</strong>
            </p>
          )}
          <button type="button" className="quiz-next-btn" onClick={handleNext}>
            {index + 1 < questions.length ? 'Next question' : 'See results'}
          </button>
        </div>
      )}
    </div>
  );
}

/** Final results screen. */
function ResultsScreen({ playerName, passed, failed, total, highScore, onPlayAgain }) {
  const percentage = Math.round((passed / total) * 100);
  let verdict = '';
  if (percentage >= 80) verdict = 'Outstanding!';
  else if (percentage >= 60) verdict = 'Well done!';
  else if (percentage >= 40) verdict = 'Keep practising.';
  else verdict = 'Better luck next time.';

  return (
    <div className="quiz-screen quiz-results">
      <h2 className="quiz-screen-title">{verdict}</h2>
      <p className="quiz-screen-sub">
        {playerName}, you scored <strong>{passed}</strong> out of{' '}
        <strong>{total}</strong> ({percentage}%).
      </p>

      <div className="quiz-results-stats">
        <div className="res-stat passed">
          <span className="res-val">{passed}</span>
          <span className="res-label">Correct</span>
        </div>
        <div className="res-stat failed">
          <span className="res-val">{failed}</span>
          <span className="res-label">Wrong</span>
        </div>
        <div className="res-stat high">
          <span className="res-val">{highScore}</span>
          <span className="res-label">Best score</span>
        </div>
      </div>

      <button type="button" className="quiz-start-btn" onClick={onPlayAgain}>
        Play again
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function QuizSection() {
  // 'setup' | 'playing' | 'results'
  const [screen, setScreen]         = useState('setup');
  const [playerName, setPlayerName] = useState('Player');
  const [results, setResults]       = useState(null);
  const [highScore, setHighScore]   = useState(0);

  // Load high score from localStorage
  useEffect(() => {
    const stored = Number(localStorage.getItem('quizHighScore') || 0);
    setHighScore(stored);
  }, []);

  function handleStart(name) {
    setPlayerName(name);
    setScreen('playing');
  }

  function handleEnd({ passed, failed, total }) {
    const newHigh = Math.max(highScore, passed);
    setHighScore(newHigh);
    localStorage.setItem('quizHighScore', String(newHigh));
    setResults({ passed, failed, total });
    setScreen('results');
  }

  function handleQuit() {
    setScreen('setup');
    setResults(null);
  }

  return (
    <section className="quiz-section">
      <div className="quiz-wrapper">
        {screen === 'setup' && <SetupScreen onStart={handleStart} />}

        {screen === 'playing' && (
          <QuizScreen
            playerName={playerName}
            highScore={highScore}
            onEnd={handleEnd}
            onQuit={handleQuit}
          />
        )}

        {screen === 'results' && results && (
          <ResultsScreen
            playerName={playerName}
            passed={results.passed}
            failed={results.failed}
            total={results.total}
            highScore={highScore}
            onPlayAgain={() => {
              setScreen('setup');
              setResults(null);
            }}
          />
        )}
      </div>
    </section>
  );
}
