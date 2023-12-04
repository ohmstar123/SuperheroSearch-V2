import React, { useEffect, useState } from 'react'
import "./AdminPage.css";

const AdminPage = () => {
    const [allUsers, setAllUsers] = useState([])
    const [selectedEmail, setSelectedEmail] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        
        fetch("/api/superheroes/getAllEmails")
            .then((res) => res.json())
            .then((data) => {
                // Assuming data is an array of users
                const tempArray = [];
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    tempArray.push(data[i].Email);
                    
                }
                for (let i = 0; i < tempArray.length; i++) {
                    if (tempArray[i] === "ohmpatel86@gmail.com"){
                        tempArray.splice(i, 1);
                    }
                }
                setAllUsers(tempArray);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleEmailChange = (event) => {
        setSelectedEmail(event.target.value);
    };

    const giveAdmin = async () => {
        await fetch(`/api/superheroes/changeAdminStatusTrue/${selectedEmail}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setMessage(`Admin status given to ${selectedEmail}`);

    }

    const removeAdmin = async () => {
        await fetch(`/api/superheroes/changeAdminStatusFalse/${selectedEmail}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setMessage(`Admin status removed from ${selectedEmail}`);
    }

    const disableUser = async () => {
        await fetch(`/api/superheroes/changeDisibliityTrue/${selectedEmail}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setMessage(`${selectedEmail} is now disabled from logging in`);
    }

    const enableUser = async () => {
        await fetch(`/api/superheroes/changeDisibliityFalse/${selectedEmail}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setMessage(`${selectedEmail} is now enabled to log in`);
    }

    const backToHomepage = () => {
        window.location.href = "/";
    }


    return(
        <div>
            <h1>Admin Page</h1>
            <p>This is the admin page</p>
            <label>Select an email:</label>
            <select value={selectedEmail} onChange={handleEmailChange}>
                <option value="">Select an email</option>
                {allUsers.map((email) => (
                    <option key={email} value={email}>
                        {email}
                    </option>
                ))}
            </select>
            <p>Selected Email: {selectedEmail}</p>
            <button onClick={giveAdmin}>Give Admin</button>
            <button onClick={removeAdmin}>Remove Admin</button>
            <button onClick={disableUser}>Disable User</button>
            <button onClick={enableUser}>Enable User</button>
            <button onClick={backToHomepage}>Back to Homepage</button>
            <p>{message}</p>
        </div>
    )
}

export default AdminPage;