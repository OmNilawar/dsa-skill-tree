import React from 'react';
import { 
  Search, 
  RotateCcw,
  Cloud,
  Bookmark
} from 'lucide-react';

const Header = ({
  user,
  onOpenAuth,
  searchQuery,
  onSearchChange,
  onResetAll
}) => {
  return (
    <header className="z-30 border-b border-stone-200/80 bg-white/95 backdrop-blur-xl px-6 py-3.5 select-none shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-stone-900 flex items-center justify-center text-white shadow-md shadow-stone-900/10 shrink-0">
            <Bookmark className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-stone-900 tracking-tight">AlgoTree</h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200/60">
                DSA Roadmap
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium">Interactive pattern revision</p>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search concepts, patterns, or questions..."
              className="w-full pl-10 pr-4 py-2 bg-stone-100 hover:bg-stone-200/60 focus:bg-white border border-transparent focus:border-stone-300 rounded-full text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none transition-all shadow-inner font-medium"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onResetAll}
            title="Reset All Progress"
            className="p-2.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenAuth}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              user
                ? 'bg-stone-100 text-stone-800 border border-stone-200 hover:bg-stone-200'
                : 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm'
            }`}
          >
            {user ? (
              <>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-4 h-4 rounded-full object-cover" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-stone-300 text-[10px] flex items-center justify-center font-bold text-stone-700">
                    {user.email?.[0]?.toUpperCase()}
                  </span>
                )}
                <span>{user.displayName?.split(' ')[0] || 'My Account'}</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
