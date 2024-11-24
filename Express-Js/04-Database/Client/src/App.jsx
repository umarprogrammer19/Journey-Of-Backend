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
      const data = await response.json();
      console.log(data);
      setError(null);
      getName.current.value = "";
      getAge.current.value = "";
    } catch (error) {
      setError("error To Add User", error.message);
    };
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
      {users.length > 0 ? users.map((item, index) => {
        return (
          <div key={item._id} className="flex flex-col mb-5">
            <p>Name: {item.name}</p>
            <p>Age: {item.age}</p>
            <div>
              <Link to={`/users/${item._id}`}>View</Link>
              <button>Delete</button>
              <button>Edit</button>
            </div>
          </div>
        )
      }) : <h1>Loading...</h1>}
    </>
  );
};