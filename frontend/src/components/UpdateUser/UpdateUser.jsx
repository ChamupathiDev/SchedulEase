import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";

function UpdateUser() {
    const [inputs, setInputs] = useState({
        name: "",
        gmail: "",
        age: "",
        address: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/users/${id}`);
                setInputs(res.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/users/${id}`, {
                name: String(inputs.name),
                gmail: String(inputs.gmail),
                age: String(inputs.age),
                address: String(inputs.address),
            });
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await sendRequest();
        navigate("/userdetails");
    };

    return (
        <div>
            <Nav />
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <br />
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={inputs.name}
                    required
                />
                <br /><br />

                <label>Gmail</label>
                <br />
                <input
                    type="email"
                    name="gmail"
                    onChange={handleChange}
                    value={inputs.gmail}
                    required
                />
                <br /><br />

                <label>Age</label>
                <br />
                <input
                    type="text"
                    name="age"
                    onChange={handleChange}
                    value={inputs.age}
                    required
                />
                <br /><br />

                <label>Address</label>
                <br />
                <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={inputs.address}
                    required
                />
                <br /><br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UpdateUser;
