import React from 'react';

const FormsOption = (props) => {
    const { id, name, type, placeholder, errorMessage, label, pattern, required } = props.input;
    return (
        <div class="card col-md-3 m-5 p-3 ">
            <label for={"label" + id} class="form-label">Name</label><input type="text" class="form-control" value={label} id={"label" + id} />
            <label for={"name" + id} class="form-label">ID</label><input type="text" class="form-control" value={name} id={"name" + id} disabled />
            <label for={"type" + id} class="form-label">Type</label><select name="type" class="form-control" value={type} id={"type" + id} >
                <option value="text">text</option>
                <option value="phone">phone</option>
                <option value="email">email</option>
            </select>
            <label for={"placeholder" + id} class="form-label">Placeholder</label><input type="text" class="form-control" value={placeholder} id={"placeholder" + id} />
            <label for={"errorMessage" + id} class="form-label">Error Message</label><input type="text" class="form-control" value={errorMessage} id={"errorMessage" + id} />
            <label for={"pattern" + id} class="form-label">RegEx Check</label><input type="text" class="form-control" value={pattern} id={"pattern" + id} />
            <label for={"required" + id} class="form-label">Requried</label><select name="required" type="text" class="form-control" value={required} id={"required" + id} >
                <option value="false">No</option>
                <option value="true">Yes</option>
            </select>

            <div class="col-12">
                <button type="submit" class="btn btn-primary mt-3">Update</button>
            </div>
        </div >
    );
};

export default FormsOption;