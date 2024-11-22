import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
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
    })()
  }, []);
  return (
    <>
      <h1 className="text-center mt-4 text-3xl underline font-bold">User Management</h1>
      <form>
        <input className="border border-[black] me-3" type="text" />
        <input className="border border-[black] me-3" type="number" />
        <button className="bg-[black] text-white px-2 py-1 rounded">Add User</button>
      </form>
      {error && <p>{error}</p>}
      {users.length > 0 ? users.map((item, index) => {
        return (
          <div key={item._id} className="flex flex-col mb-5">
            <p>Name: {item.name}</p>
            <p>Age: {item.age}</p>
          </div>
        )
      }) : <h1>Loading...</h1>}
    </>
  );
};