import { BrowserRouter, Routes, Route } from "react-router";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ListBackend from "./pages/ListBackend";
import ListSpa from "./pages/ListSpa";

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/list" element={<ListSpa />} />
				<Route path="/backend" element={<ListBackend />} />
			</Routes>
		</BrowserRouter>
	);
}
