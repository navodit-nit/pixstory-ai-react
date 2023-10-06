import React from "react";
import "./login.css";
import PropTypes from "prop-types";
import { useState } from "react";
export default function LogIn({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [wrongData, setWrongData] = useState("");
  //const[value,setValue] = useState()
  async function loginUser(credentials) {
    return fetch(
      "http://localhost:5001/loginMock?email=" +
      encodeURIComponent(credentials.username) +
        "&password=" +
        encodeURIComponent(credentials.password)
    ).then((res) => res.json());
  }
  const [isValid, setIsValid] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setIsValid(emailPattern.test(username));
    setToken(token);
    setWrongData(token.email.msg);
  };
  return (
    <>
    <div className="login-body">
      <div className="container-fluid login-from">
        <div className="row">
          <div className="col-md-5 col-lg-4 col-sm-5 mx-auto">
           
            <div className="login-container">
              <div className="logo-section">
                <img
                  src={process.env.PUBLIC_URL + "/img/light.svg"}
                  alt="Logo"
                  className="light-logo"
                />
                <img
                  src={process.env.PUBLIC_URL + "/img/dark.svg"}
                  alt="Logo"
                  className="dark-logo"
                />
              </div>
              <div className="my-3">
                <h3>Log in to Your Account</h3>
                <p>Welcome Back!</p>
              </div>
              <div className="text-center">
                <div className="error">{wrongData} </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="my-3">
                  <label for="email">User Id *</label>
                  <input
                    className="from-control"
                    value={username}
                    placeholder="Enter User Id"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  {!isValid && <p className="error">Please enter a valid email address.</p>}
                </div>
                <div className="my-3">
                  <label for="password"> Password *</label>
                  <input
                    className="from-control"
                    value={password}
                    type="text"
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="my-3">
                  <input type="submit" value="login" className="submit-btn" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
LogIn.propTypes = {
  setToken: PropTypes.func.isRequired,
};
