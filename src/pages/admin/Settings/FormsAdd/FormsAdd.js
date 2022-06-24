import React from 'react';

const FormsAdd = () => {
    const id = "015";
    return (

        <div className="card m-3 p-3 bg-light">
            <div className="row">
                <div className=" col-md-5 m-3 p-3">
                    <label for={"label" + id} className="form-label">Name</label><input type="text" className="form-control" id={"label" + id} />
                    <label for={"name" + id} className="form-label">ID</label><input type="text" className="form-control" value={"field_0" + id} id={"name" + id} disabled />
                    <label for={"type" + id} className="form-label">Type</label><select name="type" className="form-control" id={"type" + id} >
                        <option value="text">text</option>
                        <option value="phone">phone</option>
                        <option value="email">email</option>
                    </select>
                    <label for={"placeholder" + id} className="form-label">Placeholder</label><input type="text" className="form-control" id={"placeholder" + id} />
                </div>
                <div className=" col-md-5 m-3 p-3">
                    <label for={"errorMessage" + id} className="form-label">Error Message</label><input type="text" className="form-control" id={"errorMessage" + id} />
                    <label for={"pattern" + id} className="form-label">RegEx Check</label><input type="text" className="form-control" id={"pattern" + id} />
                    <label for={"required" + id} className="form-label">Requried</label><select name="required" type="text" className="form-control" id={"required" + id} >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                    <label for={"required" + id} className="form-label">Abschnitt</label><select name="required" type="text" className="form-control" id={"required" + id} >
                        <option value="false">Reiseinformationen</option>
                        <option value="true">persönliche Informationen</option>
                    </select>

                    <div className="col-12">
                        <button type="submit" className="btn btn-success mt-3" disabled>Add New Feild</button>
                    </div>
                </div>
            </div >
        </div>

    );
};

export default FormsAdd;