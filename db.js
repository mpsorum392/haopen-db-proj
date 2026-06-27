import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

const SEED_MATCHES = [
  { id: 1,  day: 'Thursday', session: 'Front 9', match_type: '2v2', team_blue_players: ['Swart', 'Thompson'],      team_pink_players: ['Sorum', 'Kardell'] },
  { id: 2,  day: 'Thursday', session: 'Front 9', match_type: '2v2', team_blue_players: ['Wakefield', 'Rohrbaugh'], team_pink_players: ['DeMarco', 'Koehler'] },
  { id: 3,  day: 'Thursday', session: 'Front 9', match_type: '1v1', team_blue_players: ['Fitzke'],                 team_pink_players: ['Fabian'] },
  { id: 4,  day: 'Thursday', session: 'Back 9',  match_type: '2v2', team_blue_players: ['Thompson', 'Wakefield'],  team_pink_players: ['Sorum', 'Koehler'] },
  { id: 5,  day: 'Thursday', session: 'Back 9',  match_type: '2v2', team_blue_players: ['Fitzke', 'Rohrbaugh'],    team_pink_players: ['Fabian', 'Kardell'] },
  { id: 6,  day: 'Thursday', session: 'Back 9',  match_type: '1v1', team_blue_players: ['Swart'],                  team_pink_players: ['DeMarco'] },
  { id: 7,  day: 'Friday',   session: 'Front 9', match_type: '2v2', team_blue_players: ['Thompson', 'Fitzke'],     team_pink_players: ['Fabian', 'DeMarco'] },
  { id: 8,  day: 'Friday',   session: 'Front 9', match_type: '2v2', team_blue_players: ['Wakefield', 'Rohrbaugh'], team_pink_players: ['Koehler', 'Kardell'] },
  { id: 9,  day: 'Friday',   session: 'Front 9', match_type: '1v1', team_blue_players: ['Swart'],                  team_pink_players: ['Sorum'] },
  { id: 10, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: ['Thompson'],               team_pink_players: ['Sorum'] },
  { id: 11, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: ['Swart'],                  team_pink_players: ['Koehler'] },
  { id: 12, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: ['Rohrbaugh'],              team_pink_players: ['DeMarco'] },
  { id: 13, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: ['Fitzke'],                 team_pink_players: ['Fabian'] },
  { id: 14, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: ['Wakefield'],              team_pink_players: ['Kardell'] },
  { id: 15, day: 'Saturday', session: 'Front 9', match_type: '2v2', team_blue_players: ['Swart', 'Fitzke'],        team_pink_players: ['Sorum', 'DeMarco'] },
  { id: 16, day: 'Saturday', session: 'Front 9', match_type: '2v2', team_blue_players: ['Thompson', 'Rohrbaugh'],  team_pink_players: ['Fabian', 'Koehler'] },
  { id: 17, day: 'Saturday', session: 'Front 9', match_type: '1v1', team_blue_players: ['Wakefield'],              team_pink_players: ['Kardell'] },
  { id: 18, day: 'Saturday', session: 'Back 9',  match_type: '2v2', team_blue_players: ['Rohrbaugh', 'Thompson'],  team_pink_players: ['Fabian', 'Koehler'] },
  { id: 19, day: 'Saturday', session: 'Back 9',  match_type: '2v2', team_blue_players: ['Swart', 'Fitzke'],        team_pink_players: ['Sorum', 'Kardell'] },
  { id: 20, day: 'Saturday', session: 'Back 9',  match_type: '1v1', team_blue_players: ['Wakefield'],              team_pink_players: ['DeMarco'] },
];

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS matches (
      id               INTEGER PRIMARY KEY,
      day              VARCHAR(10)    NOT NULL,
      session          VARCHAR(10)    NOT NULL,
      match_type       VARCHAR(5)     NOT NULL,
      team_blue_players JSONB         NOT NULL DEFAULT '[]',
      team_pink_players JSONB         NOT NULL DEFAULT '[]',
      status           VARCHAR(20)    NOT NULL DEFAULT 'pending',
      progress_leader  VARCHAR(20),
      holes_up         INTEGER        NOT NULL DEFAULT 0,
      holes_played     INTEGER        NOT NULL DEFAULT 0,
      blue_score       NUMERIC(3,1)   NOT NULL DEFAULT 0,
      pink_score       NUMERIC(3,1)   NOT NULL DEFAULT 0,
      winner           VARCHAR(20),
      finalized_at     TIMESTAMPTZ
    )
  `);

  for (const m of SEED_MATCHES) {
    await pool.query(
      `INSERT INTO matches (id, day, session, match_type, team_blue_players, team_pink_players)
       VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb)
       ON CONFLICT (id) DO UPDATE SET
         match_type = EXCLUDED.match_type,
         team_blue_players = EXCLUDED.team_blue_players,
         team_pink_players = EXCLUDED.team_pink_players`,
      [m.id, m.day, m.session, m.match_type, JSON.stringify(m.team_blue_players), JSON.stringify(m.team_pink_players)]
    );
  }

  // Remove placeholder matches that are no longer part of the schedule
  await pool.query(`DELETE FROM matches WHERE id IN (21, 22)`);

  await pool.query(`
    ALTER TABLE matches ADD COLUMN IF NOT EXISTS match_context VARCHAR(5)
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS stroke_scores (
      id         SERIAL PRIMARY KEY,
      match_id   INTEGER NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
      player     VARCHAR(30) NOT NULL,
      gross      INTEGER NOT NULL,
      UNIQUE (match_id, player)
    )
  `);

  console.log('Database ready');
}