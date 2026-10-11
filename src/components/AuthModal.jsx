import React, { useState } from 'react';
import { 
  X, 
  Check, 
  AlertCircle,
  LogOut,
  User
} from 'lucide-react';
import { 
  signInWithGoogle, 
  logoutUser, 
  isFirebaseActive 
} from '../services/firebase';

const AuthModal = ({ isOpen, onClose, user, onUserChange }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      if (!isFirebaseActive()) {
        setErrorMsg('Authentication service is temporarily unavailable. Please try again later.');
        setLoading(false);
        return;
      }
      const res = await signInWithGoogle();
      if (res?.user) {
        onUserChange(res.user);
        onClose();
      }
    } catch (e) {
      console.error(e);
      if (e.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Sign-in cancelled.');
      } else {
        setErrorMsg('Unable to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      onUserChange(null);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm select-none">
      <div className="w-full max-w-sm bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden animate-fade-in p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-black text-stone-900 tracking-tight">
              {user ? 'My Account' : 'Sign In'}
            </h3>
            <p className="text-xs text-stone-500 font-medium mt-1">
              {user ? 'Manage your account and cloud sync' : 'Sync your solved questions across all your devices'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {user ? (
          /* Logged In View */
          <div className="text-center py-2 space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 border-2 border-stone-200 flex items-center justify-center mx-auto text-xl font-bold text-stone-700 overflow-hidden shadow-sm">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
              ) : (
                <User className="w-7 h-7 text-stone-500" />
              )}
            </div>

            <div>
              <h4 className="text-base font-bold text-stone-900">{user.displayName || 'Learner'}</h4>
              <p className="text-xs text-stone-500">{user.email}</p>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 py-2 px-3 rounded-full">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Progress is automatically synced</span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-rose-600 rounded-full text-xs font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        ) : (
          /* Public Consumer Sign-In View */
          <div className="space-y-4 pt-2">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-5 bg-white hover:bg-stone-50 text-stone-900 font-bold rounded-full text-xs border-2 border-stone-200 shadow-sm hover:shadow transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <span className="text-stone-500">Connecting...</span>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-stone-400 text-center font-medium leading-relaxed px-2">
              You can also continue practicing as a guest — your progress is automatically saved on this device.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
