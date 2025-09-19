import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
function App() {
	return (
		<div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
			<Navbar />
			<Routes>
				<Route path="/home" element={<HomePage />} />
			</Routes>
		</div>
	);
}

export default App;
