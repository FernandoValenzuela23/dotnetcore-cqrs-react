import React, { useState, useEffect } from "react";
import { getData } from "../services/AccessAPI";
import { useNavigate } from "react-router-dom"


export const Users = () => {
    const navigate = useNavigate();
    const [state, setState] = useState(
        {
            users: [],
            loading: true
        }
    );

    useEffect(() => {
        getAllUsersData();
    }, [])

    const onUserCreate = () => {
        navigate('/user/create');
    }

    const onUserEdit = (id) => {
        navigate('/user/edit/' + id);
    }

    const onUserDelete = (id) => {
        navigate('/user/delete/' + id);
    }

    const getAllUsersData = () => {
        getData('api/User/GetAll').then(
            (result) => {
                if (result) {
                    setState({
                        users: result,
                        loading: false
                    });
                }
            }
        );
    }

    const renderAllUsersTable = (users) => {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.fullName}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td><button onClick={() => onUserEdit(user.id)} className="btn btn-success">Edit</button> ||
                                    <button onClick={() => onUserDelete(user.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }

    return (
        <div>
            <h3>List of Users</h3>
            <button onClick={() => onUserCreate()} className="btn btn-primary">Create new user</button>
            {
                state.loading == true && (
                    <p>
                        <em>Loading...</em>
                    </p>
                )
            }

            {
                (state.loading == false) && (
                    renderAllUsersTable(state.users)
                )
            }
        </div>
    );
}
