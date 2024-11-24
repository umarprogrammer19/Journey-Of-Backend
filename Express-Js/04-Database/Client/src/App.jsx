import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const getName = useRef();
  const getAge = useRef();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/users");
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (error) {
        setError("error To Fetch Users", error.message);
      }
    })();
  }, [users]);

  const addUser = async (event) => {
    event.preventDefault();
    if (!getName.current.value || !getAge.current.value) return alert("Name and Age is required");
    try {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: getName.current.value,
          age: getAge.current.value,
        }),
      });
      setError(null);
      getName.current.value = "";
      getAge.current.value = "";
    } catch (error) {
      setError("error To Add User", error.message);
    };
  }

  const editUser = async (id) => {
    const newName = prompt("Enter New Name");
    const newAge = prompt("Enter New Age");
    if (!newName && !newAge) return alert("Please Enter Name Or Age To Edit");
    try {
      await fetch(`http://localhost:3000/api/v1/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          age: Number(newAge),
        }),
      });
      setError(null);
    } catch (error) {
      console.log("Cannot Edit User", error.message);
    }
  }

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/v1/users/${id}`, {
        method: "DELETE",
      });
      setError(null);
    } catch (error) {
      console.log(`Error Deleting User ${error.message}`);
    }
  }
  return (
    <>
      <h1 className="text-center mt-6 text-3xl font-bold underline">User Management</h1>

      <form
        onSubmit={addUser}
        className="flex flex-col items-center gap-4 my-6"
      >
        <input
          className="border border-black rounded px-4 py-2 w-64"
          type="text"
          ref={getName}
          placeholder="Enter Name"
        />
        <input
          className="border border-black rounded px-4 py-2 w-64"
          type="number"
          ref={getAge}
          placeholder="Enter Age"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add User
        </button>
      </form>

      {error && (
        <p className="text-red-600 text-center font-medium">{error}</p>
      )}

      <div className="flex flex-col items-center mt-6">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="w-full max-w-md p-4 mb-4 border border-gray-300 rounded shadow-lg"
            >
              <p className="font-semibold">Name: <span className="text-gray-700">{user.name}</span></p>
              <p className="font-semibold">Age: <span className="text-gray-700">{user.age}</span></p>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/users/${user._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                  onClick={async () => await deleteUser(user._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={async () => await editUser(user._id)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center mt-4 text-xl text-gray-500">Loading...</h1>
        )}
      </div>
    </>
  );
};