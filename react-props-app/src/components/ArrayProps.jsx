import React from "react";

const ArrayProps = (props) => {
    const listStyle = {
        listStyle: 'none',
        marginLeft: '100px'
    };

    return (
        <div>
            <h1>Fruits List</h1>
            {
                props.fruits.map((fruit, index) => (
                    <li key={index} style={listStyle}>
                        {fruit}
                    </li>
                )
            )
            }
        </div>
    );
}

export default ArrayProps;
