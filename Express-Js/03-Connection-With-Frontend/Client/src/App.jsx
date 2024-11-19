import axios from "axios";
import { useEffect, useState } from "react"

export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("http://localhost:3000/users");
        setUsers(data.data);
        console.log(data.data);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [])
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  )
}