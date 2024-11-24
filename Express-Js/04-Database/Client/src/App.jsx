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
      <h1 className="text-center mt-4 text-3xl underline font-bold">User Management</h1>
      <form onSubmit={addUser}>
        <input className="border border-[black] me-3" type="text" ref={getName} />
        <input className="border border-[black] me-3" type="number" ref={getAge} />
        <button type="submit" className="bg-[black] text-white px-2 py-1 rounded">Add User</button>
      </form>
      {error && <p>{error}</p>}
      {users.length > 0 ? users.map((item) => {
        return (
          <div key={item._id} className="flex flex-col mb-5">
            <p>Name: {item.name}</p>
            <p>Age: {item.age}</p>
            <div className="flex gap-4">
              <Link to={`/users/${item._id}`} className="text-blue-600">View</Link>
              <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={async () => await deleteUser(item._id)}>Delete</button>
              <button className="bg-green-700 text-white px-3 py-1 rounded" onClick={async () => await editUser(item._id)}>Edit</button>
            </div>
          </div>
        )
      }) : <h1>Loading...</h1>}
    </>
  );
};