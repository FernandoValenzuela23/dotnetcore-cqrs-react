import React, { useEffect, useState } from "react";
import { deleteData, getData } from "../services/AccessAPI";
import { useNavigate, useParams } from "react-router-dom";

export const DeleteRole = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [state, setState] = useState(
        {
            roleName: '',
            loading: true
        }
    );

    useEffect(() => {
        getData('api/Role/' + id).then(
            (result) => {
                if (result) {
                    setState({
                        id: result.id,
                        roleName: result.roleName,
                        loading: false
                    });
                }
            }
        );
    }, [])

    const onCancel = () => {
        navigate('/roles');
    }

    const onConfirmation = (e) => {
        e.preventDefault();

        deleteData('api/Role/Delete/' + id).then((result) => {
            let responseJson = result;
            if (responseJson) {
                navigate('/roles');
            }
        }
        );

    }


    return (
        <div>
            <h2>::Delete role::</h2>
            <h3>Are you sure you want to delete this?</h3>
            <div>
                <h4>Role Information</h4>
                <dl class="row">
                    <dt class="col-sm-2">
                        Role Name:
                    </dt>
                    <dd class="col-sm-10">
                        {state.roleName}
                    </dd>
                </dl>

                <form onSubmit={onConfirmation}>
                    <input type="hidden" asp-for="Id" />
                    <button type="submit" class="btn btn-danger">Delete</button> |
                    <button onClick={onCancel} className="btn btn-primary">Back to List</button>
                </form>
            </div>
        </div>
    )
}
