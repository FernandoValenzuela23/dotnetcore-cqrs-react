import React, { useState, useEffect } from 'react';
import { getData } from '../services/AccessAPI';
import { useNavigate } from "react-router-dom";


export const Customers = () => {
    const navigate = useNavigate();
    const [state, setState] = useState(
        {
            customers: [],
            loading: true,
            failed: false,
            error: ''
        }
    );

    useEffect(() => {
        populateCustomersData();
    }, [])


    const onCustomerCreate = () => {
        navigate('/customer/create');
    }

    const OncustomerEdit = (id) => {
        navigate('/customer/edit/' + id);
    }

    const OncustomerDelete = (id) => {
        navigate('/customer/delete/' + id);
    }

    const populateCustomersData = () => {

        getData(`api/Customer/getall`).then(
            (result) => {
                let responseJson = result;
                if (responseJson) {
                    setState({
                        customers: responseJson,
                        loading: false
                    });
                }
            }
        );
    }

    const renderAllCustomersTable = (customers) => {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.contactNumber}</td>
                                <td>{customer.address}</td>
                                <td><button onClick={() => OncustomerEdit(customer.id)} className="btn btn-success">Edit</button> ||
                                    <button onClick={() => OncustomerDelete(customer.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }

    return (
        <div>
            <h2>Customer</h2>
            <button onClick={() => onCustomerCreate()} className="btn btn-primary">Create</button>
            
            {(state.loading === true) && (
                <p>
                    <em>Loading...</em>
                </p>
            )}

            {(state.loading === false) && (
                renderAllCustomersTable(state.customers)
            )}
        </div>
    );

}
