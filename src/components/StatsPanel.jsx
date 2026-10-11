import React, { useState } from 'react';
import { 
  Flame, 
  Check, 
  Sparkles, 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  Lock
} from 'lucide-react';

const StatsPanel = ({
  mode,
  onModeChange,
  streak,
  isSolvedToday,
  completedCount,
  totalQuestions,
  masteredNodesCount,
  totalNodes,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const percent = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;

  if (isCollapsed) {
    return (
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 border border-stone-200/90 shadow-lg text-xs font-bold text-stone-800 hover:bg-stone-50 transition-all hover:scale-105"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Stats & Modes</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        </button>
      </div>
    );
  }

  return (
    <aside className="absolute top-5 right-5 z-20 w-80 bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-5 shadow-xl shadow-stone-900/5 select-none transition-all">
      {/* Top Header & Collapse button */}
      <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-stone-700">
            Progress & Mode
          </span>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          title="Collapse Panel"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2 MODES TOGGLE: Revision vs Interview */}
      <div className="mt-4">
        <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
          Learning Mode
        </label>
        <div className="grid grid-cols-2 p-1 bg-stone-100/90 rounded-2xl gap-1 border border-stone-200/60">
          <button
            onClick={() => onModeChange('revision')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              mode === 'revision'
                ? 'bg-white text-purple-900 shadow-sm border border-purple-200/70'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-purple-600" />
            <span>Revision</span>
          </button>

          <button
            onClick={() => onModeChange('interview')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              mode === 'interview'
                ? 'bg-[#FEF08A] text-amber-950 shadow-sm border border-yellow-300 font-black'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
            <span>Interview</span>
          </button>
        </div>

        {/* Mode explanation tag */}
        <p className="mt-2 text-[11px] text-stone-500 leading-relaxed font-medium">
          {mode === 'revision' ? (
            <span className="text-purple-900 bg-purple-50/80 px-2 py-1 rounded-lg inline-block border border-purple-100">
              🔒 <strong className="text-purple-950">Prerequisite Gated:</strong> Solve parent nodes to unlock.
            </span>
          ) : (
            <span className="text-amber-900 bg-amber-50 px-2 py-1 rounded-lg inline-block border border-amber-200/70">
              ⚡ <strong className="text-amber-950">All Unlocked:</strong> Jump into any topic for rapid prep!
            </span>
          )}
        </p>
      </div>

      {/* PASTEL METRIC CARDS */}
      <div className="mt-5 space-y-3 pt-4 border-t border-stone-100">
        {/* Pastel Streak Card (Peach / Apricot) */}
        <div className="p-3.5 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl text-white shadow-sm ${streak > 0 ? 'bg-orange-500' : 'bg-stone-400'}`}>
                <Flame className={`w-4 h-4 fill-white ${streak > 0 ? 'animate-bounce' : ''}`} />
              </div>
              <div>
                <p className="text-[11px] text-orange-800 font-semibold">Daily Streak</p>
                <h4 className="text-sm font-black text-orange-950">{streak} Day Streak</h4>
              </div>
            </div>
            <span className="text-base">{streak > 0 ? '🔥' : '🌱'}</span>
          </div>
          <p className="mt-2 text-[11px] text-orange-700 font-medium">
            {streak === 0
              ? 'Solve 1 question today to start your streak!'
              : isSolvedToday
              ? '✓ Streak extended for today! Keep it burning tomorrow ✨'
              : '⚡ Solve a question today to maintain your streak!'}
          </p>
        </div>

        {/* Pastel Solved Progress Card (Baby Sky Blue) */}
        <div className="p-3.5 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-sky-800">Total Solved</span>
            <span className="text-xs font-black text-sky-950">
              {completedCount} of {totalQuestions} <span className="text-sky-600 font-normal">({percent}%)</span>
            </span>
          </div>
          <div className="w-full bg-[#E0F2FE] rounded-full h-2.5 overflow-hidden p-0.5">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Pastel Topics Mastered Card (Fresh Mint) */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-sm">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <p className="text-[11px] text-emerald-800 font-semibold">Topics Mastered</p>
              <h4 className="text-sm font-black text-emerald-950">
                {masteredNodesCount} / {totalNodes} Topics
              </h4>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-emerald-600" />
        </div>
      </div>
    </aside>
  );
};

export default StatsPanel;
