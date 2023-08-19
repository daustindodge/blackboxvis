import React from 'react';
import ReactDOM from 'react-dom/client';
import router from "./router.jsx";
import { RouterProvider } from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';

import './scss/styles.scss';
import * as bootstrap from 'bootstrap';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
