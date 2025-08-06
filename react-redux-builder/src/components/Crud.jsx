import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, addUser, updateUser, deleteUser } from '../redux/Action';

const Crud = () => {
  const [form, setForm] = useState({
    username: '',
    id: null, 
  });

  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      alert('Username cannot be empty.');
      return;
    }

    if (form.id !== null) {
      dispatch(updateUser(form.id, { username: form.username }));
    } else {
      dispatch(addUser({ id: Date.now(), username: form.username }));
    }

    setForm({ username: '', id: null });
  };

  const handleEdit = (user) => {
    setForm({
      username: user.username,
      id: user.id,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User CRUD with Redux</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder={form.id ? "Editing user..." : "Enter username"}
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <button className="btn btn-primary" type="submit">
            {form.id !== null ? 'Update' : 'Add'}
          </button>
        </div>
      </form>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {!loading && users.length === 0 && <p>No users found. Add one!</p>}
      
      {!loading && users.length > 0 && (
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
              {user.username}
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Crud;