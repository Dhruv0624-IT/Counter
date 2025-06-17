import React from "react";

// Create a functional component
const MyComponent = () => {
  // Declare a variable with some data
  let username = "Dhruv";

  // Return JSX that uses the variable
  return (
    <div>
      <h1>Name : {username}</h1>
    </div>
  );
};

// Export the component to use in other files
export default MyComponent;
