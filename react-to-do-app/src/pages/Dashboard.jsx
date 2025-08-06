import React from "react";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import TaskItem from "../components/TaskItem";
import { Card, Row, Col, Dropdown } from "react-bootstrap";

const Dashboard = () => {
  const { tasks } = useTasks();
  const { user } = useAuth();

  const myTasks = tasks.filter(
    (task) => task.owner === user.email || task.sharedWith.includes(user.email)
  );

  const pending = myTasks.filter((task) => !task.completed);
  const completed = myTasks.filter((task) => task.completed);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Welcome, {user.role === "admin" ? "Admin" : "User"} 👋</h3>
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            {user.email}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item disabled>Role: {user.role}</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => window.location.reload()}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card bg="light" text="dark" className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Tasks</Card.Title>
              <Card.Text className="fs-4 fw-bold">{myTasks.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="warning" text="dark" className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Pending</Card.Title>
              <Card.Text className="fs-4 fw-bold">{pending.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="success" text="white" className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Completed</Card.Title>
              <Card.Text className="fs-4 fw-bold">{completed.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Pending Tasks */}
      <h5 className="mb-3">Your Pending Tasks</h5>
      {pending.length === 0 ? (
        <p className="text-muted">🎉 You have no pending tasks</p>
      ) : (
        <Row>
          {pending.map((task) => (
            <Col key={task.id} md={6} lg={4} className="mb-3">
              <TaskItem task={task} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Dashboard;
