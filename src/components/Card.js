import React from "react";


const Card = ({ item }) => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                      <p>{item}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Card