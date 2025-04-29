import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient();
library.add(fas, fab);

window.onload = () => {
	const preloader = document.getElementById('preloader');
	if (preloader) {
		preloader.classList.add('opacity-0');
		setTimeout(() => {
			preloader.style.display = 'none';
		}, 1000);
	};
};

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</StrictMode>
)
