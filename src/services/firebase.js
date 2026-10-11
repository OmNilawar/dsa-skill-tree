import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  signInAnonymously
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';

// Default / cached Firebase config from localStorage or env
const getSavedFirebaseConfig = () => {
  // Check import.meta.env first (.env file)
  if (import.meta.env.VITE_FIREBASE_API_KEY) {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };
  }

  // Fallback to custom config saved via UI modal in localStorage
  try {
    const saved = localStorage.getItem('algo_tree_firebase_config');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading saved firebase config', e);
  }

  return null;
};

let app = null;
let auth = null;
let db = null;
const googleProvider = new GoogleAuthProvider();

export const initFirebase = (customConfig = null) => {
  const config = customConfig || getSavedFirebaseConfig();
  if (!config || !config.apiKey) {
    return { initialized: false, error: 'No Firebase config provided' };
  }

  try {
    if (!getApps().length) {
      app = initializeApp(config);
    } else {
      app = getApps()[0];
    }
    auth = getAuth(app);
    db = getFirestore(app);
    return { initialized: true, auth, db };
  } catch (err) {
    console.warn('Firebase init error (using offline/local mode):', err.message);
    return { initialized: false, error: err.message };
  }
};

// Initialize on load
initFirebase();

export const isFirebaseActive = () => !!(auth && db);

// Auth functions
export const signInWithGoogle = async () => {
  if (!auth) throw new Error('Firebase is not configured. Please add your Firebase configuration.');
  return await signInWithPopup(auth, googleProvider);
};

export const signInGuest = async () => {
  if (!auth) throw new Error('Firebase is not configured.');
  return await signInAnonymously(auth);
};

export const logoutUser = async () => {
  if (auth) await fbSignOut(auth);
};

export const subscribeToAuth = (callback) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

// Cloud Firestore Sync functions
export const saveUserProgressToCloud = async (userId, data) => {
  if (!db || !userId) return false;
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return true;
  } catch (e) {
    console.error('Error saving to Cloud Firestore:', e);
    return false;
  }
};

export const loadUserProgressFromCloud = async (userId) => {
  if (!db || !userId) return null;
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (e) {
    console.error('Error fetching from Cloud Firestore:', e);
    return null;
  }
};

export const saveCustomFirebaseConfig = (config) => {
  try {
    localStorage.setItem('algo_tree_firebase_config', JSON.stringify(config));
    return initFirebase(config);
  } catch (e) {
    return { initialized: false, error: e.message };
  }
};
