import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "./contexts/SearchContext.tsx";
import AuthProvider from "./contexts/AuthContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<SearchProvider>
						<App />
					</SearchProvider>
				</AuthProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
);
