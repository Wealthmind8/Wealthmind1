
import React from 'react';
import { FinalReport, LevelScore } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import Button from './Button';

interface ReportViewProps {
  report: FinalReport;
  scores: LevelScore[];
  onRestart: () => void;
}

const ReportView: React.FC<ReportViewProps> = ({ report, scores, onRestart }) => {
  // Map scores to data format expected by RadarChart
  const radarData = scores.map(s => ({
    subject: `L${s.level}`,
    fullMark: 100,
    A: s.score
  }));

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-display font-bold gradient-text">Analysis Complete</h1>
        <p className="text-slate-400 text-xl">Your Thinking Profile has been mapped.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-8 rounded-3xl space-y-6 flex flex-col items-center justify-center text-center">
          <div className="w-48 h-48 rounded-full border-4 border-sky-500/30 flex items-center justify-center relative">
            <div className="text-center">
              <span className="text-sm uppercase tracking-widest text-sky-400 font-semibold">Estimated IQ</span>
              <div className="text-4xl font-display font-bold text-white">{report.overallIq}</div>
            </div>
            <div className="absolute inset-0 rounded-full animate-pulse border-2 border-sky-500/10"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Critical Thinking Score</h3>
            <div className="text-3xl font-display text-indigo-400">{report.criticalThinkingScore}/100</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl">
          <h3 className="text-lg font-semibold mb-4 text-center">Performance Matrix</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8' }} />
                <Radar
                  name="IQ Score"
                  dataKey="A"
                  stroke="#38bdf8"
                  fill="#38bdf8"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl space-y-6">
        <h3 className="text-2xl font-display font-bold text-sky-400">Personality Profile</h3>
        <p className="text-slate-300 leading-relaxed text-lg italic">
          "{report.personalityProfile}"
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {scores.map((s, idx) => (
            <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="text-xs text-slate-500 uppercase tracking-tighter">Level {s.level} Trait</div>
              <div className="font-semibold text-slate-200">{s.personalityTrait}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl space-y-4">
        <h3 className="text-2xl font-display font-bold text-indigo-400">Growth Strategy</h3>
        <ul className="space-y-3">
          {report.growthAreas.map((area, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-300">
              <span className="mt-1 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></span>
              {area}
            </li>
          ))}
        </ul>
      </div>

      {/* Restart section fix: Ensuring div is treated correctly by the JSX parser */}
      <div className="text-center pt-8">
        <Button onClick={onRestart} className="mx-auto w-full max-w-xs">
          Restart Journey
        </Button>
        <p className="mt-6 text-slate-500 text-sm">
          "Your journey in 360IQ shows your unique strengths. Keep developing your mind for innovation, resilience, and success."
        </p>
      </div>
    </div>
  );
};

export default ReportView;
