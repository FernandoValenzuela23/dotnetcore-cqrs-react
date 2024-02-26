import React, { useState, useEffect } from "react";
import SessionManager from "../Auth/SessionManager";
import { postData } from "../services/AccessAPI";
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const CreateUser = () => {
    const navigate = useNavigate();
    const [state, setState] = useState(
        {
            fullName: '',
            email: '',
            userName: '',
            password: '',
            confirmationPassword: '',
            roles: [],
            loading: true
        }
    );

    const onSubmit = (e) => {
        e.preventDefault();

        if (state.password !== state.confirmationPassword) {

            toast.error("Password and confirm password are not same", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });

            return;
        }

        postData('api/User/Create', state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                if(!SessionManager.getToken()){
                    navigate('/');
                }else{
                    navigate('/users');
                }                             
            }
        });
    }

    const onClickBack = (e) => {
        e.preventDefault();

        if(SessionManager.getToken()){
            navigate('/users');
        }else{
            navigate(-1);
        }   
    }

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    
    return (
            <div className="row">
                <div className="col-md-4">
                    <h3>Create new user</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label className="control-label">Full Name: </label>
                            <input className="form-control" type="text" name="fullName" value={state.fullName} onChange={onChange}></input>
                        </div>

                        <div className="form-group">
                            <label className="control-label">Email: </label>
                            <input className="form-control" type="text" name="email" value={state.email} onChange={onChange}></input>
                        </div>

                        <div className="form-group">
                            <label className="control-label">User Name: </label>
                            <input className="form-control" type="text" name="userName" value={state.userName} onChange={onChange}></input>
                        </div>

                        <div className="form-group">
                            <label className="control-label">Password: </label>
                            <input className="form-control" type="password" name="password" value={state.password} onChange={onChange}></input>
                        </div>

                        <div className="form-group">
                            <label className="control-label">Confirm Password: </label>
                            <input className="form-control" type="password" name="confirmationPassword" value={state.confirmationPassword} onChange={onChange}></input>
                        </div>


                        <div className="form-group">
                            <input type="submit" value="Create User" className="btn btn-primary"></input> &nbsp; &nbsp; 
                            <input type="button" value="Back" onClick={onClickBack} className="btn btn-primary"></input>
                        </div>

                        <ToastContainer></ToastContainer>

                    </form>

                </div>
            </div>
    );
}
