import axios from "axios";
import { useEffect, useState } from "react"

export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("http://localhost:3000/users");
        setUsers(data.data);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [])
  return (
    <div className="">
      <h1>Hello, World!</h1>
      {users.length > 0 ? users.map(item => {
        return (
          <div key={item.id}>
            <h2>{item.name}</h2>
          </div>
        )
      }) : <h1>Loading.....</h1>}
    </div>
  )
}