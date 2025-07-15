import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Editor' },
  ]);

  const [form, setForm] = useState({ name: '', email: '', role: 'Viewer' });

  const addUser = (e) => {
    e.preventDefault();
    const newUser = { ...form, id: Date.now() };
    setUsers([...users, newUser]);
    setForm({ name: '', email: '', role: 'Viewer' });
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2 className="mb-4">User Management</h2>

      <form onSubmit={addUser} className="row g-2 mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option>Viewer</option>
            <option>Editor</option>
            <option>Admin</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-success w-100">Add User</button>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
