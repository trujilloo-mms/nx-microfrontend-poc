import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import React, { StrictMode } from 'react';

import App from './app/app';

declare global {
  interface Window {
    renderMyapp2: (containerId: string) => void;
    unmountMyApp2: (containerId: string) => void;
  }
}

window.renderMyapp2 = (containerId) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById(containerId)
  );
};

window.unmountMyApp2 = (containerId) => {
  const el = document.getElementById(containerId);
  if (!el) {
    return;
  }

  ReactDOM.unmountComponentAtNode(el);
};
