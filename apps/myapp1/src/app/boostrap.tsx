import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import React, { StrictMode } from 'react';

import App from './app';

declare global {
  interface Window {
    renderMyapp1: (containerId: string) => void;
    unmountMyApp1: (containerId: string) => void;
  }
}

window.renderMyapp1 = (containerId) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById(containerId)
  );
};

window.unmountMyApp1 = (containerId) => {
  const el = document.getElementById(containerId);
  if (!el) {
    return;
  }

  ReactDOM.unmountComponentAtNode(el);
};