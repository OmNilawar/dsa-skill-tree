import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Lightbulb, 
  FileText, 
  Sparkles, 
  Check, 
  BookOpen,
  CheckCircle2
} from 'lucide-react';

const NodeDrawer = ({ 
  node, 
  isOpen, 
  onClose, 
  completedQuestions, 
  onToggleQuestion, 
  notes, 
  onSaveNote,
  onMarkAll,
  onResetNode
}) => {
  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'concept'
  const [openTips, setOpenTips] = useState({});
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempNoteText, setTempNoteText] = useState('');

  if (!isOpen || !node) return null;

  const totalQuestions = node.questions.length;
  const completedCount = node.questions.filter(q => completedQuestions.includes(q.id)).length;
  const isMastered = completedCount === totalQuestions && totalQuestions > 0;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100);

  const toggleTip = (questionId) => {
    setOpenTips(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const startEditNote = (questionId) => {
    setEditingNoteId(questionId);
    setTempNoteText(notes[questionId] || '');
  };

  const handleSaveNote = (questionId) => {
    onSaveNote(questionId, tempNoteText);
    setEditingNoteId(null);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white border-l border-stone-200 shadow-2xl flex flex-col transition-all duration-300">
      {/* Top Header */}
      <div className="p-6 border-b border-stone-100 bg-stone-50/50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                Level {node.level} • {node.category}
              </span>
              {isMastered && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  Mastered ✨
                </span>
              )}
            </div>
            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">{node.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-2 text-sm text-stone-500 leading-relaxed font-medium">
          {node.description}
        </p>

        {/* Friendly Progress bar */}
        <div className="mt-5 pt-4 border-t border-stone-200/60">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-stone-500 font-medium">Topic Completion</span>
            <span className="font-bold text-stone-800">
              {completedCount} of {totalQuestions} Solved ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-stone-200/80 rounded-full h-2.5 overflow-hidden p-0.5">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                isMastered ? 'bg-emerald-500' : 'bg-stone-900'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Pinterest Pill Tab Switcher */}
        <div className="flex items-center gap-2 mt-5 p-1 bg-stone-200/60 rounded-full w-fit">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'questions'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Practice Questions ({node.questions.length})
          </button>
          <button
            onClick={() => setActiveTab('concept')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'concept'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Quick Mental Model
          </button>
        </div>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {activeTab === 'questions' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-400 px-1">
              <span className="font-medium">Core benchmark questions:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onMarkAll(node.id)}
                  className="text-stone-800 hover:underline font-semibold"
                >
                  Mark all done
                </button>
                <span>•</span>
                <button
                  onClick={() => onResetNode(node.id)}
                  className="text-stone-400 hover:text-stone-600"
                >
                  Reset
                </button>
              </div>
            </div>

            {node.questions.map((question, idx) => {
              const isChecked = completedQuestions.includes(question.id);
              const isTipOpen = openTips[question.id];
              const userNote = notes[question.id];
              const isEditing = editingNoteId === question.id;

              return (
                <div 
                  key={question.id}
                  className={`rounded-3xl border transition-all duration-200 p-5 ${
                    isChecked 
                      ? 'border-emerald-200 bg-emerald-50/40' 
                      : 'border-stone-200/80 bg-stone-50/50 hover:bg-white hover:border-stone-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Friendly Checkbox */}
                    <button
                      onClick={() => onToggleQuestion(question.id, node.id)}
                      className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                          : 'border-stone-300 bg-white hover:border-stone-500 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    {/* Question Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200/60">
                          {question.useCase}
                        </span>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          question.difficulty === 'Easy'
                            ? 'text-emerald-700 bg-emerald-100/70'
                            : question.difficulty === 'Medium'
                            ? 'text-amber-800 bg-amber-100/70'
                            : 'text-rose-700 bg-rose-100/70'
                        }`}>
                          {question.difficulty}
                        </span>
                      </div>

                      <h4 className={`text-base font-bold mt-2 transition-colors ${
                        isChecked ? 'text-stone-400 line-through' : 'text-stone-900'
                      }`}>
                        {idx + 1}. {question.title}
                      </h4>

                      {/* Question Actions */}
                      <div className="flex items-center gap-3.5 mt-3.5">
                        <a
                          href={question.leetcodeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-900 font-bold underline transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Solve Problem
                        </a>

                        <button
                          onClick={() => toggleTip(question.id)}
                          className="flex items-center gap-1 text-xs text-amber-800 hover:text-amber-900 font-semibold transition-colors"
                        >
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                          {isTipOpen ? 'Hide Tip' : 'View Pattern Tip'}
                        </button>

                        <button
                          onClick={() => startEditNote(question.id)}
                          className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 font-medium transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          {userNote ? 'Edit Notes' : 'Add Note'}
                        </button>
                      </div>

                      {/* Pattern Tip Note (Pinterest sticky card) */}
                      {isTipOpen && (
                        <div className="mt-3.5 p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-900 leading-relaxed shadow-sm">
                          <p className="font-bold text-amber-950 mb-1 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> The Pattern Trick:
                          </p>
                          {question.patternTip}
                        </div>
                      )}

                      {/* Note Box */}
                      {isEditing && (
                        <div className="mt-3.5 p-3.5 rounded-2xl bg-white border border-stone-300 shadow-sm">
                          <textarea
                            value={tempNoteText}
                            onChange={(e) => setTempNoteText(e.target.value)}
                            placeholder="Write your personal notes or tricky edge cases here..."
                            rows={3}
                            className="w-full bg-transparent text-xs text-stone-800 outline-none resize-none placeholder:text-stone-400 font-medium"
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => setEditingNoteId(null)}
                              className="px-3 py-1 text-xs text-stone-500 hover:text-stone-800 font-medium"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveNote(question.id)}
                              className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-xs font-bold"
                            >
                              Save Note
                            </button>
                          </div>
                        </div>
                      )}

                      {!isEditing && userNote && (
                        <div className="mt-3.5 p-3 rounded-2xl bg-white border border-stone-200 text-xs text-stone-700">
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Your Personal Note:</p>
                          <p className="italic text-stone-800">{userNote}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Concept Intuition Tab */
          <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-stone-100/80 border border-stone-200/80">
              <h3 className="text-sm font-extrabold text-stone-900 flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                The Mental Model & Why It Matters
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {node.conceptSummary}
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                Interview Quick Checklist
              </h3>
              <ul className="space-y-2.5 text-xs text-stone-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-800 mt-1.5 shrink-0"></span>
                  <span>Always check for empty input, single-element collections, and negative numbers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-800 mt-1.5 shrink-0"></span>
                  <span>Ask yourself: Do I need $O(1)$ extra space, or can I trade memory for speed?</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-800 mt-1.5 shrink-0"></span>
                  <span>Practice stating the time and space complexity out loud before coding.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeDrawer;
