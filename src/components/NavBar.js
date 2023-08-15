import React  from "react";

const NavBar = ()=>{
    return(
        <>
        <div className="fixed-top">
          <div className="container-fluid py-3 ">
              <div className="row">
                   <div className="col-md-3 col-6"><h2>Pixstory.ai</h2></div>
                   <div className="col-md-9 col-6"><button className="btn btn-warning float-end"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 3V5H3V3H12ZM16 19V21H3V19H16ZM22 11V13H3V11H22Z" fill="rgba(0,0,0,1)"></path></svg></button></div>
                </div>              
          </div>
          </div>
        </>
    )
}

export default NavBar;