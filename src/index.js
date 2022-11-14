import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './styles/css/main.css';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './store/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<CssBaseline>
			<Provider store={store}>
				<App />
			</Provider>
		</CssBaseline>
	</React.StrictMode>
	);
