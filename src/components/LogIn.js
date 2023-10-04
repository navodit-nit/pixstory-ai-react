import React from "react";
import "./login.css";
const LogIn = () => {
  return (
    <>
      <div className="container-fluid login-from">
        <div className="row">
          <div className="col-md-3 mx-auto">
            <div className="login-container">
              <div className="logo-section">
                <img
                  src={process.env.PUBLIC_URL + "/img/logo.svg"}
                  alt="Logo"
                  className="light-logo"
                />
                <img
                  src={process.env.PUBLIC_URL + "/img/yellow-logo.svg"}
                  alt="Logo"
                  className="dark-logo"
                />
              </div>
              <div className="my-3">
                <h3>Log in to Your Account</h3>
                <p>Welcome Back!</p>
              </div>
              <div className="my-3">
                <label>Your email</label>
                <input className="from-control" type="text"/>
              </div>
              <div className="my-3">
                <label>Your password</label>
                <input className="from-control" type="text"/>
              </div>
              <div className="my-3">
                <p>Forget Password?</p>
              </div>
              <div className="my-3">
                <input type="submit" value="login" className="submit-btn" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LogIn;
