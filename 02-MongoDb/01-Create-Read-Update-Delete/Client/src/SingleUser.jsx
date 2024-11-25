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
    }, [id, user]);
    return (
        <>
            <h1 className="text-2xl font-bold text-center mt-6 underline">User Details</h1>

            {/* Error Message */}
            {error && (
                <p className="text-red-600 text-center mt-4 font-medium">
                    {error}
                </p>
            )}

            {/* User Details */}
            {user ? (
                <div className="max-w-sm mx-auto mt-6 p-4 border border-gray-300 rounded shadow-md">
                    <p className="text-lg font-semibold">
                        Name: <span className="text-gray-700">{user.name}</span>
                    </p>
                    <p className="text-lg font-semibold">
                        Age: <span className="text-gray-700">{user.age}</span>
                    </p>
                </div>
            ) : (
                <p className="text-center mt-6 text-gray-500">
                    Loading user details...
                </p>
            )}
        </>
    );
};