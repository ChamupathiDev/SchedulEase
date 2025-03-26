import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
};

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.users));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`);
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div>
            <Nav />
            <h1>Users Details Display Page</h1>
            <div className="mt-5">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.gmail}</td>
                                    <td>{user.age}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <Link to={`/edit/${user._id}`}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>&nbsp;
                                        <button onClick={() => handleDelete(user._id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
