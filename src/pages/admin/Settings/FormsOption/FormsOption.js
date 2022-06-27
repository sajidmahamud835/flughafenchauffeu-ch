import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormsOption = (props) => {
    const { _id, id, name, type, placeholder, errorMessage, label, pattern, required } = props.input;
    const [updatedFormData, setUpdatedFormData] = useState({ _id, id, name, type, placeholder, errorMessage, label, pattern, required });
    // if (_id) {
    //     setUpdatedFormData(...updatedFormData, _id);
    // };
    const updateFormData = (e, updatedFormData) => {
        e.preventDefault();
        console.log(updatedFormData);
        const url = `${process.env.REACT_APP_SERVER_URL}/form/${props.collectionName}/${_id}`;
        console.log(url)
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedFormData)
        })
            .then(res => res.json())
            .then(data => console.log(data));
        toast(`Input field "${name}" updated successfully.`);
    };
    // useEffect(() => { console.log('updatedFormData has been changed', updatedFormData); }, [updatedFormData]);
    return (
        <div className="card col-md-3 m-5 p-3 ">
            <label for={"label" + id} className="form-label">Name</label>
            <input onChange={(e) => setUpdatedFormData({ ...updatedFormData, label: e.target.value })} type="text" className="form-control" defaultValue={label} id={"label" + id} />

            <label for={"name" + id} className="form-label">ID</label>
            <input onChange={(e) => setUpdatedFormData({ ...updatedFormData, name: e.target.value })} type="text" className="form-control" defaultValue={name} id={"name" + id} disabled />

            <label for={"type" + id} className="form-label">Type</label>
            <select onChange={(e) => setUpdatedFormData({ ...updatedFormData, type: e.target.value })} name="type" className="form-control" defaultValue={type} id={"type" + id} >
                <option value="text">text</option>
                <option value="number">number</option>
                <option value="tel">tel</option>
                <option value="email">email</option>
                <option value="color">color</option>
                <option value="date">date</option>
                <option value="time">time</option>
                <option value="password">password</option>
                <option value="url">url</option>
            </select>
            <label for={"placeholder" + id} className="form-label">Placeholder</label>
            <input onChange={(e) => setUpdatedFormData({ ...updatedFormData, placeholder: e.target.value })} type="text" className="form-control" defaultValue={placeholder} id={"placeholder" + id} />

            <label for={"errorMessage" + id} className="form-label">Error Message</label>
            <input onChange={(e) => setUpdatedFormData({ ...updatedFormData, errorMessage: e.target.value })} type="text" className="form-control" defaultValue={errorMessage} id={"errorMessage" + id} />

            <label for={"pattern" + id} className="form-label">RegEx Check</label>
            <input onChange={(e) => setUpdatedFormData({ ...updatedFormData, pattern: e.target.value })} type="text" className="form-control" defaultValue={pattern} id={"pattern" + id} />

            <label for={"required" + id} className="form-label">Requried</label>
            <select onChange={(e) => setUpdatedFormData({ ...updatedFormData, required: e.target.value })} name="required" type="text" className="form-control" defaultValue={required} id={"required" + id} >
                <option defaultValue="false">No</option>
                <option defaultValue="true">Yes</option>
            </select>

            <div className="col-12">
                <button onClick={(e) => updateFormData(e, updatedFormData)} type="submit" className="btn btn-primary mt-3">Update</button>
            </div>
        </div >
    );
};

export default FormsOption;