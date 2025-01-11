import React, { useState, useEffect } from "react";
import { Link } from "react-router";

type SearchResult = {
	name: string;
	age?: number;
	birthday?: string;
	gender?: string;
	height?: string;
	is_alive?: boolean;
	nationality?: string;
	net_worth?: string;
	occupation?: Array<string>;
};

type ServerResult = {
	id: number;
	name: string;
	age?: number;
	birthday?: string;
	gender?: string;
	height?: string;
	is_alive?: boolean;
	nationality?: string;
	net_worth?: string;
};

type SearchResultArray = SearchResult[];
type ServerResultArray = ServerResult[];

const ListBackend: React.FC = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [list, setList] = useState<ServerResultArray>([]);
	const [searchResult, setSearchResult] = useState<SearchResultArray>([]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await fetch("/api/search", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ name: firstName + " " + lastName }),
			});
			const data = await response.json();
			setSearchResult(data);
			handleList();
		} catch (error) {
			console.error("Error fetching search results:", error);
		}
	};

	const handleAdd = async (data: SearchResult) => {
		try {
			const response = await fetch("/api/store", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(data),
			});
			const result = await response.json();
			console.log(result);
			handleList();
		} catch (error) {
			console.error("Error adding data:", error);
		}
	};

	const handleList = async () => {
		try {
			const response = await fetch(
				"/api/list?" + new URLSearchParams({ search: searchQuery }).toString(),
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				}
			);
			const data = await response.json();
			setList(data);
		} catch (error) {
			console.error("Error fetching list:", error);
		}
	};

	const handleRemove = async (id: number) => {
		await fetch(`/api/delete/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => {
			handleList();
		});
	};

	const handleUpdate = async (
		id: number,
		updatedData: Partial<SearchResult>
	) => {
		try {
			const response = await fetch(`/api/update/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(updatedData),
			});
			const result = await response.json();
			console.log(result);
			handleList();
		} catch (error) {
			console.error("Error updating data:", error);
		}
	};

	const handleEdit = (result: ServerResult) => {
		const updatedData: Partial<SearchResult> = {};
		updatedData.age = parseInt(
			window.prompt("Enter new age:", result.age?.toString() || "") || "0"
		);
		// We exclude the name field from the update
		updatedData.name = result.name;
		updatedData.birthday =
			window.prompt("Enter new birthday:", result.birthday || "") || undefined;
		updatedData.gender =
			window.prompt("Enter new gender:", result.gender || "") || undefined;
		updatedData.height =
			window.prompt("Enter new height:", result.height || "") || undefined;
		updatedData.nationality =
			window.prompt("Enter new nationality:", result.nationality || "") ||
			undefined;
		updatedData.net_worth =
			window.prompt("Enter new net worth:", result.net_worth || "") ||
			undefined;
		updatedData.is_alive =
			window.prompt("Is alive? (yes/no):", result.is_alive ? "yes" : "no") ===
			"yes";

		handleUpdate(result.id, updatedData);
	};

	useEffect(() => {
		handleList();
	}, []);

	return (
		<div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-lg shadow-inner">
			<Link
				to="/"
				className="bg-green-300 rounded-lg px-2 py-2 m-auto hover:bg-green-600"
			>
				Back
			</Link>
			<h1 className="text-2xl font-bold mb-5 text-center">
				SPA Listing With Backend & 3rd Party API
			</h1>

			<div className="flex mb-5">
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					placeholder="First Name"
					className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
				/>
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					placeholder="Last Name"
					className="flex-grow p-2 border border-gray-300 focus:outline-none"
				/>
				<button
					onClick={handleSubmit}
					className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
				>
					Search
				</button>
			</div>
			<div className="flex mb-5">
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onKeyUp={handleList}
					placeholder="Search"
					className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
				/>
			</div>

			<div className="mt-5">
				<h2 className="text-xl font-bold mb-3">API Results:</h2>
				<div className="max-h-64 overflow-y-auto">
					<ul>
						{searchResult.map((result, index) => (
							<li
								key={index}
								className="mb-4 p-4 border border-gray-300 rounded-md shadow-sm bg-white"
							>
								<div className="font-bold text-lg mb-2">{result.name}</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<span className="font-semibold">Age:</span> {result.age}
									</div>
									<div>
										<span className="font-semibold">Birthday:</span>{" "}
										{result.birthday}
									</div>
									<div>
										<span className="font-semibold">Gender:</span>{" "}
										{result.gender}
									</div>
									<div>
										<span className="font-semibold">Height:</span>{" "}
										{result.height}
									</div>
									<div>
										<span className="font-semibold">Alive:</span>{" "}
										{result.is_alive ? "Yes" : "No"}
									</div>
									<div>
										<span className="font-semibold">Nationality:</span>{" "}
										{result.nationality}
									</div>
									<div>
										<span className="font-semibold">Net Worth:</span>{" "}
										{result.net_worth}
									</div>
									<div>
										<button
											className="bg-green-500 text-white p-1 rounded"
											onClick={() => handleAdd(result)}
										>
											Add
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="mt-5">
				<h2 className="text-xl font-bold mb-3">CRUD</h2>
				<div className="max-h-64 overflow-y-auto">
					<ul>
						{list.map((result, index) => (
							<li
								className="mb-4 p-4 border border-gray-300 rounded-md shadow-sm bg-white"
								key={index}
							>
								<div className="font-bold text-xl mb-2">{result.name}</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<span className="font-semibold">Age:</span>{" "}
										{result.age ?? "N/A"}
									</div>
									<div>
										<span className="font-semibold">Birthday:</span>{" "}
										{result.birthday ?? "N/A"}
									</div>
									<div>
										<span className="font-semibold">Gender:</span>{" "}
										{result.gender ?? "N/A"}
									</div>
									<div>
										<span className="font-semibold">Height:</span>{" "}
										{result.height ?? "N/A"}
									</div>
									<div>
										<span className="font-semibold">Nationality:</span>{" "}
										{result.nationality ?? "N/A"}
									</div>
									<div>
										<span className="font-semibold">Net Worth:</span>{" "}
										{result.net_worth ?? "N/A"}
									</div>
									<div>
										<span className="font-semibold">Alive:</span>{" "}
										{result.is_alive ? "Yes" : "No"}
									</div>
									<div>
										<button
											className="bg-red-500 text-white p-1 rounded m-1"
											onClick={() => handleRemove(result.id)}
										>
											Delete
										</button>
										<button
											className="bg-yellow-500 text-white p-1 rounded m-1"
											onClick={() => handleEdit(result)}
										>
											Edit
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ListBackend;
