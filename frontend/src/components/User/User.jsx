import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function User({ user }) {
    const { _id, name, gmail, age, address } = user;
    const navigate = useNavigate(); // Corrected variable name

    const deleteHandler = async () => {
        try {
            await axios.delete(`http://localhost:5000/users/${_id}`);
            navigate("/userdetails"); // Navigate directly after deletion
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div>
            <div>
                <p><strong>ID:</strong> {_id}</p>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {gmail}</p>
                <p><strong>Age:</strong> {age}</p>
                <p><strong>Address:</strong> {address}</p>
                <p><strong>Profile:</strong> <a href={`/userdetails/${_id}`}>View Details</a></p>
                <button onClick={deleteHandler}>Delete</button>
            </div>
        </div>
    );
}

export default User;
