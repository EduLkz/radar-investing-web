import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './Components/store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter basename="/radar-invest">
      <App />
    </BrowserRouter>
  </Provider>
);


reportWebVitals();
