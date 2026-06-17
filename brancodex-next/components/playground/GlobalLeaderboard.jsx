/**
 * components/playground/GlobalLeaderboard.jsx
 *
 * Reusable panel that renders the global top-10 leaderboard fetched from
 * the BranCodeX backend.  Import in any game component.
 *
 * Props:
 *   board         — array of { rank, player, score, played_at }
 *   loading       — boolean: fetch in progress
 *   error         — boolean: last fetch failed
 *   onRefresh     — callback: user clicked the refresh button
 *   madeTopTen    — boolean (optional): show celebratory badge
 */

"use client";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function GlobalLeaderboard({
  board = [],
  loading = false,
  error = false,
  onRefresh,
  madeTopTen = false,
}) {
  return (
    <div className="global-board">
      {/* ── Header ── */}
      <div className="global-board-header">
        <h3 className="global-board-title">
          <i className="fa fa-earth-americas" /> Global Top 10
        </h3>
        <button
          type="button"
          className="global-board-refresh"
          onClick={onRefresh}
          disabled={loading}
          aria-label="Refresh global leaderboard"
        >
          <i className={`fa fa-arrows-rotate${loading ? " fa-spin" : ""}`} />
        </button>
      </div>

      {/* ── Celebratory badge ── */}
      {madeTopTen && (
        <div className="global-board-badge">
          <i className="fa fa-trophy" /> You made the Global Top 10!
        </div>
      )}

      {/* ── States ── */}
      {error && (
        <p className="global-board-error">
          <i className="fa fa-triangle-exclamation" /> Could not load.
          Check your connection.
        </p>
      )}

      {loading && !error && (
        <p className="global-board-loading">
          <i className="fa fa-spinner fa-spin" /> Loading leaderboard&hellip;
        </p>
      )}

      {!loading && !error && board.length === 0 && (
        <p className="global-board-empty">
          No global entries yet. Be the first to set a record!
        </p>
      )}

      {/* ── Leaderboard list ── */}
      {!loading && !error && board.length > 0 && (
        <ol className="global-board-list">
          {board.map((entry) => (
            <li
              key={entry.rank}
              className={`global-board-row${entry.rank <= 3 ? " top-three" : ""}`}
            >
              <span className="global-board-rank">
                {MEDALS[entry.rank - 1] ?? `#${entry.rank}`}
              </span>
              <span className="global-board-player">
                {entry.player}
                {entry.badges?.length > 0 && (
                  <span className="global-board-badges">
                    {entry.badges.map((b) => (
                      <span key={b} className="global-board-badge-pill" title={b}>
                        {b.split(" ")[0]}
                      </span>
                    ))}
                  </span>
                )}
              </span>
              <span className="global-board-score">
                {entry.score}
                <span className="global-board-score-label">&thinsp;pts</span>
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
