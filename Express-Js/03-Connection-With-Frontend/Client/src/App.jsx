import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const getName = useRef();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/users");
        setUsers(data);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  const addUsers = async (event) => {
    event.preventDefault();
    if (!getName.current.value) return setError("Name is required");
    users.push({ id: users.length + 1, name: getName.current.value });
    setUsers([...users]);
    try {
      await axios.post("http://localhost:3000/user", {
        name: getName.current.value,
      });
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    getName.current.value = "";
  };

  const deleteUser = async (id, index) => {
    users.splice(index, 1);
    setUsers([...users]);
    try {
      await axios.delete(`http://localhost:3000/user/${id}`);
      setError(null);
    } catch (error) {
      setError("Cannot Delete The User");
    }
  };

  const editUser = async (id, index) => {
    const newName = prompt("Enter New Name");
    if (!newName) return setError("New Name Is Required For Editing");
    users[index].name = newName;
    setUsers([...users]);
    try {
      await axios.put(`http://localhost:3000/user/${id}`, {
        name: newName,
      });
      setError(null);
    } catch (error) {
      setError("Cannot Edit The User");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">User Management</h1>
        <form onSubmit={addUsers} className="mb-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              ref={getName}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-32 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              Add User
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </form>
        <div className="space-y-4">
          {users.length > 0 ? (
            users.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <h2 className="text-lg font-medium text-gray-800">{item.name}</h2>
                  <Link
                    to={`/user/${item.id}`}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => await editUser(item.id, index)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => await deleteUser(item.id, index)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center text-gray-500">No Users Found</h1>
          )}
        </div>
      </div>
    </div>
  );
}
