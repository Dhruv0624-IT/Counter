import React from 'react';

const Card = (props) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #ccc',
      padding: '16px',
      borderRadius: '8px',
      width: '300px',
      backgroundColor: '#f9f9f9',
      margin: '10px'
    }}>
      <img src={props.image} alt={props.title} style={{ width: '100%', borderRadius: '8px' }} />
      <h2 style={{
        marginTop: '8px',
        backgroundColor: 'black',
        color: 'white',
        padding: '8px',
        borderRadius: '8px'
      }}>
        {props.title}
      </h2>
      <p>{props.description}</p>
    </div>
  );
};

export default Card;
