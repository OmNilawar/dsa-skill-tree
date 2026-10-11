import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Lock, Check } from 'lucide-react';

// Soft, aesthetic Pinterest pastel palettes for each level
const PASTEL_THEMES = {
  1: {
    // Level 1: Soft Peach / Warm Apricot
    bg: 'bg-[#FFF7ED]',
    border: 'border-[#FED7AA]',
    hoverBorder: 'hover:border-[#FDBA74]',
    barTrack: 'bg-[#FFEDD5]',
    activeBorder: 'border-[#FB923C]',
    handle: '!bg-[#FB923C]',
  },
  2: {
    // Level 2: Fresh Mint / Sage
    bg: 'bg-[#F0FDF4]',
    border: 'border-[#BBF7D0]',
    hoverBorder: 'hover:border-[#86EFAC]',
    barTrack: 'bg-[#DCFCE7]',
    activeBorder: 'border-[#4ADE80]',
    handle: '!bg-[#4ADE80]',
  },
  3: {
    // Level 3: Soft Lavender / Lilac
    bg: 'bg-[#FAF5FF]',
    border: 'border-[#E9D5FF]',
    hoverBorder: 'hover:border-[#D8B4FE]',
    barTrack: 'bg-[#F3E8FF]',
    activeBorder: 'border-[#C084FC]',
    handle: '!bg-[#C084FC]',
  },
  4: {
    // Level 4: Baby Sky Blue
    bg: 'bg-[#F0F9FF]',
    border: 'border-[#BAE6FD]',
    hoverBorder: 'hover:border-[#7DD3FC]',
    barTrack: 'bg-[#E0F2FE]',
    activeBorder: 'border-[#38BDF8]',
    handle: '!bg-[#38BDF8]',
  },
  5: {
    // Level 5: Soft Buttercup / Warm Honey
    bg: 'bg-[#FEFCE8]',
    border: 'border-[#FEF08A]',
    hoverBorder: 'hover:border-[#FDE047]',
    barTrack: 'bg-[#FEF9C3]',
    activeBorder: 'border-[#FACC15]',
    handle: '!bg-[#FACC15]',
  },
  6: {
    // Level 6: Soft Blush Rose
    bg: 'bg-[#FFF1F2]',
    border: 'border-[#FECDD3]',
    hoverBorder: 'hover:border-[#FDA4AF]',
    barTrack: 'bg-[#FFE4E6]',
    activeBorder: 'border-[#FB7185]',
    handle: '!bg-[#FB7185]',
  },
};

const DSAFlowNode = ({ data, selected }) => {
  const {
    title,
    level = 1,
    totalQuestions,
    completedCount,
    status, // 'locked' | 'available' | 'in-progress' | 'completed'
    prerequisiteNames = [],
  } = data;

  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in-progress';
  const progressPercent = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;
  const theme = PASTEL_THEMES[level] || PASTEL_THEMES[1];

  return (
    <div
      className={`relative group w-72 rounded-3xl px-6 py-4.5 transition-all duration-200 ${
        isLocked
          ? 'bg-stone-100/80 border-2 border-stone-200/80 opacity-60 cursor-not-allowed'
          : isCompleted
          ? 'bg-[#ECFDF5] border-2 border-[#6EE7B7] shadow-[0_4px_16px_rgba(16,185,129,0.12)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.18)] hover:-translate-y-0.5'
          : isInProgress
          ? `${theme.bg} border-2 border-stone-800 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5`
          : `${theme.bg} border-2 ${theme.border} ${theme.hoverBorder} shadow-sm hover:shadow-md hover:-translate-y-0.5`
      } ${selected && !isLocked ? 'ring-2 ring-stone-900 ring-offset-2' : ''}`}
    >
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className={`!w-3.5 !h-3.5 !-top-2 !border-2 !border-white transition-colors ${
          isCompleted 
            ? '!bg-emerald-500' 
            : isLocked 
            ? '!bg-stone-300' 
            : theme.handle
        }`}
      />

      {/* Main Node Header: Bold Title + Lock/Check icon */}
      <div className="flex items-center justify-between gap-3 mb-3.5">
        <h3
          className={`text-[17px] font-black tracking-tight leading-tight ${
            isLocked ? 'text-stone-400' : 'text-stone-900'
          }`}
        >
          {title}
        </h3>

        {isLocked && (
          <div className="shrink-0 p-1.5 rounded-lg bg-stone-200/70 text-stone-500">
            <Lock className="w-4 h-4" />
          </div>
        )}

        {isCompleted && (
          <div className="shrink-0 p-1 rounded-full bg-emerald-500 text-white shadow-sm">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        )}
      </div>

      {/* Clean Pastel Progress Bar */}
      <div className={`w-full ${theme.barTrack} rounded-full h-2.5 overflow-hidden p-0.5 border border-stone-200/40`}>
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            progressPercent > 0 ? 'bg-emerald-500' : 'bg-transparent'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Gentle Tooltip on Hover if Locked */}
      {isLocked && prerequisiteNames.length > 0 && (
        <div className="pointer-events-none absolute left-1/2 -bottom-10 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap bg-stone-900 text-stone-100 text-[11px] font-semibold px-3 py-1.5 rounded-xl shadow-lg">
          Complete {prerequisiteNames.join(' & ')} first 🌱
        </div>
      )}

      {/* Bottom Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className={`!w-3.5 !h-3.5 !-bottom-2 !border-2 !border-white transition-colors ${
          isCompleted 
            ? '!bg-emerald-500' 
            : isLocked 
            ? '!bg-stone-300' 
            : theme.handle
        }`}
      />
    </div>
  );
};

export default memo(DSAFlowNode);
