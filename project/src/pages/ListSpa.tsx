import { useState } from "react";
import { Link } from "react-router";

interface Todo {
	firstName: string;
	lastName: string;
}

function ListSpa() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newFirstName, setNewFirstName] = useState<string>("");
	const [newLastName, setNewLastName] = useState<string>("");
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [sortOption, setSortOption] = useState<{
		firstName: boolean;
		lastName: boolean;
	}>({ firstName: true, lastName: false });
	const [sortOrder, setSortOrder] = useState<string>("asc");

	const handleAddTodo = () => {
		console.log("Item Added");
		if (newFirstName.trim() !== "" && newLastName.trim() !== "") {
			console.log(
				{ firstName: newFirstName, lastName: newLastName },
				"Item Added"
			);
			setTodos([...todos, { firstName: newFirstName, lastName: newLastName }]);
			setNewFirstName("");
			setNewLastName("");
		}
	};

	const handleEdit = (index: number) => {
		const newFirstName = prompt(
			"Enter new first name:",
			todos[index].firstName
		);
		const newLastName = prompt("Enter new last name:", todos[index].lastName);
		if (newFirstName !== null && newLastName !== null) {
			const updatedTodos = [...todos];
			updatedTodos[index] = { firstName: newFirstName, lastName: newLastName };
			console.log(updatedTodos, "Item updated");
			setTodos(updatedTodos);
		}
	};

	const handleRemove = (index: number) => {
		console.log(index, "Item removed");
		setTodos(todos.filter((_, i) => i !== index));
	};

	const handleSort = (a: Todo, b: Todo) => {
		const order = sortOrder === "asc" ? 1 : -1;
		if (sortOption.firstName && sortOption.lastName) {
			const fullNameA = `${a.firstName} ${a.lastName}`;
			const fullNameB = `${b.firstName} ${b.lastName}`;
			return fullNameA.localeCompare(fullNameB) * order;
		} else if (sortOption.firstName) {
			return a.firstName.localeCompare(b.firstName) * order;
		} else if (sortOption.lastName) {
			return a.lastName.localeCompare(b.lastName) * order;
		}
		return 0;
	};

	const filteredTodos = todos
		.filter((todo) =>
			`${todo.firstName} ${todo.lastName}`
				.toLowerCase()
				.includes(searchQuery.toLowerCase())
		)
		.sort(handleSort);

	return (
		<div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-lg shadow-inner">
            <Link to="/" className="bg-green-300 rounded-lg px-2 py-2 m-auto hover:bg-green-600">Back</Link>
			<h1 className="text-2xl font-bold mb-5 text-center">SPA Listing</h1>
            
			<div className="flex mb-5">
				<input
					type="text"
					value={newFirstName}
					onChange={(e) => setNewFirstName(e.target.value)}
					placeholder="First Name"
					className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
				/>
				<input
					type="text"
					value={newLastName}
					onChange={(e) => setNewLastName(e.target.value)}
					placeholder="Last Name"
					className="flex-grow p-2 border border-gray-300 focus:outline-none"
				/>
				<button
					onClick={handleAddTodo}
					className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
				>
					Add
				</button>
			</div>
			<div className="flex mb-5">
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search"
					className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
				/>
			</div>
			<div className="flex mb-5">
				<label className="mr-2">
					<input
						type="checkbox"
						checked={sortOption.firstName}
						onChange={(e) =>
							setSortOption({ ...sortOption, firstName: e.target.checked })
						}
						className="mr-1"
					/>
					First Name
				</label>
				<label className="mr-2">
					<input
						type="checkbox"
						checked={sortOption.lastName}
						onChange={(e) =>
							setSortOption({ ...sortOption, lastName: e.target.checked })
						}
						className="mr-1"
					/>
					Last Name
				</label>
				<select
					value={sortOrder}
					onChange={(e) => setSortOrder(e.target.value)}
					className="p-2 border border-gray-300 rounded-lg focus:outline-none"
				>
					<option value="asc">Ascending</option>
					<option value="desc">Descending</option>
				</select>
			</div>
			<ul className="list-disc pl-5">
				{filteredTodos.map((todo, index) => (
					<li
						key={index}
						className="mb-2 p-2 bg-gray-400 rounded-lg flex justify-between items-center"
					>
						<span>
							{index + 1}. {todo.firstName} {todo.lastName}
						</span>
						<div>
							<button
								onClick={() => handleEdit(index)}
								className="bg-yellow-500 text-white p-1 rounded mr-2"
							>
								Edit
							</button>
							<button
								onClick={() => handleRemove(index)}
								className="bg-red-500 text-white p-1 rounded"
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ListSpa;
