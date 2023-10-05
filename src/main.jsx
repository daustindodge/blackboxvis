import React from 'react';
import ReactDOM from 'react-dom/client';
import router from "./router.jsx";
import { RouterProvider } from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';

import './scss/styles.scss';
import * as bootstrap from 'bootstrap';
import {SortingContextProvider} from "./contexts/SortingContextProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <SortingContextProvider>
              <RouterProvider router={router} />
          </SortingContextProvider>
      </Provider>
  </React.StrictMode>,
)
