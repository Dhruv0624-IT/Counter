import React, { useEffect, useState } from 'react';

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: '', remarks: '' });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        const fakeProducts = [
          { id: 1, name: 'Laptop', price: 1200, remarks: 'A high-performance laptop.' },
          { id: 2, name: 'Smartphone', price: 800, remarks: 'Latest model with a great camera.' },
          { id: 3, name: 'Headphones', price: 150, remarks: 'Noise-cancelling wireless headphones.' },
        ];
        setProducts(fakeProducts);
        setLoading(false);
      } catch (e) {
        setError("Failed to fetch products.");
        setLoading(false);
      }
    }, 1500);
  }, []);

  const handleEdit = (product) => {
    setEditId(product.id);
    setEditData(product);
  };

  const handleUpdate = () => {
    if (!editData.name || isNaN(parseFloat(editData.price)) || parseFloat(editData.price) <= 0) {
      alert('Please provide a valid name and a price greater than 0.');
      return;
    }

    const updatedProducts = products.map(product =>
      product.id === editId
        ? { ...editData, price: parseFloat(editData.price) }
        : product
    );
    setProducts(updatedProducts);
    setEditId(null);
    setEditData({ name: '', price: '', remarks: '' });
  };
  
  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({ name: '', price: '', remarks: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const remainingProducts = products.filter(product => product.id !== id);
      setProducts(remainingProducts);
    }
  };

  return (
    <div className="container">
      <h2 className="products-heading">Product List</h2>
      
      {loading && <p className="status-message">Loading products...</p>}
      {error && <p className="status-message error">Error: {error}</p>}
      {!loading && products.length === 0 && <p className="status-message">No products found. Add one!</p>}

      <div className="products-grid">
        {!loading && products.length > 0 && products.map((product) => (
          <div key={product.id} className="product-card">
            {editId === product.id ? (
              <div className="product-edit-form">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                  placeholder="Price"
                />
                <textarea
                  value={editData.remarks}
                  onChange={(e) => setEditData({ ...editData, remarks: e.target.value })}
                  placeholder="Remarks"
                />
                <div className="product-actions">
                  <button className="update-button" onClick={handleUpdate}>Update</button>
                  <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">₹ {product.price}</p>
                  <p className="product-remarks">{product.remarks}</p>
                </div>
                <div className="product-actions">
                  <button className="edit-button" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <style>
        {`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            font-family: Arial, sans-serif;
          }

          .products-heading {
            text-align: center;
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 2rem;
            font-weight: bold;
          }

          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
          }

          .product-card {
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          }

          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
          }

          .product-details {
            margin-bottom: 1rem;
          }

          .product-name {
            font-size: 1.5rem;
            font-weight: bold;
            color: #1e40af;
            margin: 0 0 0.5rem;
          }

          .product-price {
            font-size: 1.25rem;
            color: #4b5563;
            margin: 0 0 0.5rem;
          }
          
          .product-remarks {
            font-size: 1rem;
            color: #6b7280;
            margin: 0;
            font-style: italic;
          }

          .product-actions {
            display: flex;
            gap: 0.5rem;
            justify-content: flex-end;
          }
          
          .product-card button {
            padding: 0.5rem 1rem;
            border-radius: 8px;
            border: none;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }

          .edit-button {
            background-color: #f97316;
          }
          
          .edit-button:hover {
            background-color: #ea580c;
          }

          .delete-button {
            background-color: #ef4444;
          }
          
          .delete-button:hover {
            background-color: #dc2626;
          }
          
          .update-button {
            background-color: #10b981;
          }
          
          .update-button:hover {
            background-color: #059669;
          }
          
          .cancel-button {
            background-color: #6b7280;
          }
          
          .cancel-button:hover {
            background-color: #4b5563;
          }

          .product-edit-form input,
          .product-edit-form textarea {
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 1rem;
          }

          .status-message {
            text-align: center;
            font-size: 1.2rem;
            color: #666;
          }
          
          .error {
            color: #dc2626;
            font-weight: bold;
          }

          @media (max-width: 768px) {
            .container {
              padding: 1rem;
            }
            .products-heading {
              font-size: 2rem;
            }
            .product-card {
              padding: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default ViewProducts;
