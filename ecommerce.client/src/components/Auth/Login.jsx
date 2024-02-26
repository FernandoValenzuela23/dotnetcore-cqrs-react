import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "reactstrap";
import LoginMenu from "../LoginMenu";
import { postDataForLogin } from "../services/AccessAPI";
import SessionManager from "./SessionManager";


export const Login = () => {
    const [state, setState] = useState(
        {
            userName: "",
            password: "",
            loading: false,
            failed: false,
            error: ''
        }
    );

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    }

    const login = () => {
        let userInfo = state;
        setState({
            ...state,
            loading: true
        });

        postDataForLogin('api/Auth/Login', userInfo).then((result) => {
            if (result?.token) {

                SessionManager.setUserSession(result.userName, result.token, result.userId, result.usersRole)

                if (SessionManager.getToken()) {
                    setState({
                        ...state,
                        loading: false
                    });

                    // If login successful, get token and redirect to dashboard
                    window.location.href = "/home";
                }
            } else {
                let errors = '';
                for (const key in result?.errors) {
                    if (Object.hasOwnProperty.call(result.errors, key)) {
                        errors += result.errors[key];

                    }
                }
                errors = errors === '' ? 'Login is unsuccessfull!' : errors;
                toast.error(errors, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });

                setState({
                    ...state,
                    errors: "Login failed!",
                    loading: false
                });
            }

        });
    }

    const registration = () => {
        window.location.href = "/user/register";
    }

    return (
        <div className="row" >         

            <div className="container text-center col-mlg-6 col-md-8 col-sm-12">
                <div className="login-logo">
                    <a href="/"><b>E-Commerce</b></a>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to access the application</p>

                    <div className="input-group has-feedback">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Please Enter Username"
                            name="userName"
                            onChange={onChange}
                            onKeyDown={e => onKeyDown(e)}
                        />
                        <span className="input-group-text material-icons">person</span>
                    </div>
                    <div className="input-group has-feedback">
                        <input type="password" className="form-control" placeholder="Please Enter Password" name="password"
                            onChange={onChange} onKeyDown={e => onKeyDown(e)}
                        />
                        <span className="input-group-text material-icons">password</span>
                    </div>
                    <div className="row row-cols-2">
                            <div className="col mt-3">
                                <button className="btn btn-primary d-flex flex-row mb-2" onClick={login}>
                                    <span className="p-2">Sign In</span>
                                    <span className="p-2 material-icons">login</span>
                                </button>
                            </div>
                            <div className="col mt-3">
                                <button className="btn btn-primary d-flex flex-row mb-2" onClick={registration}>
                                <span className="p-2">Register</span>
                                    <span className="p-2 material-icons">person_add</span>
                                </button>
                            </div>      
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {
                                (state.loading === true) && (<div className="p-3 mb-2 bg-info text-white">...Loading</div>)
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" >
                            <strong className="has-error" >{state.errorMsg}</strong>
                        </div>
                        <div className="col-md-4">
                            <ToastContainer></ToastContainer>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}