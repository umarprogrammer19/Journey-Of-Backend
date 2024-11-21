import axios from "axios";
import { useEffect, useRef, useState } from "react"

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
  return (
    <div>
      <h1>Hello, World!</h1>
      <form onSubmit={addUsers}>
        <input type="text" name="name" placeholder="Name" ref={getName} />
        <button type="submit">Add User</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.length > 0 ? users.map(item => {
        return (
          <div key={item.id}>
            <h2>{item.name}</h2>
          </div>
        )
      }) : <h1>No User Found</h1>}
    </div>
  )
}