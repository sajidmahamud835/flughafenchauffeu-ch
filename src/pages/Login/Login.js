import React from 'react';

const Login = () => {
    return (
        <div className='container w-50'>
            <form className='m-5 p-3 shadow'>
                <h2 className='text-center pb-3'>Login</h2>
                <div className="form-outline mb-4">
                    <label className="form-label" for="user_email">Email address</label>
                    <input type="email" id="user_email" className="form-control" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" for="user_pass">Password</label>
                    <input type="password" id="user_pass" className="form-control" />
                </div>


                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="user_checkbox" />
                            <label className="form-check-label" for="user_checkbox"> Remember me </label>
                        </div>
                    </div>
                </div>


                <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>
            </form>
        </div>
    );
};

export default Login;