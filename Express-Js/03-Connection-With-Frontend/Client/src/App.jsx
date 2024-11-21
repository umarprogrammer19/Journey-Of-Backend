import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";

export default function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
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
  const getName = useRef();

  const addUsers = async (event) => {
    event.preventDefault();
    if (!getName.current.value) return setError("Name is required");
    const newUser = { id: users.length + 1, name: getName.current.value };
    setUsers([newUser, ...users]);
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
    } catch (error) {
      setError("Cannot Delete The User");
    }
  }
  return (
    <div>
      <h1>Hello, World!</h1>
      <form onSubmit={addUsers}>
        <input type="text" name="name" placeholder="Name" ref={getName} />
        <button type="submit">Add User</button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      {users.length > 0 ? users.map((item, index) => {
        return (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <Link to={`/user/${item.id}`}>View</Link>
            <button onClick={async () => await deleteUser(item.id, index)}>Delete</button>
          </div>
        )
      }) : <h1>No User Found</h1>}
    </div>
  )
}