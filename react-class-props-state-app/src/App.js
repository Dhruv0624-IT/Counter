import React from "react";

// import Counter from "./Components/Counter";
// import ObjFun from "./Components/ObjFun";
import MyComponent from "./Components/MyComponents";

const App = () => {
  let username = "Dhruv";
//   let x = 10;
//   let person = {
//     username: "Dhruv",
//     age: 19,
//   };
  return (
    <div>
      <MyComponent name="Dhruv Desai"/>

      {/* <Counter name={person.username} age={person.age} /> */}
    
      {/* <ObjFun x={x} p={person} /> */}

    </div>
  );
};

export default App;