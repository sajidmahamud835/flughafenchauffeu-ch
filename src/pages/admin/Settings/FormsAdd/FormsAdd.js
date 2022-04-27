import React from 'react';

const FormsAdd = () => {
    const id = "015";
    return (

        <div className="card m-3 p-3 bg-light">
            <div class="row">
                <div class=" col-md-5 m-3 p-3">
                    <label for={"label" + id} class="form-label">Name</label><input type="text" class="form-control" id={"label" + id} />
                    <label for={"name" + id} class="form-label">ID</label><input type="text" class="form-control" value={"field_0" + id} id={"name" + id} disabled />
                    <label for={"type" + id} class="form-label">Type</label><select name="type" class="form-control" id={"type" + id} >
                        <option value="text">text</option>
                        <option value="phone">phone</option>
                        <option value="email">email</option>
                    </select>
                    <label for={"placeholder" + id} class="form-label">Placeholder</label><input type="text" class="form-control" id={"placeholder" + id} />
                </div>
                <div class=" col-md-5 m-3 p-3">
                    <label for={"errorMessage" + id} class="form-label">Error Message</label><input type="text" class="form-control" id={"errorMessage" + id} />
                    <label for={"pattern" + id} class="form-label">RegEx Check</label><input type="text" class="form-control" id={"pattern" + id} />
                    <label for={"required" + id} class="form-label">Requried</label><select name="required" type="text" class="form-control" id={"required" + id} >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                    <label for={"required" + id} class="form-label">Section</label><select name="required" type="text" class="form-control" id={"required" + id} >
                        <option value="false">Trip Information</option>
                        <option value="true">Personal Information</option>
                    </select>

                    <div class="col-12">
                        <button type="submit" class="btn btn-success mt-3" disabled>Add New Feild</button>
                    </div>
                </div>
            </div >
        </div>

    );
};

export default FormsAdd;