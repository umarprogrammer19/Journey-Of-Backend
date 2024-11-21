import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function SingleUser() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const {id} = useParams();
    
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/user/${id}`);
                setUser(data);
                setError(null);
            } catch (error) {
                setError("User Not Found");
            }
        })();
    }, [])
    return (
        <>
            <h1>Single User</h1>
            {error && <p>{error}</p>}
            {user && <h1>{user.name}</h1>}
        </>

    )
}