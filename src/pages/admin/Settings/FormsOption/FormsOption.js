import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const FormsOption = (props) => {
    const { _id, id, name, type, placeholder, errorMessage, label, pattern, required } = props.input;
    const [updateFormData, setUpdateFormData] = useState({ _id });
    useEffect(() => { console.log('updatedFormData has been changed', updateFormData); }, [updateFormData]);
    return (
        <div className="card col-md-3 m-5 p-3 ">
            <label for={"label" + id} className="form-label">Name</label>
            <input onChange={(e) => setUpdateFormData({ ...updateFormData, label })} type="text" className="form-control" defaultValue={label} id={"label" + id} />

            <label for={"name" + id} className="form-label">ID</label>
            <input type="text" className="form-control" defaultValue={name} id={"name" + id} disabled />

            <label for={"type" + id} className="form-label">Type</label>
            <select name="type" className="form-control" defaultValue={type} id={"type" + id} >
                <option defaultValue="text">text</option>
                <option defaultValue="phone">phone</option>
                <option defaultValue="email">email</option>
            </select>
            <label for={"placeholder" + id} className="form-label">Placeholder</label>
            <input type="text" className="form-control" defaultValue={placeholder} id={"placeholder" + id} />

            <label for={"errorMessage" + id} className="form-label">Error Message</label>
            <input type="text" className="form-control" defaultValue={errorMessage} id={"errorMessage" + id} />

            <label for={"pattern" + id} className="form-label">RegEx Check</label>
            <input type="text" className="form-control" defaultValue={pattern} id={"pattern" + id} />

            <label for={"required" + id} className="form-label">Requried</label>
            <select name="required" type="text" className="form-control" defaultValue={required} id={"required" + id} >
                <option defaultValue="false">No</option>
                <option defaultValue="true">Yes</option>
            </select>

            <div className="col-12">
                <button type="submit" className="btn btn-primary mt-3">Update</button>
            </div>
        </div >
    );
};

export default FormsOption;