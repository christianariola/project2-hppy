import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import { DashboardTheme } from './dashboard/DashboardTheme';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
            <Route path="/*" element={<App />} />
        </Routes>
      </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
