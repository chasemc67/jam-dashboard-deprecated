import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBu3gq2hzbr-goX3L3iJJ50IUbi8CtyPpo',
  authDomain: 'jam-dashboard.firebaseapp.com',
  projectId: 'jam-dashboard',
  storageBucket: 'jam-dashboard.appspot.com',
  messagingSenderId: '647129742245',
  appId: '1:647129742245:web:5f06f459e9218315ae464c',
  measurementId: 'G-SZKHJ1N49F',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
