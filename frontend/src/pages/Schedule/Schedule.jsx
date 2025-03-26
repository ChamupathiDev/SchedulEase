import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Schedule({ schedule }) {
    const { _id, scheduleId, email, moduleName,moduleId,scheduleDate,scheduleType,startTime,endTime} = schedule;
    const navigate = useNavigate(); // Corrected variable name

    const deleteHandler = async () => {
        try {
            await axios.delete(`api/schedules/${_id}`);
            navigate("/scheduledetails"); // Navigate directly after deletion
        } catch (error) {
            console.error("Error deleting schedule:", error);
        }
    };

    return (
        <div>
            <div>
                <p><strong>ID:</strong> {_id}</p>
                <p><strong>Schedule ID:</strong> {scheduleId}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Module Name:</strong> {moduleName}</p>
                <p><strong>Module ID:</strong> {moduleId}</p>
                <p><strong>schedule Date:</strong> {scheduleDate}</p>
                <p><strong>schedule Type:</strong> {scheduleType}</p>
                <p><strong>start Time:</strong> {startTime}</p>
                <p><strong>end Time:</strong> {endTime}</p>


               
                <p><strong>Profile:</strong> <a href={`/scheduledetails/${_id}`}>View Details</a></p>
                <button onClick={deleteHandler}>Delete</button>
            </div>
        </div>
    );
}

export default Schedule;
