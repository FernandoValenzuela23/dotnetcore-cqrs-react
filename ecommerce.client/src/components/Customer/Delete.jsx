import React, { useState, useEffect } from "react";
import { deleteData, getData } from "../services/AccessAPI";
import { useNavigate, useParams } from "react-router-dom";

export const Delete = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        address: ''
    });

    useEffect(() => {
        getCustomer(id);
    }, []);
    

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

    const onCancel = () => {
        navigate('/customers');
    }

    const onConfirmation = (e) =>  {
        e.preventDefault();

        deleteData('api/Customer/Delete/' + id).then((result) => {
            let responseJson = result;
            if (responseJson) {
                navigate('/customers');
            }
        }
        );
    }


        return (
            <div>
                <h2>Delete</h2>
                <h3>Are you sure you want to delete this?</h3>
                <div>
                    <h4>Customer</h4>
                    <dl class="row">
                        <dt class="col-sm-2">
                            First Name:
                        </dt>
                        <dd class="col-sm-10">
                            {state.firstName}
                        </dd>
                        <dt class="col-sm-2">
                            Last Name:
                        </dt>
                        <dd class="col-sm-10">
                            {state.lastName}
                        </dd>
                        <dt class="col-sm-2">
                            Email:
                        </dt>
                        <dd class="col-sm-10">
                            {state.email}
                        </dd>
                        <dt class="col-sm-2">
                            Contact Number:
                        </dt>
                        <dd class="col-sm-10">
                            {state.contactNumber}
                        </dd>

                        <dt class="col-sm-2">
                            Address:
                        </dt>
                        <dd class="col-sm-10">
                            {state.address}
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
