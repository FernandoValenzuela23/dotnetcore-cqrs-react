import React, { useState } from "react";
import { postData } from "../services/AccessAPI";
import { useNavigate } from "react-router-dom";

export const Create = () => {
    const navigate = useNavigate();
    const [state, setState] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            contactNumber: '',
            address: ''
        }
    );

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }


    const onSubmit = (e) => {
        e.preventDefault();

        postData('api/Customer/Create', state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                navigate('/customers');
            }
        });
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <h3>Add new customer</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="control-label">First Name: </label>
                        <input className="form-control" type="text" name="firstName" value={state.firstName} onChange={onChange}></input>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Last Name: </label>
                        <input className="form-control" type="text" name="lastName" value={state.lastName} onChange={onChange}></input>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Email: </label>
                        <input className="form-control" type="text" name="email" value={state.email} onChange={onChange}></input>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Contact Number: </label>
                        <input className="form-control" type="text" name="contactNumber" value={state.contactNumber} onChange={onChange}></input>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Address:  </label>
                        <input className="form-control" type="text" name="address" value={state.address} onChange={onChange}></input>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add Customer" className="btn btn-primary"></input>
                    </div>

                </form>

            </div>
        </div>
    )

}
