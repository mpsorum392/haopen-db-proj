import { pool } from './db.js';

const HANDICAPS = {
  Swart: 4, Thompson: 9, Wakefield: 11, Fitzke: 12, Rohrbaugh: 14,
  Sorum: 7, Fabian: 12, DeMarco: 16, Koehler: 18, Kardell: 20,
};

function parseMatch(row) {
  return {
    ...row,
    blue_score: parseFloat(row.blue_score),
    pink_score: parseFloat(row.pink_score),
    holes_up: parseInt(row.holes_up, 10),
    holes_played: parseInt(row.holes_played, 10),
  };
}

export function registerApiRoutes(app) {
  const SCORING_PIN = process.env.SCORING_PIN;

  app.get('/api/matches', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM matches ORDER BY id');
      res.json(result.rows.map(parseMatch));
    } catch (err) {
      console.error('GET /api/matches:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  app.post('/api/matches/:id/progress', async (req, res) => {
    const { pin, progress_leader, holes_up, holes_played } = req.body;
    if (!SCORING_PIN || pin !== SCORING_PIN) return res.status(401).json({ error: 'Invalid PIN' });

    const validLeaders = ['Blue Hackers', 'All Square', 'Pink Addicts'];
    if (!validLeaders.includes(progress_leader)) return res.status(400).json({ error: 'Invalid leader' });

    try {
      const check = await pool.query('SELECT status FROM matches WHERE id = $1', [req.params.id]);
      if (!check.rows[0]) return res.status(404).json({ error: 'Match not found' });
      if (check.rows[0].status === 'final') return res.status(400).json({ error: 'Match is already final' });

      await pool.query(
        `UPDATE matches
         SET status = 'in_progress', progress_leader = $1, holes_up = $2, holes_played = $3
         WHERE id = $4`,
        [progress_leader, holes_up ?? 0, holes_played ?? 0, req.params.id]
      );
      res.json({ ok: true });
    } catch (err) {
      console.error('POST /api/matches/:id/progress:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  app.post('/api/matches/:id/result', async (req, res) => {
    const { pin, winner } = req.body;
    if (!SCORING_PIN || pin !== SCORING_PIN) return res.status(401).json({ error: 'Invalid PIN' });

    const scoreMap = {
      'Blue Hackers': { blue_score: 1, pink_score: 0 },
      'Pink Addicts':  { blue_score: 0, pink_score: 1 },
      'Draw':          { blue_score: 0.5, pink_score: 0.5 },
    };
    if (!scoreMap[winner]) return res.status(400).json({ error: 'Invalid winner value' });

    const { blue_score, pink_score } = scoreMap[winner];
    const match_context = winner === 'Draw' ? null : (req.body.match_context ?? null);
    try {
      await pool.query(
        `UPDATE matches
         SET status = 'final', winner = $1, blue_score = $2, pink_score = $3, finalized_at = NOW(), match_context = $4
         WHERE id = $5`,
        [winner, blue_score, pink_score, match_context, req.params.id]
      );
      res.json({ ok: true });
    } catch (err) {
      console.error('POST /api/matches/:id/result:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  app.delete('/api/matches/:id/result', async (req, res) => {
    const { pin } = req.body;
    if (!SCORING_PIN || pin !== SCORING_PIN) return res.status(401).json({ error: 'Invalid PIN' });

    try {
      await pool.query('DELETE FROM stroke_scores WHERE match_id = $1', [req.params.id]);
      await pool.query(
        `UPDATE matches
         SET status = 'pending', winner = NULL, blue_score = 0, pink_score = 0,
             finalized_at = NULL, progress_leader = NULL, holes_up = 0, holes_played = 0, match_context = NULL
         WHERE id = $1`,
        [req.params.id]
      );
      res.json({ ok: true });
    } catch (err) {
      console.error('DELETE /api/matches/:id/result:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  app.post('/api/matches/:id/strokes', async (req, res) => {
    const { pin, scores } = req.body;
    if (!SCORING_PIN || pin !== SCORING_PIN) return res.status(401).json({ error: 'Invalid PIN' });
    if (!Array.isArray(scores) || scores.length === 0) return res.status(400).json({ error: 'scores array required' });

    for (const s of scores) {
      if (!(s.player in HANDICAPS)) return res.status(400).json({ error: `Unknown player: ${s.player}` });
      const g = parseInt(s.gross, 10);
      if (isNaN(g) || g < 27 || g > 72) return res.status(400).json({ error: `Invalid gross score for ${s.player}` });
    }

    try {
      for (const s of scores) {
        await pool.query(
          `INSERT INTO stroke_scores (match_id, player, gross)
           VALUES ($1, $2, $3)
           ON CONFLICT (match_id, player) DO UPDATE SET gross = EXCLUDED.gross`,
          [req.params.id, s.player, parseInt(s.gross, 10)]
        );
      }
      res.json({ ok: true });
    } catch (err) {
      console.error('POST /api/matches/:id/strokes:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  app.get('/api/strokes', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT s.match_id, s.player, s.gross, m.match_type
        FROM stroke_scores s
        JOIN matches m ON m.id = s.match_id
        ORDER BY s.match_id, s.player
      `);
      const rows = result.rows.map(r => ({
        match_id:   r.match_id,
        player:     r.player,
        gross:      parseInt(r.gross, 10),
        net:        parseInt(r.gross, 10) - Math.floor((HANDICAPS[r.player] ?? 0) / 2),
        match_type: r.match_type,
      }));
      res.json(rows);
    } catch (err) {
      console.error('GET /api/strokes:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });
}
