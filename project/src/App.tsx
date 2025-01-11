import { Link } from "react-router";

function App() {
	return (
		<>
			<h1 className="text-3xl font-bold text-red-500 text-center underline">
				React Test
			</h1>

			<div className="flex flex-col items-center mt-12 space-y-4 mb-5">
				<Link
					to="/list"
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
				>
					Todo List
				</Link>
				<Link
					to="/backend"
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
				>
					Todo with Backend & API
				</Link>
			</div>
		</>
	);
}

export default App;
