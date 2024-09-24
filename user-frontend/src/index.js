import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reduxStore/store';
import { I18nextProvider } from 'react-i18next'; // Add I18nextProvider for i18n
import i18next from 'i18next';

// Import your language translations
import global_vn from './translations/vn';
import global_en from './translations/en';

// Initialize i18next
i18next.init({
    interpolation: { escapeValue: false }, // Fix syntax here
    lng: 'vn', // Set default language
    resources: {
        vn: {
            global: global_vn,
        },
        en: {
            global: global_en,
        },
    },
});

// Create the root for React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <I18nextProvider i18n={i18next}>
                    <Router>
                        <App />
                    </Router>
                </I18nextProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
