// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDJIGl7z31kVGm8IazMLbL5lI70I3qUrIY',
  authDomain: 'olx-project-965af.firebaseapp.com',
  projectId: 'olx-project-965af',
  storageBucket: 'olx-project-965af.firebasestorage.app',
  messagingSenderId: '44714218532',
  appId: '1:44714218532:web:c9700d929a19bb98b134b1',
  measurementId: 'G-FJVM49DZ13',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics, 'analytics');
export const db = getFirestore(app);
