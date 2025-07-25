import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store, persistor } from './features/store';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={<h5 className="text-center mt-5">Loading...</h5>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
