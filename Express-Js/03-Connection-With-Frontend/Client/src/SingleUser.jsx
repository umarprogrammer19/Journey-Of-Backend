import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleUser() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

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
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">User Details</h1>
                {error ? (
                    <p className="text-red-600">{error}</p>
                ) : user ? (
                    <>
                        <h2 className="text-lg font-medium text-gray-700">Name: {user.name}</h2>
                        <h2 className="text-lg font-medium text-gray-700">User id: {user.id}</h2>
                    </>
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    );
}
