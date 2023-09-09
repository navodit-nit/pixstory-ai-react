import React from "react";

const NavBar = () => {
  return (
    <>
      <div className="fixed-top">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-md-12">
             <div className="topbar">
             <a href="#">
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
              </a>
              <button className="btn float-end">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 12H23" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 4H23" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 20H23" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </button>
             </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
