import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState,
  MarkerType
} from '@xyflow/react';
import confetti from 'canvas-confetti';

import { INITIAL_ROADMAP } from './data/roadmapData';
import DSAFlowNode from './components/DSAFlowNode';
import NodeDrawer from './components/NodeDrawer';
import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import AuthModal from './components/AuthModal';
import { 
  subscribeToAuth, 
  saveUserProgressToCloud, 
  loadUserProgressFromCloud 
} from './services/firebase';

const nodeTypes = {
  dsaNode: DSAFlowNode,
};

// Date helpers for Real Calendar Streaks
const getLocalDateString = (d = new Date()) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getYesterdayDateString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
};

export default function App() {
  // State for Mode: 'revision' (gated) vs 'interview' (all unlocked)
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem('algotree_mode');
      return saved === 'interview' ? 'interview' : 'revision';
    } catch {
      return 'revision';
    }
  });

  // User progress state
  const [completedQuestions, setCompletedQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('algotree_completed_questions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('algotree_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Real calendar streak state
  const [lastSolvedDate, setLastSolvedDate] = useState(() => {
    try {
      return localStorage.getItem('algotree_last_solved_date') || null;
    } catch {
      return null;
    }
  });

  const [streak, setStreak] = useState(() => {
    try {
      const savedStreak = parseInt(localStorage.getItem('algotree_streak') || '0', 10);
      const savedDate = localStorage.getItem('algotree_last_solved_date');
      const today = getLocalDateString();
      const yesterday = getYesterdayDateString();

      if (!savedDate || savedStreak <= 0) return 0;
      // If solved today or yesterday, streak is currently maintained
      if (savedDate === today || savedDate === yesterday) {
        return savedStreak;
      }
      // Missed more than 1 day: streak reset to 0
      return 0;
    } catch {
      return 0;
    }
  });

  // UI States
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lockWarning, setLockWarning] = useState(null);

  // Subscribe to Firebase Auth
  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.uid) {
        const cloudData = await loadUserProgressFromCloud(currentUser.uid);
        if (cloudData) {
          if (cloudData.completedQuestions) {
            setCompletedQuestions(cloudData.completedQuestions);
          }
          if (cloudData.notes) {
            setNotes(cloudData.notes);
          }
          if (cloudData.streak !== undefined) {
            setStreak(cloudData.streak);
          }
          if (cloudData.lastSolvedDate) {
            setLastSolvedDate(cloudData.lastSolvedDate);
          }
          if (cloudData.mode) {
            setMode(cloudData.mode);
          }
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Save progress locally and to Cloud Firestore
  useEffect(() => {
    localStorage.setItem('algotree_completed_questions', JSON.stringify(completedQuestions));
    localStorage.setItem('algotree_notes', JSON.stringify(notes));
    localStorage.setItem('algotree_streak', streak.toString());
    localStorage.setItem('algotree_last_solved_date', lastSolvedDate || '');
    localStorage.setItem('algotree_mode', mode);

    if (user?.uid) {
      saveUserProgressToCloud(user.uid, {
        completedQuestions,
        notes,
        streak,
        lastSolvedDate,
        mode,
      });
    }
  }, [completedQuestions, notes, streak, lastSolvedDate, mode, user]);

  // Map of nodes by ID
  const nodeMap = useMemo(() => {
    const map = {};
    INITIAL_ROADMAP.forEach(n => { map[n.id] = n; });
    return map;
  }, []);

  // Compute Mastered and Unlocked states for all nodes
  const nodeStatusMap = useMemo(() => {
    const statusMap = {};

    const isNodeMastered = (nodeId) => {
      const node = nodeMap[nodeId];
      if (!node || !node.questions.length) return false;
      return node.questions.every(q => completedQuestions.includes(q.id));
    };

    INITIAL_ROADMAP.forEach(node => {
      const totalQ = node.questions.length;
      const solvedQ = node.questions.filter(q => completedQuestions.includes(q.id)).length;
      const allMastered = totalQ > 0 && solvedQ === totalQ;

      // In interview mode: EVERYTHING is unlocked!
      // In revision mode: only unlocked if all prerequisites are mastered.
      const isInterviewMode = mode === 'interview';
      const prereqsSatisfied = isInterviewMode || 
        node.prerequisites.length === 0 || 
        node.prerequisites.every(prereqId => isNodeMastered(prereqId));

      let status = 'locked';
      if (prereqsSatisfied) {
        if (allMastered) {
          status = 'completed';
        } else if (solvedQ > 0) {
          status = 'in-progress';
        } else {
          status = 'available';
        }
      }

      statusMap[node.id] = {
        status,
        totalQuestions: totalQ,
        completedCount: solvedQ,
        isMastered: allMastered,
        isUnlocked: prereqsSatisfied,
        prerequisiteNames: node.prerequisites.map(pid => nodeMap[pid]?.title || pid),
      };
    });

    return statusMap;
  }, [completedQuestions, nodeMap, mode]);

  // Derived React Flow Nodes
  const flowNodes = useMemo(() => {
    return INITIAL_ROADMAP.map((node) => {
      const info = nodeStatusMap[node.id] || {};
      const isMatchSearch = !searchQuery || 
        node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.questions.some(q => q.title.toLowerCase().includes(searchQuery.toLowerCase()) || q.useCase.toLowerCase().includes(searchQuery.toLowerCase()));

      return {
        id: node.id,
        type: 'dsaNode',
        position: node.position,
        data: {
          title: node.title,
          level: node.level,
          totalQuestions: info.totalQuestions || 0,
          completedCount: info.completedCount || 0,
          status: info.status || 'locked',
          prerequisiteNames: info.prerequisiteNames || [],
        },
        selected: selectedNodeId === node.id,
        className: !isMatchSearch ? 'opacity-25 transition-opacity' : 'transition-opacity',
      };
    });
  }, [nodeStatusMap, searchQuery, selectedNodeId]);

  // Derived React Flow Edges
  const flowEdges = useMemo(() => {
    const edges = [];
    INITIAL_ROADMAP.forEach((node) => {
      node.prerequisites.forEach((prereqId) => {
        const sourceInfo = nodeStatusMap[prereqId];
        const isSourceCompleted = sourceInfo?.isMastered;

        edges.push({
          id: `edge-${prereqId}->${node.id}`,
          source: prereqId,
          target: node.id,
          type: 'smoothstep',
          animated: isSourceCompleted,
          style: {
            stroke: isSourceCompleted ? '#059669' : mode === 'interview' ? '#78716C' : '#9CA3AF',
            strokeWidth: isSourceCompleted ? 2.5 : 2,
            strokeDasharray: isSourceCompleted ? undefined : '5,5',
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isSourceCompleted ? '#059669' : '#78716C',
            width: 14,
            height: 14,
          },
        });
      });
    });
    return edges;
  }, [nodeStatusMap, mode]);

  const [nodes, setNodes, onNodesChange] = useNodesState(flowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowEdges);

  useEffect(() => {
    setNodes(flowNodes);
  }, [flowNodes, setNodes]);

  useEffect(() => {
    setEdges(flowEdges);
  }, [flowEdges, setEdges]);

  // Handle clicking a node
  const onNodeClick = useCallback((_, node) => {
    const info = nodeStatusMap[node.id];
    if (info && !info.isUnlocked) {
      const prereqNames = info.prerequisiteNames.join(' & ');
      setLockWarning(`Complete "${prereqNames}" first to unlock this topic 🌱 (or switch to Interview Mode!)`);
      setTimeout(() => setLockWarning(null), 4000);
      return;
    }
    setSelectedNodeId(node.id);
  }, [nodeStatusMap]);

  // Streak calculation engine
  const updateStreakOnSolve = useCallback(() => {
    const today = getLocalDateString();
    const yesterday = getYesterdayDateString();

    setStreak((prevStreak) => {
      let nextStreak = prevStreak;
      if (!lastSolvedDate) {
        nextStreak = 1;
      } else if (lastSolvedDate === today) {
        // Already solved today, keep current streak (at least 1)
        nextStreak = Math.max(1, prevStreak);
      } else if (lastSolvedDate === yesterday) {
        // Solved yesterday, extend streak by 1!
        nextStreak = prevStreak + 1;
      } else {
        // Missed a day, restart at 1
        nextStreak = 1;
      }
      return nextStreak;
    });

    setLastSolvedDate(today);
  }, [lastSolvedDate]);

  // Question toggling
  const handleToggleQuestion = (questionId, nodeId) => {
    const isCurrentlyChecked = completedQuestions.includes(questionId);
    let updated;
    if (isCurrentlyChecked) {
      updated = completedQuestions.filter(id => id !== questionId);
      if (updated.length === 0) {
        setStreak(0);
        setLastSolvedDate(null);
      }
    } else {
      updated = [...completedQuestions, questionId];
      updateStreakOnSolve();
    }
    setCompletedQuestions(updated);

    const targetNode = nodeMap[nodeId];
    if (targetNode && !isCurrentlyChecked) {
      const willBeAllDone = targetNode.questions.every(q => 
        q.id === questionId || updated.includes(q.id)
      );

      if (willBeAllDone) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#059669', '#EA580C', '#7C3AED', '#0284C7']
        });
      }
    }
  };

  // Mark all questions in a node as solved
  const handleMarkAll = (nodeId) => {
    const targetNode = nodeMap[nodeId];
    if (!targetNode) return;
    const newIds = targetNode.questions.map(q => q.id);
    const combined = Array.from(new Set([...completedQuestions, ...newIds]));
    setCompletedQuestions(combined);
    updateStreakOnSolve();

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Reset a single node's questions
  const handleResetNode = (nodeId) => {
    const targetNode = nodeMap[nodeId];
    if (!targetNode) return;
    const nodeQIds = new Set(targetNode.questions.map(q => q.id));
    setCompletedQuestions(prev => prev.filter(id => !nodeQIds.has(id)));
  };

  // Reset everything
  const handleResetAll = () => {
    if (window.confirm('Reset all your progress across the entire roadmap?')) {
      setCompletedQuestions([]);
      setNotes({});
      setStreak(0);
      setLastSolvedDate(null);
    }
  };

  // Save note per question
  const handleSaveNote = (questionId, noteText) => {
    setNotes(prev => ({
      ...prev,
      [questionId]: noteText
    }));
  };

  const totalQuestions = useMemo(() => {
    return INITIAL_ROADMAP.reduce((acc, curr) => acc + curr.questions.length, 0);
  }, []);

  const totalMasteredNodes = useMemo(() => {
    return Object.values(nodeStatusMap).filter(info => info.isMastered).length;
  }, [nodeStatusMap]);

  const selectedNode = selectedNodeId ? nodeMap[selectedNodeId] : null;

  return (
    <div className="flex flex-col h-screen w-screen bg-[#FAF9F6] text-stone-900 overflow-hidden font-sans select-none">
      {/* Clean Top Header */}
      <Header
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onResetAll={handleResetAll}
      />

      {/* Main Roadmap Canvas */}
      <main className="flex-1 relative w-full h-full">
        {/* Floating Locked Warning Pill */}
        {lockWarning && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 rounded-full bg-stone-900 text-white shadow-xl text-xs font-semibold flex items-center gap-2">
            <span>{lockWarning}</span>
          </div>
        )}

        {/* Right Side Stats & Mode Widget (Requested in the red box area) */}
        <StatsPanel
          mode={mode}
          onModeChange={setMode}
          streak={streak}
          isSolvedToday={lastSolvedDate === getLocalDateString()}
          completedCount={completedQuestions.length}
          totalQuestions={totalQuestions}
          masteredNodesCount={totalMasteredNodes}
          totalNodes={INITIAL_ROADMAP.length}
        />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#9CA3AF" gap={24} size={1.8} variant="dots" />
          <Controls 
            showInteractive={false} 
            className="!m-5"
          />
          <MiniMap 
            nodeColor={(n) => {
              const status = n.data?.status;
              if (status === 'completed') return '#10B981';
              if (status === 'in-progress') return '#1C1917';
              if (status === 'available') return '#A8A29E';
              return '#E7E5E4';
            }}
            maskColor="rgba(250, 249, 246, 0.75)"
            className="!m-5"
          />
        </ReactFlow>

        {/* Minimalist Legend Pill */}
        <div className="absolute bottom-5 left-5 z-20 flex items-center gap-4 bg-white/95 border border-stone-200/90 shadow-md backdrop-blur-md px-4 py-2 rounded-full text-xs text-stone-600 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Mastered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-900"></span>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-400"></span>
            <span>Ready</span>
          </div>
          {mode === 'revision' && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-200"></span>
              <span className="text-stone-400">Locked</span>
            </div>
          )}
        </div>
      </main>

      {/* Slide-out Question & Review Drawer */}
      <NodeDrawer
        node={selectedNode}
        isOpen={Boolean(selectedNode)}
        onClose={() => setSelectedNodeId(null)}
        completedQuestions={completedQuestions}
        onToggleQuestion={handleToggleQuestion}
        notes={notes}
        onSaveNote={handleSaveNote}
        onMarkAll={handleMarkAll}
        onResetNode={handleResetNode}
      />

      {/* Cloud Sync Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onUserChange={setUser}
      />
    </div>
  );
}
