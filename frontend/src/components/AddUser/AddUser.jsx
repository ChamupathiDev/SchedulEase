import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";


function AddUser() {
    const navigate = useNavigate(); // useNavigate for navigation
    const [inputs, setInputs] = useState({
        name: "",
        gmail: "",
        age: "",
        address: "",
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendRequest();
            navigate("/userdetails"); // Correct navigation function
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/users", {
            name: inputs.name,
            gmail: inputs.gmail,
            age: inputs.age,
            address: inputs.address,
        });
    };

    return (
        <div>
            <Nav />
            <h1>Add User</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange} value={inputs.name} required />
                
                <label>Email</label>
                <input type="email" name="gmail" onChange={handleChange} value={inputs.gmail} required />
                
                <label>Age</label>
                <input type="number" name="age" onChange={handleChange} value={inputs.age} required />
                
                <label>Address</label>
                <input type="text" name="address" onChange={handleChange} value={inputs.address} required />
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddUser;
