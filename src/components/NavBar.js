import React, { useState } from "react";
// import ReactSwitch from "react-switch";
import { NavLink,} from "react-router-dom";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
 

const NavBar = (props) => {
  const [isOpenMenu, setOpenMenu] = useState(false);
 
  const handeleMenu = () => {
    setOpenMenu(!isOpenMenu);
  };
 
   const pathname = useLocation()
   const location = pathname.pathname
  return (
    <>
   
      <div className="container-fluid  navBar-bg py-2 ">
        <div className="row">
          <div className="col-md-12">
            <nav
              className={`navbar navbar-expand-lg navbar-light ${
                isOpenMenu && "navBar-style"
              }`}
            >
              <div className="container navbar-container">
              
                <NavLink className="navbar-brand" to="/">
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
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={handeleMenu}
                >{
                  isOpenMenu ? <ion-icon name="close-outline"></ion-icon>:<ion-icon name="menu-outline"></ion-icon>
                }
                  
                 
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavDropdown"
                >
                  <ul className="navbar-nav ms-auto">
                   {location == "/" ?  "" : <li>
                      <NavLink aria-current="page" to="/">
                        Home
                      </NavLink>
                    </li> }
                    <li>
                      <NavLink aria-current="page" to="/about">
                        About Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/PrivacyPolicy">Privacy Policy</NavLink>
                    </li>
                    <li>
                      <NavLink to="/termsOfUse">Terms of Use</NavLink>
                    </li>
                    <li>
                      <NavLink to="/login">Login</NavLink>
                    </li>
                  </ul>
                </div>
                <div className="mode-container">
              <label className="label">
                <input
                  type="checkbox"
                  className="theme-btn"
                  onChange={props.toggleTheme}
                  checked={props.theme === "dark"}
                />
                <ion-icon name="sunny" class="sun"></ion-icon>
                <ion-icon name="moon-outline" class="moon"></ion-icon>
                <span className="toggle"></span>
              </label>
              </div>
                </div>
            </nav>
            {isOpenMenu && <div className="overlay-menu"></div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
