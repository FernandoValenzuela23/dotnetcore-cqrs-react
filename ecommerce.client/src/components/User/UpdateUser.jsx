import React, { useState, useEffect } from "react";
import { getData, putData } from "../services/AccessAPI";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateUser = () => {
    const params = useParams();
    const id = params.id;
    console.log(id);
    const navigate = useNavigate();
    const [state, setState] = useState(
        {
            id: '',
            fullName: '',
            userName: '',
            email: '',
            roles: []
        }
    );

    useEffect(() => {
        getData('api/User/GetUserDetails/' + id).then(
            (result) => {
                //let responseJson = result;
                console.log("user for edit: ");
                console.log(result);
                if (result) {
                    setState({
                        //users: result,
                        id: result.id,
                        fullName: result.fullName,
                        userName: result.userName,
                        email: result.email,
                        loading: false
                    });
                }
            }
        );
    }, [])


    const onChange = (e) => {
        setState({ [e.target.name]: e.target.value });
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            update(false);
        }
    }


    // componentDidMount(){
    //     console.log(props)
    //     const {id} = props.match.params;
    // }

    const onSubmit = (e) => {
        e.preventDefault();
        const { history } = props;
        const { id } = props.match.params;

        let userProfile = {
            id: state.id,
            fullName: state.fullName,
            email: state.email,
            roles: state.roles
        }

        putData('api/User/EditUserProfile/' + id, userProfile).then((result) => {
            let responseJson = result;
            console.log("update response: ");

            if (responseJson) {
                console.log(responseJson);
                navigate('/admin/users');
            }
        }

        );
    }

    const onUpdateCancel = () => {
        navigate(-1);
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <h3>Edit User</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="control-label">Full Name: </label>
                        <input className="form-control" type="text" value={state.fullName} onChange={onChange} name="fullName"
                            onKeyDown={onKeyDown} ></input>
                    </div>

                    <div className="form-group">
                        <label className="control-label">User Name: </label>
                        <input className="form-control" type="text" value={state.userName} disabled={true} readOnly={true}></input>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Email: </label>
                        <input className="form-control" type="text" value={state.email} onChange={onChange} name="email"
                            onKeyDown={onKeyDown}></input>
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