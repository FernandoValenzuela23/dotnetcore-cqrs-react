import { useState } from "react";
import { postData } from "../services/AccessAPI";
import { useNavigate } from "react-router-dom";

export const CreateRole = () => {
    const navigate = useNavigate();
    const [state, setState] = useState(
        {
            roleName: '',
            loading: true
        }
    );

    const onSubmit = (e) => {
        e.preventDefault();

        let roleObj = {
            roleName: state.roleName
        }

        postData('api/Role/Create', roleObj).then((result) => {
            let responseJson = result;

            if (responseJson) {
                navigate('/roles');
            }
        });
    }

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <h3>Create new role</h3>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <label className="control-label">Role Name: </label>
                        <input className="form-control" type="text" name="roleName" value={state.roleName} onChange={e => onChange(e)}></input>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Role" className="btn btn-primary"></input>
                    </div>

                </form>

            </div>
        </div>
    );
}