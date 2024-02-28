import { useEffect, useState } from "react";
import { getData } from "../services/AccessAPI";
import { useNavigate, useParams } from "react-router-dom";

export const Roles = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const [state, setState] = useState(
        {
            roles: [],
            loading: true
        }
    );

    useEffect(() => {
        getAllRoles();
    }, [])

    const onRoleCreate = () => {
        navigate('/role/create');
    }

    const onRoleEdit = (id) => {
        navigate('/role/edit/' + id);
    }

    const onRoleDelete = (id) => {
        navigate('/role/delete/' + id);
    }

    const getAllRoles = () => {
        getData('api/Role/GetAll').then(
            (result) => {
                if (result) {
                    setState({
                        roles: result,
                        loading: false
                    });
                }
            }
        );
    }

    const populateRolesTable = (roles) => {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Roles</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        roles.map(role => (
                            <tr key={role.id}>
                                <td>{role.roleName}</td>
                                <td><button onClick={() => onRoleEdit(role.id)} className="btn btn-success">Edit</button> ||
                                    <button onClick={() => onRoleDelete(role.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }


    return (
        <div>
            <h4>List of roles</h4>
            <button onClick={() => onRoleCreate()} className="btn btn-primary">Create new role</button>
            {
                (state.loading === true) && (
                    <p>
                        <em>Loading ... </em>
                    </p>
        
                )
            } 
                
            {(state.loading === false) && (
                    populateRolesTable(state.roles)
                )
            }
        </div>
    );
}
