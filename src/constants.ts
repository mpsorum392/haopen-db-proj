import { Player, Match, ArchiveYear } from './types';

export const ARCHIVE_DATA: ArchiveYear[] = [
  {
    year: 2026,
    location: "Burlington, IA",
    courses: ["Blue Top Ridge", "Spirit Hollow"],
    winningTeam: "Blue Hackers",
    teams: [
      { name: "Blue Hackers", players: ["Kyle Swart", "Troy Thompson", "Eric Wakefield", "Jeff Fitzke", "Karl Rohrbaugh"], score: 17 },
      { name: "Pink Addicts", players: ["Mike Sorum", "Rob Fabian", "Kevin DeMarco", "Kyle Koehler", "Scott Kardell"], score: 13 },
    ],
    notes: "Blue Hackers took the Cup 17-13. Two of our days ranked top 20 out of the last 1,000 days for late-June weather in eastern Iowa. Special thanks to The Buffalo Tavern in Burlington. And a question that will be asked for a long time: Did we actually land on the moon?",
  },
  {
    year: 2025,
    location: "Manhattan, KS",
    courses: ["Colbert Hills", "FireKeeper"],
    winningTeam: "Team Blue",
    teams: [
      { name: "Team Blue", players: ["Kyle Swart", "Jeff Fitzke", "Rob Fabian", "Derek Bernacchi"], score: 12 },
      { name: "Team Black", players: ["Mike Sorum", "Ben", "Kevin DeMarco", "Kyle Koehler"], score: 10 },
    ],
    notes: "Will forever be known as 'Hell'; 95+ degree temps and 40+ mph winds; fuck Kansas.",
  },
  {
    year: 2024,
    location: "Sioux Falls, SD",
    courses: ["Whispering Ridge", "Who The Hell Knows"],
    winningTeam: "Team Black",
    teams: [
      { name: "Team Blue", players: ["Kyle Swart", "Kyle Koehler", "Kevin DeMarco", "Rob Fabian"], score: 10.5 },
      { name: "Team Black", players: ["Mike Sorum", "Morgan Blaney", "Jeff Fitzke", "Derek Bernacchi"], score: 11.5 },
    ],
    notes: "The Great Flood of Sioux Falls 2024. Never played a hole.",
  },
  {
    year: 2023,
    location: "Sioux Falls, SD",
    courses: ["The Falls", "Prairie Green"],
    winningTeam: "Team Black",
    teams: [
      { name: "Team Blue", players: ["Mike Sorum", "Morgan Blaney", "Kam Rokon"], score: 0 },
      { name: "Team Black", players: ["Kevin DeMarco", "Kyle Koehler", "Derek Bernacchi"], score: 0 },
    ],
    notes: "Team Black won 1UP. Our smallest trip but a lot of golf and gambling.",
  },
  {
    year: 2022,
    location: "Riverside, IA",
    courses: ["Blue Top Ridge"],
    winningTeam: "Team Blue",
    teams: [
      { name: "Team Blue", players: ["Mike Sorum", "Kyle Koehler", "Morgan Blaney", "Derek Bernacchi"], score: 0 },
      { name: "Team Black", players: ["Tim O'Neil", "Kevin DeMarco", "Bob Wein", "Orlando Vera"], score: 0 },
    ],
    notes: "Team Blue won 1UP. A small group of 3 took on the tips at Blue Top Ridge and managed a 70 from 7600 yards.",
  },
  {
    year: 2021,
    location: "Kansas City, MO",
    courses: ["Shoal Creek", "Tiffany Greens", "Stone Canyon"],
    winningTeam: "None",
    teams: [
      { name: "All Players", players: ["Mike Sorum", "Kyle Koehler", "Morgan Blaney", "Kevin DeMarco", "Bob Wein", "Josh Macke", "Rick Loftin", "Orlando Vera"], score: 0 },
    ],
    notes: "No team competition. 95+ degree temps and 40+ mph winds; fuck Kansas.",
  },
  {
    year: 2020,
    location: "Kansas City, MO",
    courses: ["Tiffany Greens", "Drumm Farm", "Winterstone"],
    winningTeam: "None",
    teams: [
      { name: "All Players", players: ["Mike Sorum", "Kyle Koehler", "Morgan Blaney", "Kevin DeMarco", "Bob Wein", "Josh Macke", "Rick Loftin", "Tim O'Neil"], score: 0 },
    ],
    notes: "The inaugural H&A Open. The motherfuckers at Tiffany Greens tried to kill us with no water or cart girl on course, and the 9th hole does not go back to the clubhouse.",
  },
];

export const RULES = [
  "Don't be a RICHARD or you will not be invited back on the trip!",
  "Match Play - Each singles match is worth 1 point and 2v2 are worth 2 points.",
  "Halved matches will split points to each team.",
  "All lost balls to be treated as lateral hazards - No stroke and distance.",
  "May improve lie within 1 foot of ball in same type of rough, sand, other.",
  "Maximum score on any hole is Net Triple Bogey for pace of play.",
  "All disputes to be settled by the Commish. Let's try not to have any disputes."
];

export const PRIZES = [
  { rank: "Winning Team", reward: "500 Team Purse + The H&A Cup" },
  { rank: "MVP", reward: "Special Reveal for 2026" },
  { rank: "TBD1", reward: "TBD" },
  { rank: "TBD2", reward: "TBD" }
];

export const SCHEDULE = [
  {
    day: "Thursday",
    date: "10th",
    location: "TBD",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80",
    events: [
      { time: "TBD", activity: "TBD" },
     ]
  },
  {
    day: "Friday",
    date: "11th",
    location: "TBD",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80",
    events: [
      { time: "TBD", activity: "TBD" },
    ]
  },
  {
    day: "Saturday",
    date: "12th",
    location: "TBD",
    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=1200&q=80",
    events: [
      { time: "TBD", activity: "TBD" },
    ]
  },
  {
    day: "Sunday",
    date: "13th",
    location: "TBD",
    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=1200&q=80",
    events: [
      { time: "TBD", activity: "TBD" },
     ]
  }
];

export const INITIAL_PLAYERS: Player[] = [
  { id: 1,  name: 'Mike',      nickname: 'Commish', team: 'Pink Addicts'  },
  { id: 2,  name: 'Kyle K',    nickname: 'Killer',  team: 'Pink Addicts'  },
  { id: 3,  name: 'Kevin',     nickname: 'Outs',    team: 'Pink Addicts'  },
  { id: 4,  name: 'Jeff',      nickname: 'OoBR',    team: 'Blue Hackers'  },
  { id: 5,  name: 'Rob',       nickname: 'DcD',     team: 'Pink Addicts'  },
  { id: 6,  name: 'Kyle S',    nickname: 'Super',   team: 'Blue Hackers'  },
  { id: 7,  name: 'Eric',      nickname: 'Old Man', team: 'Blue Hackers'  },
  { id: 8,  name: 'Karl',      nickname: 'Life',    team: 'Blue Hackers'  },
  { id: 9,  name: 'Troy',      nickname: 'BM3',     team: 'Blue Hackers'  },
  { id: 10, name: 'Scott',     nickname: 'Chill',   team: 'Pink Addicts'  },
];

export const INITIAL_MATCHES: Match[] = [
  // Thursday — Front 9 (2x 2v2, 1x 1v1)
  { id: 1,  day: 'Thursday', session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 2,  day: 'Thursday', session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 3,  day: 'Thursday', session: 'Front 9', match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  // Thursday — Back 9 (2x 2v2, 1x 1v1)
  { id: 4,  day: 'Thursday', session: 'Back 9',  match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 5,  day: 'Thursday', session: 'Back 9',  match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 6,  day: 'Thursday', session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  // Friday — Front 9 (2x 2v2, 1x 1v1)
  { id: 7,  day: 'Friday',   session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 8,  day: 'Friday',   session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 9,  day: 'Friday',   session: 'Front 9', match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  // Friday — Back 9 (5x 1v1)
  { id: 10, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 11, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 12, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 13, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 14, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  // Saturday — Front 9 (2x 2v2, 1x 1v1)
  { id: 15, day: 'Saturday', session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 16, day: 'Saturday', session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 17, day: 'Saturday', session: 'Front 9', match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  // Saturday — Back 9 (2x 2v2, 1x 1v1)
  { id: 18, day: 'Saturday', session: 'Back 9',  match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 19, day: 'Saturday', session: 'Back 9',  match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 20, day: 'Saturday', session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
];
