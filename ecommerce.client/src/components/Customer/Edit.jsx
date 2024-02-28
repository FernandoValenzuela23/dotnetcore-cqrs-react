import React, { useEffect, useState } from "react";
import { getData, putData } from "../services/AccessAPI";
import { useNavigate, useParams } from "react-router-dom";

export const Edit = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [state, setState] = useState(
        {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            contactNumber: '',
            address: ''
        }
    );

    useEffect(() => {
        getCustomer(id);
    }, [])

    const getCustomer = (id) => {
        getData('api/Customer/' + id).then(
            (result) => {
                if (result) {
                    setState({
                        id: result.id,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        email: result.email,
                        contactNumber: result.contactNumber,
                        address: result.address
                    });
                }
            }
        );
    }

    const onChangeFirstName = (e) => {
        setState({
            ...state,
            firstName: e.target.value
        });
    }

    const onChangeLastName = (e) => {
        setState({
            ...state,
            lastName: e.target.value
        });
    }

    const onChangeEmail = (e) => {
        setState({
            ...state,
            email: e.target.value
        });
    }

    const onChangeContactNumber = (e) => {
        setState({
            ...state,
            contactNumber: e.target.value
        });

    }

    const onChangeAddress = (e) => {
        setState({
            ...state,
            address: e.target.value
        });
    }

    const onUpdateCancel = () => {
        navigate('/customers');
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let customerObj = {
            id: state.id,
            firstName: state.firstName,
            lastName: state.lastName,
            contactNumber: state.contactNumber,
            email: state.email,
            address: state.address
        }

        putData('api/Customer/Edit/' + id, customerObj).then((result) => {
            let responseJson = result;
            if (responseJson) {
                navigate('/customers');
            }
        }

        );
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <h3>Edit Customer</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="control-label">First Name: </label>
                        <input className="form-control" type="text" value={state.firstName} onChange={onChangeFirstName}></input>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Last Name: </label>
                        <input className="form-control" type="text" value={state.lastName} onChange={onChangeLastName}></input>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Email: </label>
                        <input className="form-control" type="text" value={state.email} onChange={onChangeEmail}></input>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Contact Number: </label>
                        <input className="form-control" type="text" value={state.contactNumber} onChange={onChangeContactNumber}></input>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Address: </label>
                        <input className="form-control" type="text" value={state.address} onChange={onChangeAddress}></input>
                    </div>

                    <div className="form-group">
                        <button onClick={onUpdateCancel} className="btn btn-default">Cancel</button>
                        <input type="submit" value="Edit" className="btn btn-primary"></input>
                    </div>

                </form>

            </div>
        </div>
    )
}
