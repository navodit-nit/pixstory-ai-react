import React from "react";

const NavBar = () => {
  return (
    <>
      <div className="fixed-top">
        <div className="container-fluid py-3 ">
          <div className="row">
            <div className="col-md-12">
             <div className="topbar">
             <a href="#">
                <img
                  src={process.env.PUBLIC_URL + "/img/logo.svg"}
                  alt="Logo"
                />
              </a>
              <button className="btn float-end">
                <img src={process.env.PUBLIC_URL + '/img/menu.svg'} alt="menu" />
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
