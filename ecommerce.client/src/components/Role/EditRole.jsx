import { useEffect, useState } from "react";
import { getData, putData } from "../services/AccessAPI";
import { useNavigate, useParams } from "react-router-dom";

export const EditRole = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const [state, setState] = useState(
        {
            id: '',
            roleName: '',
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
    }, []);

    const onChange = (e) => {
        setState({ 
            ...state, 
            [e.target.name]: e.target.value 
        });
    }
    
    const onKeyDown = (e) => {
        if (e.keyCode == 13) {
            onSubmit(e);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        putData('api/Role/Edit/' + id, state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                navigate('/roles');
            }
        }

        );
    }

    const onUpdateCancel = () => {
        navigate('/roles');
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <h3>Edit Role</h3>
                <form onSubmit={e => onChange(e)}>
                    <div className="form-group">
                        <label className="control-label">Role Name: </label>
                        <input className="form-control" type="text" value={state.roleName} onChange={e => onChange(e)} name="roleName"
                            onKeyDown={onKeyDown} ></input>
                    </div>

                    <div className="form-group">
                        <button onClick={onUpdateCancel} className="btn btn-default">Cancel</button>
                        <input type="submit" value="Edit" className="btn btn-primary"></input>
                    </div>

                </form>

            </div>
        </div>
    );
}