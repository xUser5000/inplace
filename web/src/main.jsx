import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Provider } from 'react-redux';
import store from './store'
import i18n from './i18n'
import { I18nextProvider } from 'react-i18next';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ChakraProvider>
      <React.StrictMode>
      <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
      </I18nextProvider>
      
      </React.StrictMode>
    </ChakraProvider>
  </Provider>
);
