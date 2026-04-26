import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Users,
  Calendar,
  ClipboardList,
  Home,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Gift,
  UserRound,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
} from 'lucide-react';
import { TabType, Match } from './types';
import { RULES, PRIZES, SCHEDULE, INITIAL_MATCHES, ARCHIVE_DATA } from './constants';
import mikePic    from '../images/mike-pic.jpeg';
import swartPic   from '../images/swart-pic.jpeg';
import kyleKPic   from '../images/kyleK-pic.jpg';
import kevinPic   from '../images/kevin-new-pic.jpeg';
import ericPic    from '../images/eric-pic.jpg';
import scottPic   from '../images/scott-pic.jpg';
import derekPic   from '../images/derek-pic.jpeg';
import fitzkePic  from '../images/fitzke-pic.jpeg';
import karlPic    from '../images/karl-pic.jpeg';
import troyPic    from '../images/troy-new-pic.jpeg';
import robPic     from '../images/rob-pic.jpeg';
import haOpenLogo from '../images/ha_open_logo.jpg';
import paigePic   from '../images/paige-pic.jpg';
import spiritHollowPhoto from '../images/spirit_hollow_photo.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);

  const fetchMatches = async () => {
    try {
      const res = await fetch('/api/matches');
      if (res.ok) setMatches(await res.json());
    } catch {}
  };

  useEffect(() => {
    fetchMatches();
    const id = setInterval(fetchMatches, 30000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const bluePoints = matches.filter(m => m.status === 'final').reduce((acc: number, m: Match) => acc + m.blue_score * (m.match_type === '2v2' ? 2 : 1), 0);
  const pinkPoints = matches.filter(m => m.status === 'final').reduce((acc: number, m: Match) => acc + m.pink_score * (m.match_type === '2v2' ? 2 : 1), 0);

  const navItems = [
    { id: 'home',        label: 'Home',        mobileLabel: 'Home',    icon: Home },
    { id: 'schedule',    label: 'Schedule & Travel',    mobileLabel: 'Sched',   icon: Calendar },
    { id: 'crew',        label: 'The Crew',    mobileLabel: 'Crew',    icon: UserRound },
    { id: 'matchups',    label: 'Matchups',    mobileLabel: 'Matches', icon: Users },
    { id: 'leaderboard', label: 'Leaderboard', mobileLabel: 'Board',   icon: Trophy },
    { id: 'rules',       label: 'Rules',       mobileLabel: 'Rules-Cash',   icon: ClipboardList },
    { id: 'archive',     label: 'Archive',     mobileLabel: 'Archive',      icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans flex flex-col md:flex-row">
      {/* Desktop Sidebar / Mobile Bottom Nav */}
      <aside className="md:w-64 md:h-screen md:sticky md:top-0 bg-[#111111] border-r border-white/10 z-50 flex flex-col">
        <div className="p-6 hidden md:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
              <img src={haOpenLogo} alt="HA Open Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold leading-tight tracking-tight uppercase">H&A Open</h1>
              <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Est. 2020</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 md:px-4 py-2 flex md:flex-col items-center md:items-stretch justify-around md:justify-start fixed bottom-0 left-0 right-0 md:relative bg-[#111111] border-t md:border-t-0 border-white/10 md:bg-transparent">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex flex-col md:flex-row items-center gap-0.5 md:gap-3 px-2 py-2 md:py-4 text-[8px] md:text-sm font-medium transition-all rounded-xl relative ${
                activeTab === tab.id
                  ? 'text-emerald-500 bg-white/10'
                  : 'text-white/40 hover:text-emerald-500/70 hover:bg-white/5'
              }`}
            >
              <tab.icon className="md:hidden" size={14} /><tab.icon className="hidden md:block" size={18} />
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.mobileLabel}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 hidden md:block rounded-full"
                />
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 pb-24 md:pb-8 max-w-6xl mx-auto w-full">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
              <img src={haOpenLogo} alt="HA Open Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-lg font-display font-bold uppercase">H&A Open</h1>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-blue-400 font-bold">{bluePoints}</span>
              <span className="opacity-20">/</span>
              <span className="text-pink-400 font-bold">{pinkPoints}</span>
            </div>
            <span className="text-[8px] font-mono text-white font-bold tracking-tighter">15.5 to win Cup</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'home' && <HomeView bluePoints={bluePoints} pinkPoints={pinkPoints} />}
            {activeTab === 'crew' && <CrewView />}
            {activeTab === 'leaderboard' && <LeaderboardView matches={matches} />}
            {activeTab === 'matchups' && <MatchupsView matches={matches} handicapMap={Object.fromEntries(CREW.map(p => [p.name.split(' ').pop()!, p.handicap]))} onMatchUpdate={fetchMatches} />}
            {activeTab === 'schedule' && <ScheduleView />}
            {activeTab === 'rules' && <RulesView />}
            {activeTab === 'archive' && <ArchiveView />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function HomeView({ bluePoints, pinkPoints }: { bluePoints: number, pinkPoints: number }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div className="mb-12">
          <h2 className="text-2xl font-display font-bold mb-3 tracking-tight">Hackers & Addicts Open</h2>
          <p className={"text-emerald-500 font-mono uppercase tracking-widest text-xs"}>June 24th - 28th, 2026</p>
        </div>

        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 relative group">
          <img
            src={spiritHollowPhoto}
            alt="Spirit Hollow"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="text-[10px] font-mono uppercase tracking-widest mb-1 opacity-50">Featured Course</p>
            <h4 className="text-2xl font-display font-bold">Spirit Hollow (Hole #1)</h4>
          </div>
        </div>

        <section className="glass-panel p-8 rounded-3xl">
          <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-2 tracking-tight">
            Event Overview
          </h3>
          <p className="text-lg leading-relaxed opacity-60 mb-8">
            Welcome to the 7th Annual Hackers & Addicts Open. 10 golfers, 2 teams, 3 days of grueling match play across Iowa's finest courses.
            The Blue Hackers face off against the Pink Addicts in a quest for eternal glory.<br/>
          </p>
            <p className="text-lg leading-relaxed opacity-60 mb-8">
            This event is about FUN!! Yes, there is a competition that we are playing for $50 across 3 rounds of golf so
            this is meant to do nothing other than keep us interested.  No one cares how you play but do care that you ARE
                and HAVE a GOOD TIME on the trip - make that your priority.  If your idea of fun is getting drunk around
                the guise of a golf trip, great, if you want to play for money and be competitive there will be some others
                in the group you can find to do it (to a degree).<br/>
          </p>
          </section>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-mono uppercase opacity-40">Thursday</p>
              <p className="font-bold">Blue Top Ridge GC</p>
              <p className="text-xs opacity-40">Riverside, IA</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-mono uppercase opacity-40">Friday & Saturday</p>
              <p className="font-bold">Spirit Hollow GC</p>
              <p className="text-xs opacity-40">Burlington, IA</p>
            </div>
          </div>
          <div className="space-y-8">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="glass-panel p-6 rounded-3xl">
            <p className="text-3xl font-display font-bold">2</p>
            <p className="text-[10px] font-mono uppercase opacity-60">Courses</p>
          </div><div className="glass-panel p-6 rounded-3xl">
            <p className="text-3xl font-display font-bold">3</p>
            <p className="text-[10px] font-mono uppercase opacity-60">Rounds</p>
          </div>
            <div className="glass-panel p-6 rounded-3xl">
            <p className="text-3xl font-display font-bold">54</p>
            <p className="text-[10px] font-mono uppercase opacity-60">Holes</p>
          </div>
          <div className="glass-panel p-6 rounded-3xl">
            <p className="text-3xl font-display font-bold">22</p>
            <p className="text-[10px] font-mono uppercase opacity-60">Total Matches</p>
          </div>
        </div>
      </div>
          <section className="glass-panel p-8 rounded-3xl">
          <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2 tracking-tight">
            What's this going to cost you?
          </h2>
          <p className="text-lg leading-relaxed opacity-60 mb-8">
              Entry Fees:
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                  <li>$50 to go towards team competition</li>
                  <li>$40 to swag for team polos</li>
              </ul>
              Lodging Costs:
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                  <li>$175 for stay & play at Riverside</li>
                  <li>$826 or $892 for 3 nights at Spirit Hollow</li>
              </ul>
              Green Fees:
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                  <li>Riverside: 1 round incl. - $55 is cost of replay</li>
                  <li>Spirit Hollow: unlimited included in lodging cost</li>
              </ul>
              Travel cost (gas):
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                  <li>$25 if not driving</li>
              </ul>
              Total:
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                  <li>$1,116-1,237 of the best $$ you've ever spent</li>
              </ul>
          </p>
          </section>



      </div>


    </div>
  );
}

function LeaderboardView({ matches }: { matches: Match[] }) {
  const days = ['Thursday', 'Friday', 'Saturday'];

  const getPointsByDay = (day: string, team: string) => {
    return matches
      .filter(m => m.day === day && m.status === 'final')
      .reduce((acc, m) => {
        const score = team === 'Blue Hackers' ? m.blue_score : m.pink_score;
        return acc + score * (m.match_type === '2v2' ? 2 : 1);
      }, 0);
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="grid grid-cols-5 p-6 bg-white/5 font-mono text-[10px] uppercase tracking-widest border-b border-white/10">
          <div className="col-span-2">Team Name</div>
          <div className="text-center">Thu</div>
          <div className="text-center">Fri</div>
          <div className="text-center">Sat</div>
        </div>
                <div className="divide-y divide-white/5">
          <div className="grid grid-cols-5 p-6 items-center hover:bg-white/5 transition-colors">
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="font-bold text-sm">Blue Hackers</span>
            </div>
            {days.map(day => (
              <div key={day} className="text-center font-mono text-xl font-bold">{getPointsByDay(day, 'Blue Hackers')}</div>
            ))}
          </div>
          <div className="grid grid-cols-5 p-6 items-center hover:bg-white/5 transition-colors">
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
              <span className="font-bold text-sm">Pink Addicts</span>
            </div>
            {days.map(day => (
              <div key={day} className="text-center font-mono text-xl font-bold">{getPointsByDay(day, 'Pink Addicts')}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {days.map(day => {
          const blue = getPointsByDay(day, 'Blue Hackers');
          const pink = getPointsByDay(day, 'Pink Addicts');
          const winner = blue > pink ? 'Blue' : pink > blue ? 'Pink' : 'Draw';

          return (
            <div key={day} className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
              <div className={`absolute top-0 right-0 p-2 text-[8px] font-mono uppercase font-bold ${
                winner === 'Blue' ? 'bg-blue-500 text-white' : winner === 'Pink' ? 'bg-pink-500 text-white' : 'bg-white/10'
              }`}>
                {winner === 'Draw' ? 'Halved' : `${winner} Lead`}
              </div>
              <h4 className="text-lg font-display font-bold mb-4 opacity-40">{day} Recap</h4>
              <div className="flex justify-between items-end">
                <div className="text-center">
                  <p className="text-[10px] font-mono opacity-30 mb-1">BLUE</p>
                  <p className="text-4xl font-display font-bold text-blue-400">{blue}</p>
                </div>
                <div className="text-center pb-2 opacity-10 font-mono text-xs">VS</div>
                <div className="text-center">
                  <p className="text-[10px] font-mono opacity-30 mb-1">PINK</p>
                  <p className="text-4xl font-display font-bold text-pink-400">{pink}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MatchupsView({ matches, handicapMap, onMatchUpdate }: { matches: Match[], handicapMap: Record<string, number>, onMatchUpdate: () => void }) {
  const [selectedDay, setSelectedDay] = useState<'Thursday' | 'Friday' | 'Saturday'>('Thursday');
  const [openPanelId, setOpenPanelId] = useState<number | null>(null);
  const [pin, setPin] = useState(() => sessionStorage.getItem('scoring-pin') || '');
  const [progressLeader, setProgressLeader] = useState('All Square');
  const [holesUp, setHolesUp] = useState(0);
  const [holesPlayed, setHolesPlayed] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [matchContext, setMatchContext] = useState('');

  const front9Matches = matches.filter(m => m.day === selectedDay && m.session === 'Front 9');
  const back9Matches = matches.filter(m => m.day === selectedDay && m.session === 'Back 9');

  const totalHcp = (players: string[], matchType: string) => {
    if (matchType === '1v1') return Math.round((handicapMap[players[0]] ?? 0) * 0.5);
    const hcps = players.map(p => handicapMap[p] ?? 0).sort((a, b) => a - b);
    return Math.round((hcps[0] * 0.35 + hcps[1] * 0.15) / 2);
  };

  const handlePinChange = (val: string) => {
    setPin(val);
    sessionStorage.setItem('scoring-pin', val);
  };

  const handleProgress = async (matchId: number) => {
    setErrorMsg('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/matches/${matchId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, progress_leader: progressLeader, holes_up: holesUp, holes_played: holesPlayed }),
      });
      if (res.status === 401) { setErrorMsg('Wrong PIN'); return; }
      if (!res.ok) { setErrorMsg('Error saving progress'); return; }
      setOpenPanelId(null);
      onMatchUpdate();
    } finally {
      setSubmitting(false);
    }
  };

  const handleResult = async (matchId: number, winner: string, context = '') => {
    setErrorMsg('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/matches/${matchId}/result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, winner, match_context: context || null }),
      });
      if (res.status === 401) { setErrorMsg('Wrong PIN'); return; }
      if (!res.ok) { setErrorMsg('Error submitting result'); return; }
      setOpenPanelId(null);
      onMatchUpdate();
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async (matchId: number) => {
    setErrorMsg('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/matches/${matchId}/result`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      if (res.status === 401) { setErrorMsg('Wrong PIN'); return; }
      if (!res.ok) { setErrorMsg('Error resetting match'); return; }
      onMatchUpdate();
    } finally {
      setSubmitting(false);
    }
  };

  const renderMatch = (match: Match) => {
    const blueHcp = totalHcp(match.team_blue_players, match.match_type);
    const pinkHcp = totalHcp(match.team_pink_players, match.match_type);
    const hcpLabel = match.match_type === '1v1' ? 'Player HCP(9H)' : 'Team HCP(9H)';
    const status = match.status ?? 'pending';
    const isOpen = openPanelId === match.id;

    return (
      <div key={match.id} className="glass-panel rounded-2xl overflow-hidden group hover:border-white/20 transition-all">
        <div className="flex flex-row">
          <div className="p-3 md:p-5 flex-1 border-r border-white/10">
            <div className="flex justify-between items-start mb-2 md:mb-6">
              <span className="text-[10px] font-mono uppercase bg-white/10 px-2 py-0.5 md:px-3 md:py-1 rounded-lg font-bold">{match.match_type}</span>
              <span className="text-[10px] md:text-md font-display font-medium opacity-40">{match.session}</span>
            </div>

            <div className="flex flex-row items-start gap-2 md:gap-4">
              <div className="space-y-0.5 md:space-y-1 flex-1">
                <p className="text-[9px] md:text-[10px] font-mono uppercase text-blue-400 font-bold tracking-widest">Blue</p>
                {match.team_blue_players.map(p => (
                  <p key={p} className="text-sm md:text-xl font-display font-bold leading-tight">
                    {p} <span className="text-[10px] md:text-sm font-mono text-blue-400/60">({handicapMap[p] ?? '?'})</span>
                  </p>
                ))}
                {match.team_blue_players.length > 0 && (
                  <p className="text-[10px] md:text-sm font-mono text-blue-400/60 pt-0.5 md:pt-1">{hcpLabel}: {blueHcp}</p>
                )}
              </div>

              <div className="text-[10px] font-mono opacity-20 font-bold px-1 pt-3">VS</div>

              <div className="space-y-0.5 md:space-y-1 text-right flex-1">
                <p className="text-[9px] md:text-[10px] font-mono uppercase text-pink-400 font-bold tracking-widest">Pink</p>
                {match.team_pink_players.map(p => (
                  <p key={p} className="text-sm md:text-xl font-display font-bold leading-tight">
                    {p} <span className="text-[10px] md:text-sm font-mono text-pink-400/60">({handicapMap[p] ?? '?'})</span>
                  </p>
                ))}
                {match.team_pink_players.length > 0 && (
                  <p className="text-[10px] md:text-sm font-mono text-pink-400/60 pt-0.5 md:pt-1">{hcpLabel}: {pinkHcp}</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-3 md:p-8 bg-white/5 w-20 md:w-48 flex flex-col justify-center items-center gap-1.5 md:gap-3">
            {status === 'in_progress' && (
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[8px] font-mono text-green-400 uppercase">Live</span>
              </div>
            )}
            {status === 'final' && (
              <span className="text-[8px] font-mono text-white/30 uppercase">Final</span>
            )}

            {status === 'pending' && (
              <p className="text-[10px] md:text-md font-mono opacity-20 italic">TBD</p>
            )}
            {status === 'in_progress' && (
              <div className="text-center">
                {match.progress_leader === 'All Square' ? (
                  <>
                    <p className="text-[9px] md:text-xs font-mono text-white/60 text-center">All Square</p>
                    <p className="text-[8px] font-mono text-white/30 text-center">thru {match.holes_played}</p>
                  </>
                ) : (
                  <>
                    <p className={`text-[9px] md:text-xs font-mono font-bold text-center ${match.progress_leader?.includes('Blue') ? 'text-blue-400' : 'text-pink-400'}`}>
                      {match.progress_leader?.split(' ')[0]} up {match.holes_up}
                    </p>
                    <p className="text-[8px] font-mono text-white/30 text-center">thru {match.holes_played}</p>
                  </>
                )}
              </div>
            )}
            {status === 'final' && (
              <>
                <div className="flex items-center gap-1.5 md:gap-4">
                  <span className="text-xl md:text-4xl font-display font-bold text-blue-400">{match.blue_score}</span>
                  <span className="text-xs md:text-xl opacity-20 font-display">:</span>
                  <span className="text-xl md:text-4xl font-display font-bold text-pink-400">{match.pink_score}</span>
                </div>
                {match.winner && (
                  <div className={`px-2 md:px-4 py-0.5 md:py-1 rounded-xl text-[8px] md:text-[10px] font-mono uppercase font-bold text-center ${
                    match.winner === 'Draw' ? 'bg-white/10 text-white/60' : match.winner.includes('Blue') ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'
                  }`}>
                    <div>{match.winner === 'Draw' ? 'Halved' : `${match.winner.split(' ')[0]} Wins`}</div>
                    {match.match_context && <div className="font-normal normal-case opacity-90 mt-0.5">{match.match_context}</div>}
                  </div>
                )}
              </>
            )}

            <button
              onClick={() => { setOpenPanelId(isOpen ? null : match.id); setErrorMsg(''); setMatchContext(''); }}
              className="mt-1 text-[8px] font-mono text-white/25 hover:text-white/60 transition-colors uppercase"
            >
              {status === 'final' ? 'Edit' : 'Update'}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-white/10 p-4 md:p-6 bg-white/[0.03] space-y-4">
            {errorMsg && <p className="text-red-400 text-xs font-mono">{errorMsg}</p>}

            <div className="flex items-center gap-3">
              <label className="text-[10px] font-mono uppercase text-white/40">PIN</label>
              <input
                type="password"
                value={pin}
                onChange={e => handlePinChange(e.target.value)}
                placeholder="Enter PIN"
                maxLength={10}
                autoComplete="new-password"
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-white/40 w-32"
              />
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-mono uppercase text-white/30 border-b border-white/10 pb-1">Live Progress</p>
              <div className="flex flex-wrap gap-2 items-center">
                <select
                  value={progressLeader}
                  onChange={e => setProgressLeader(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-xs font-mono text-white focus:outline-none"
                >
                  <option value="Blue Hackers">Blue Hackers</option>
                  <option value="All Square">All Square</option>
                  <option value="Pink Addicts">Pink Addicts</option>
                </select>
                <span className="text-[10px] font-mono text-white/30">up</span>
                <select
                  value={holesUp}
                  onChange={e => setHolesUp(Number(e.target.value))}
                  disabled={progressLeader === 'All Square'}
                  className="bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-xs font-mono text-white focus:outline-none disabled:opacity-30"
                >
                  {[0,1,2,3,4,5,6,7,8,9].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <span className="text-[10px] font-mono text-white/30">thru hole</span>
                <select
                  value={holesPlayed}
                  onChange={e => setHolesPlayed(Number(e.target.value))}
                  className="bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-xs font-mono text-white focus:outline-none"
                >
                  {[1,2,3,4,5,6,7,8,9].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <button
                  onClick={() => handleProgress(match.id)}
                  disabled={submitting}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-[10px] font-mono uppercase text-white/60 hover:text-white transition-all disabled:opacity-30"
                >
                  {submitting ? '...' : 'Save'}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-mono uppercase text-white/30 border-b border-white/10 pb-1">Final Result</p>
              <input
                type="text"
                value={matchContext}
                onChange={e => setMatchContext(e.target.value.slice(0, 5))}
                placeholder="Score e.g. 4&3 (optional, wins only)"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white placeholder-white/20 focus:outline-none focus:border-white/20"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleResult(match.id, 'Blue Hackers', matchContext)}
                  disabled={submitting}
                  className="flex-1 py-2 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/30 rounded-lg text-xs font-mono font-bold text-blue-400 hover:text-blue-300 transition-all disabled:opacity-30"
                >
                  Blue Wins
                </button>
                <button
                  onClick={() => handleResult(match.id, 'Draw')}
                  disabled={submitting}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/15 border border-white/20 rounded-lg text-xs font-mono font-bold text-white/60 hover:text-white transition-all disabled:opacity-30"
                >
                  Halved
                </button>
                <button
                  onClick={() => handleResult(match.id, 'Pink Addicts', matchContext)}
                  disabled={submitting}
                  className="flex-1 py-2 bg-pink-500/20 hover:bg-pink-500/40 border border-pink-500/30 rounded-lg text-xs font-mono font-bold text-pink-400 hover:text-pink-300 transition-all disabled:opacity-30"
                >
                  Pink Wins
                </button>
              </div>
            </div>

            {status === 'final' && (
              <div className="pt-1 border-t border-white/5">
                <button
                  onClick={() => handleReset(match.id)}
                  disabled={submitting}
                  className="text-[9px] font-mono text-white/20 hover:text-red-400 transition-colors uppercase"
                >
                  Reset Match
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 md:space-y-12 max-w-2xl">
      <div className="flex justify-center">
        <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
          {['Thursday', 'Friday', 'Saturday'].map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day as any)}
              className={`px-3 py-2 md:px-8 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${
                selectedDay === day ? 'bg-white text-black' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8 md:space-y-16">
        <section className="space-y-4 md:space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight">Front 9 Matches</h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-1 gap-6">
            {front9Matches.length > 0 ? (
              front9Matches.map(renderMatch)
            ) : (
              <p className="text-center py-12 opacity-30 font-mono text-xs italic">No matches scheduled for this session</p>
            )}
          </div>
        </section>

        <section className="space-y-4 md:space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight">Back 9 Matches</h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-1 gap-6">
            {back9Matches.length > 0 ? (
              back9Matches.map(renderMatch)
            ) : (
              <p className="text-center py-12 opacity-30 font-mono text-xs italic">No matches scheduled for this session</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function ScheduleView() {
  const [selectedDay, setSelectedDay] = useState(SCHEDULE[0].day);
  const day = SCHEDULE.find(d => d.day === selectedDay)!;

  return (
    <div className="space-y-6 md:space-y-10">
      {/* Day Selector */}
      <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-1">
        {SCHEDULE.map(d => (
          <button
            key={d.day}
            onClick={() => setSelectedDay(d.day)}
            className={`shrink-0 px-3 py-1.5 md:px-6 md:py-3 rounded-xl text-[10px] md:text-sm font-bold font-mono transition-all border ${
              selectedDay === d.day
                ? 'bg-white text-black border-white'
                : 'border-white/10 text-white/40 hover:text-white/70 bg-white/5'
            }`}
          >
            {d.day.slice(0, 3)} {d.date}
          </button>
        ))}
      </div>

      {/* Day Header */}
      <div>
        <h2 className="text-[1.3125rem] md:text-3xl font-display font-bold tracking-tight">
          {day.day} the {(day as any).date}
        </h2>
        <p className="flex items-center gap-2 text-emerald-500 font-mono uppercase tracking-widest text-[0.525rem] md:text-xs mt-2">
          <MapPin size={12} /> {day.location}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[7px] top-3 bottom-3 w-px bg-emerald-500/25" />
        <div className="space-y-3 md:space-y-5">
          {day.events.map((event, eIdx) => (
            <div key={eIdx} className="flex items-start gap-5">
              <div className="shrink-0 w-[15px] flex justify-center mt-5 relative z-10">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
              <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-5 md:p-7">
                <p className="text-emerald-500 font-mono text-[0.6125rem] md:text-sm font-bold mb-2">{event.time}</p>
                <p className="text-white font-display font-bold text-sm md:text-xl">{event.activity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface CrewMember {
  name: string;
  nickname: string;
  handicap: number;
  age: number;
  phone?: string;
  image: string;
  likes: string[];
  dislikes: string[];
  team: 'Blue Hackers' | 'Pink Addicts';
}

const CREW: CrewMember[] = [
  // Blue Hackers
  { name: 'Kyle Swart',      nickname: 'Super',                handicap: 4,  age: 40, phone: '(318) 245-9150', team: 'Blue Hackers',  image: swartPic,  likes: ['Turf care and feeding', 'Playing top 100 courses', 'Radon mitigation systems'], dislikes: ['Losing in anything to anyone', 'Poorly manicured fairways'] },
  { name: 'Troy Thompson',   nickname: 'BM3',                  handicap: 9,  age: 47, phone: '(402) 598-4146', team: 'Blue Hackers',  image: troyPic,   likes: ['BMWs', 'Golf clubs from last century', 'Apples', 'Boobs'], dislikes: ['Dirty automobiles', 'Kids on payroll', 'Digesting food'] },
  { name: 'Eric Wakefield',  nickname: 'Old Man',              handicap: 11, age: 57, phone: '(402) 779-1977', team: 'Blue Hackers',  image: ericPic,   likes: ['Monthly country club dues', 'Dinners at 4pm', 'Bocce Ball'], dislikes: ['Hip dips', 'That "Rap" music', 'Cellular phones'] },
  { name: 'Jeff Fitzke',     nickname: 'Out of Bounds Right!', handicap: 12, age: 50, phone: '(402) 981-2314', team: 'Blue Hackers',  image: fitzkePic, likes: ['Raw steak', 'Green golf balls', 'The field of tall grass right of the deep rough'], dislikes: ['Being sober', 'Unchopped wood', 'Unopened wine bottles'] },
  { name: 'Karl Rohrbaugh',  nickname: 'Life',                 handicap: 14, age: 51, phone: '(402) 301-3481', team: 'Blue Hackers',  image: karlPic,   likes: ['Traveling to new places', 'Afternoon naps', 'High-thread-count sheets', 'Setting phone to DND'], dislikes: ['Tangled cords', 'Bad IKEA instructions', 'Quadruple bogeys on short par 4s'] },
  // Pink Addicts
  { name: 'Mike Sorum',      nickname: 'Commish',              handicap: 7,  age: 45, phone: '(402) 616-7933', team: 'Pink Addicts',  image: mikePic,   likes: ['Making plans', 'Bossing people around', 'Buying golf gear', 'Angry tirades under his breath'], dislikes: ['People that do not follow his plans', 'Richards', 'Golf without gambling'] },
  { name: 'Rob Fabian',      nickname: 'Drunk Dont Care',      handicap: 12, age: 44, phone: '(402) 980-5611', team: 'Pink Addicts',  image: robPic,    likes: ['Breadsticks','Sailor Jerry', 'Banana slices', 'Staircase slides'], dislikes: ['Diabetes','Fun haters', 'Virgin margaritas'] },
  { name: 'Kevin DeMarco',   nickname: 'Outs',                 handicap: 16, age: 40, phone: '(630) 335-6050', team: 'Pink Addicts',  image: kevinPic,  likes: ['Any chance to win on river', 'Building amazing simulators for his friends', 'Counting numbers'], dislikes: ['Breaking 90', 'Swinging less than 120%', 'Low limit BJ tables'] },
  { name: 'Kyle Koehler',    nickname: 'Killer',               handicap: 18, age: 45, phone: '(402) 540-1990', team: 'Pink Addicts',  image: kyleKPic,  likes: ['High paying contracts', 'Silencers', 'Long-range rifles', 'John Wick movies'], dislikes: ['Losing to Sorum', 'Jammed up firing pins', 'Antonio Banderas'] },
  { name: 'Scott Kardell',   nickname: 'Chill',                handicap: 20, age: 56, phone: '(402) 981-7211', team: 'Pink Addicts',  image: scottPic,  likes: ['The beach', 'Slow jazz music', 'Ice tea', 'Thai massages'], dislikes: ["Eric's face", 'Frowning'] },
];

function CrewView() {
  const blueTeam = CREW.filter(p => p.team === 'Blue Hackers');
  const pinkTeam = CREW.filter(p => p.team === 'Pink Addicts');

  return (
    <div className="space-y-14">
      <div>
        <h2 className="text-3xl font-display font-bold tracking-tight">The Crew</h2>
        <p className="text-emerald-500 font-mono uppercase tracking-widest text-xs mt-2">10 Golfers · 2 Teams · 1 Cup</p>
      </div>

      {/* Blue Hackers */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          <h3 className="text-xl font-display font-bold text-blue-400 tracking-tight">Blue Hackers</h3>
          <div className="h-px flex-1 bg-blue-500/20" />
          <span className="text-xl font-mono text-blue-400/60 uppercase tracking-widest">HCP {blueTeam.reduce((s, p) => s + p.handicap, 0)}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blueTeam.map(player => (
            <PlayerCard key={player.name} player={player} />
          ))}
        </div>
      </div>

      {/* Pink Addicts */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
          <h3 className="text-xl font-display font-bold text-pink-400 tracking-tight">Pink Addicts</h3>
          <div className="h-px flex-1 bg-pink-500/20" />
          <span className="text-xl font-mono text-pink-400/60 uppercase tracking-widest">HCP {pinkTeam.reduce((s, p) => s + p.handicap, 0)}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pinkTeam.map(player => (
            <PlayerCard key={player.name} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlayerCard({ player }: { player: CrewMember }) {
  return (
    <div className="glass-panel rounded-3xl overflow-hidden flex flex-col">
      {/* Photo */}
      <div className="relative aspect-square md:aspect-3/4 overflow-hidden">
        <img
          src={player.image}
          alt={player.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest ${
          player.team === 'Blue Hackers'
            ? 'bg-blue-500/80 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]'
            : 'bg-pink-500/80 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]'
        }`}>
          {player.team}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-display font-bold leading-tight">{player.name}</h3>
          <p className="text-base font-mono text-white mt-1">Nickname: {player.nickname}</p>
          {player.phone && (
            <p className="text-xs font-mono text-white/50 mt-1">{player.phone}</p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10">
        <div className="p-4 text-center">
          <p className="text-2xl font-display font-bold">{player.handicap}</p>
          <p className="text-[10px] font-mono uppercase opacity-40 mt-1">Handicap</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-2xl font-display font-bold">{player.age}</p>
          <p className="text-[10px] font-mono uppercase opacity-40 mt-1">Age</p>
        </div>
      </div>

      {/* Likes */}
      <div className="p-6 border-b border-white/10 flex-1">
        <p className="text-[10px] font-mono uppercase font-bold mb-3 flex items-center gap-2 text-emerald-500">
          <ThumbsUp size={11} /> Likes
        </p>
        {player.likes.length > 0 ? (
          <ul className="space-y-2">
            {player.likes.map((item, i) => (
              <li key={i} className="text-sm opacity-70 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs opacity-25 italic font-mono">Coming soon...</p>
        )}
      </div>

      {/* Dislikes */}
      <div className="p-6">
        <p className="text-[10px] font-mono uppercase font-bold mb-3 flex items-center gap-2 text-red-400">
          <ThumbsDown size={11} /> Dislikes
        </p>
        {player.dislikes.length > 0 ? (
          <ul className="space-y-2">
            {player.dislikes.map((item, i) => (
              <li key={i} className="text-sm opacity-70 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs opacity-25 italic font-mono">Coming soon...</p>
        )}
      </div>
    </div>
  );
}

function RulesView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section className="glass-panel p-5 md:p-8 rounded-3xl">
        <h3 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-8 flex items-center gap-3">
          <ShieldCheck className="accent-text" />
          Tournament Rules
        </h3>
        <ul className="space-y-4 md:space-y-8">
          {RULES.map((rule, idx) => (
            <li key={idx} className="flex gap-3 md:gap-6 items-start group">
              <span className="font-mono text-xs md:text-[15px] opacity-20 group-hover:opacity-100 transition-opacity mt-1 font-bold">0{idx + 1}</span>
              <p className="text-sm md:text-lg leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{rule}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass-panel p-5 md:p-8 rounded-3xl">
        <h3 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-8 flex items-center gap-3">
          <Gift className="accent-text" />
          Cash & Prizes
        </h3>
        <div className="space-y-3 md:space-y-4">
          {PRIZES.map((prize, idx) => (
            <div key={idx} className="p-4 md:p-6 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center group hover:bg-white hover:text-black transition-all duration-500 cursor-default">
              <div>
                <p className="text-xs md:text-[15px] font-mono uppercase opacity-40 group-hover:opacity-60 font-bold mb-1">{prize.rank}</p>
                <p className="font-bold text-base md:text-xl tracking-tight">{prize.reward}</p>
              </div>
              <ChevronRight className="opacity-20 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ArchiveView() {
  const [selectedYear, setSelectedYear] = useState<number>(ARCHIVE_DATA[0].year);
  const entry = ARCHIVE_DATA.find(d => d.year === selectedYear)!;

  return (
    <div className="space-y-8">
      <div className="mb-4">
        <h2 className="text-2xl font-display font-bold mb-2 tracking-tight flex items-center gap-3">
          <BookOpen className="accent-text" />
          H&amp;A Open Archive
        </h2>
        <p className="text-xs font-mono uppercase tracking-widest opacity-40">2020 – 2025 · Event History</p>
      </div>

      {/* Year Selector */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {ARCHIVE_DATA.map(d => (
          <button
            key={d.year}
            onClick={() => setSelectedYear(d.year)}
            className={`px-3 py-1.5 md:px-5 md:py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition-all border ${
              selectedYear === d.year
                ? 'bg-emerald-500 text-black border-emerald-500'
                : 'border-white/10 text-white/40 hover:text-emerald-500 hover:border-emerald-500/40'
            }`}
          >
            {d.year}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location & Courses */}
        <section className="glass-panel p-8 rounded-3xl space-y-6">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-1">Main Location</p>
            <p className="text-2xl font-display font-bold flex items-center gap-2">
              <MapPin size={18} className="text-emerald-500 flex-shrink-0" />
              {entry.location}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-3">Courses Played</p>
            <ul className="space-y-2">
              {entry.courses.map((course, i) => (
                <li key={i} className="flex items-center gap-2 text-sm opacity-80">
                  <span className="font-mono text-emerald-500 opacity-60">0{i + 1}</span>
                  {course}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-2">Winner</p>
            <p className="text-xl font-bold text-emerald-400 flex items-center gap-2">
              <Trophy size={18} />
              {entry.winningTeam}
            </p>
          </div>
        </section>

        {/* Teams & Scores */}
        <section className="glass-panel p-8 rounded-3xl space-y-6">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">Teams &amp; Final Score</p>
          {entry.teams.map((team, idx) => (
            <div key={team.name} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <div className="flex justify-between items-center">
                <p className={`font-bold text-lg ${team.name.toLowerCase().includes('black') ? 'text-white' : idx === 0 ? 'text-blue-400' : 'text-pink-400'}`}>
                  {team.name}
                </p>
                <span className={`text-3xl font-display font-bold ${team.name.toLowerCase().includes('black') ? 'text-white' : idx === 0 ? 'text-blue-400' : 'text-pink-400'}`}>
                  {(entry.year === 2022 || entry.year === 2023)
                    ? (entry.winningTeam === team.name ? '1UP' : '')
                    : entry.year === 2020
                    ? ''
                    : team.score}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {team.players.map(player => (
                  <span key={player} className="text-[11px] font-mono px-2 py-1 rounded-lg bg-white/5 border border-white/5 opacity-70">
                    {player}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Special Notes */}
      <section className="glass-panel p-8 rounded-3xl">
        <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-4">Special Notes</p>
        <p className="text-base leading-relaxed opacity-70">{entry.notes}</p>
      </section>
    </div>
  );
}