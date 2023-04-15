import React from "react";
import "./Loader.scss";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="loader__container">
            <ThreeDots 
                height="100"
                width="100"
                color="green"
                ariaLabel="loading"
            />
        </div>
    )
};

export default Loader;