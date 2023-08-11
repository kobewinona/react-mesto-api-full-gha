import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import App from '../src/components/App';

import './index.css';
import reportWebVitals from './reportWebVitals';
import {DevSupport} from '@react-buddy/ide-toolbox';
import {ComponentPreviews, useInitial} from './dev';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </DevSupport>
  </React.StrictMode>
);

reportWebVitals();
