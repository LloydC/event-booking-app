import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { AuthProviderWrapper } from './context/auth-context';
import App from './App';

let container = document.getElementById('root');
let root = createRoot(container);
root.render(
        <Router>
            <AuthProviderWrapper>
                <App/>
            </AuthProviderWrapper>
        </Router>
        );

// ReactDOM.render(
//   <React.StrictMode>
//     <App />,
//   </React.StrictMode>,
//   document.getElementById('root')
// );
