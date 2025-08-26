import Navbar from "./layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import TaskItem from "./pages/TaskItem";
import TaskList from "./pages/TaskList";
import PrivateRoute from "./pages/PrivateRoute";
import TaskForm from "./pages/TaskForm";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import SignIn from "./pages/signIn";

const App = () => {
  return (
    <>
      <Routers>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/taskForm" element={<TaskForm />}></Route>
            <Route path="/taskItem/:id" element={<TaskItem />}></Route>
            <Route path="/taskList" element={<TaskList />}></Route>
            <Route path="/updateTask/:id" element={<TaskForm />}></Route>
          </Route>
        </Routes>
      </Routers>
    </>
  );
};

export default App;
