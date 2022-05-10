import React from 'react';

const FormsOption = (props) => {
    const { id, name, type, placeholder, errorMessage, label, pattern, required } = props.input;
    return (
        <div className="card col-md-3 m-5 p-3 ">
            <label for={"label" + id} className="form-label">Name</label><input type="text" className="form-control" value={label} id={"label" + id} />
            <label for={"name" + id} className="form-label">ID</label><input type="text" className="form-control" value={name} id={"name" + id} disabled />
            <label for={"type" + id} className="form-label">Type</label><select name="type" className="form-control" value={type} id={"type" + id} >
                <option value="text">text</option>
                <option value="phone">phone</option>
                <option value="email">email</option>
            </select>
            <label for={"placeholder" + id} className="form-label">Placeholder</label><input type="text" className="form-control" value={placeholder} id={"placeholder" + id} />
            <label for={"errorMessage" + id} className="form-label">Error Message</label><input type="text" className="form-control" value={errorMessage} id={"errorMessage" + id} />
            <label for={"pattern" + id} className="form-label">RegEx Check</label><input type="text" className="form-control" value={pattern} id={"pattern" + id} />
            <label for={"required" + id} className="form-label">Requried</label><select name="required" type="text" className="form-control" value={required} id={"required" + id} >
                <option value="false">No</option>
                <option value="true">Yes</option>
            </select>

            <div className="col-12">
                <button type="submit" className="btn btn-primary mt-3">Update</button>
            </div>
        </div >
    );
};

export default FormsOption;