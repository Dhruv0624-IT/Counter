import React from "react";

const Greet = (props) =>{
    return(
    <div>
        <h1>Hi, {props.username} </h1>
        <p>Age : {props.age} </p>
    </div>
    
    )

}

export default Greet