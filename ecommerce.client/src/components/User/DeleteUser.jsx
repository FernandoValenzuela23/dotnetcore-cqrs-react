import React, { useState, useEffect } from "react";
import { deleteData, getData } from "../services/AccessAPI";
import { useNavigate, useParams } from "react-router-dom";

export const DeleteUser = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const [state, setState] = useState(
        {
            fullName: '',
            userName: '',
            email: '',
            roles: [],
            loading: true
        }
    );

    useEffect(() => {
        getData('api/User/GetUserDetails/' + id).then(
            (result) => {
                if (result) {
                    setState({
                        fullName: result.fullName,
                        userName: result.userName,
                        email: result.email,
                        roles: result.roles,
                        loading: false
                    });
                }
            }
        );
    }, [])


    const onCancel = () => {
        navigate('/users');
    }

    const onConfirmation = (e) => {
        e.preventDefault();
        deleteData('api/User/Delete/' + id).then((result) => {
            let responseJson = result;
            if (responseJson) {
                navigate('/users');
            }
        }
        );

    }


    return (
        <div>
            <h2>::Delete user::</h2>
            <h3>Are you sure you want to delete this?</h3>
            <div>
                <h4>User Information</h4>
                <dl className="row">
                    <dt className="col-sm-2">
                        Full Name:
                    </dt>
                    <dd className="col-sm-10">
                        {state.fullName}
                    </dd>
                </dl>

                <dl className="row">
                    <dt className="col-sm-2">
                        User Name:
                    </dt>
                    <dd className="col-sm-10">
                        {state.userName}
                    </dd>
                </dl>

                <dl className="row">
                    <dt className="col-sm-2">
                        Email:
                    </dt>
                    <dd className="col-sm-10">
                        {state.email}
                    </dd>
                </dl>

                <form onSubmit={e => onConfirmation(e)}>
                    <input type="hidden" asp-for="Id" />
                    <button type="submit" className="btn btn-danger">Delete</button> |
                    <button onClick={onCancel} className="btn btn-primary">Back to List</button>
                </form>
            </div>
        </div>
    )
}