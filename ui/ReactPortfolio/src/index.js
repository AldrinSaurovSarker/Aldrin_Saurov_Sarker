import { GoogleOAuthProvider } from '@react-oauth/google';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Portfolio styles
import './Portfolio/css/dark-mode.css';
import './Portfolio/css/education.css';
import './Portfolio/css/experience.css';
import './Portfolio/css/extra.css';
import './Portfolio/css/greetings.css';
import './Portfolio/css/navbar.css';
import './Portfolio/css/skill.css';
import './Portfolio/css/social-media.css';
import './Portfolio/css/tool.css';

// Memory Game styles
import './Games/Memory Games/css/home-page.css';
import './Games/Memory Games/css/statistics.css';
import './Games/Memory Games/css/style.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

const CLIENT_ID = "939356123519-7jrcipuoqk4270b12jpclgho3llhrouc.apps.googleusercontent.com"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
