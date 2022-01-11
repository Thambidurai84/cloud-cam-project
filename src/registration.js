import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Registration = () => {

    return (
        <div className="maincontainer">
            <div class="container">
                <div class="card bg-light">
                    <article class="card-body mx-auto" style={{ maxWidth: "400px" }}>
                        <h4 class="card-title mt-3 text-center">Camera Registration</h4>
                        <form>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1"> <i class="fa fa-user fa-2x"></i> </span>
                                </div>
                                <input name="" class="form-control" placeholder="User name" type="text" />
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-camera fa-2x"></i> </span>
                                </div>
                                <input name="" class="form-control" placeholder="Camera Name" type="email" />
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-server fa-2x"></i> </span>
                                </div>
                                <input type="text" class="form-control" pattern="^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$" placeholder="Camera IP" type="text" />
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-lock fa-2x"></i> </span>
                                </div>
                                <input type="password" class="form-control" placeholder="Create password" type="password" />
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-lock fa-2x"></i> </span>
                                </div>
                                <input type="password" class="form-control" placeholder="Repeat password" type="password" />
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-primary btn-block">Register</button>
                            </div>
                            {/* <p class="text-center">Have an account? <a href="#">Log In</a> </p> */}
                        </form>
                    </article>
                </div>

            </div>

        </div>);
};
export default Registration;