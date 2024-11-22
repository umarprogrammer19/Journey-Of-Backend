import { useParams } from "react-router-dom";

export default function SingleUser() {
    const { id } = useParams();
    return (
        <h1>User Details</h1>
    );
};