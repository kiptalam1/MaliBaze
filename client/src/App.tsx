import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/home" element={<HomePage />} />
			</Routes>
		</>
	);
}

export default App;
