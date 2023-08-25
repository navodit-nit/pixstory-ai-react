import React from "react";

const MainPage = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center landing-page-heading">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="main-page-content">
                <h1>
                  Access To free and open<span>information</span>                
                </h1>
                <img src={process.env.PUBLIC_URL + '/img/main-page-icon.svg'} alt="Icon" />
                <p>
                  <b>Hello!</b> I am your virtual AI assistant <br /> created by <b>Pixstory</b>.
                  How can I help you?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
