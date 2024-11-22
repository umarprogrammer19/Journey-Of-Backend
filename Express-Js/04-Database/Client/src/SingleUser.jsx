import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleUser() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/users/${id}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError(`Cannot Fetch Single User ${error.message}`);
            }
        })()
    }, [id])
    return (
        <>
            <h1>User Details</h1>
            {error && <p>{error}</p>}
            {user && <div>
                <p>Name: {user.name}</p>
                <p>Age: {user.age}</p>
            </div>}
        </>
    );
};