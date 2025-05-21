import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        date: '',
    });
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editAmount, setEditAmount] = useState('');

    const startEdit = (exp) => {
        setEditId(exp._id);
        setEditTitle(exp.title);
        setEditAmount(exp.amount);
    };

    const handleUpdate = async (e, id) => {
        e.preventDefault();
        try {
            await api.put(`/expenses/${id}`, {
                title: editTitle,
                amount: editAmount,
            });
            setEditId(null);
            fetchExpenses();
        } catch (err) {
            console.error(err);
        }
    };

    const fetchExpenses = async () => {
        try {
            const res = await api.get('/expenses');
            setExpenses(res.data.expenses);
            console.log(res.data.expenses)
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/expenses', formData);
            setExpenses([res.data, ...expenses]);
            setFormData({ title: '', amount: '', category: '', date: '' });
        } catch (err) {
            alert('Error adding expense');
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/expenses/${id}`);
            setExpenses(expenses?.filter((exp) => exp._id !== id));
        } catch (err) {
            alert('Error deleting expense');
        }
    };

   return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

      {/* 💰 Summary Card */}
      <div className="mb-8 p-4 bg-blue-100 border border-blue-300 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-blue-800">
          Total Expenses: $
          {expenses.reduce((total, exp) => total + Number(exp.amount), 0).toFixed(2)}
        </h3>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Expense Dashboard</h2>

      {/* ➕ Add Expense Form */}
      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="p-3 border rounded-md"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="p-3 border rounded-md"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="p-3 border rounded-md"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="p-3 border rounded-md"
        />
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
          >
            Add Expense
          </button>
        </div>
      </form>

      {/* 📋 Expense List */}
      <ul className="space-y-4">
        {expenses.map((exp) => (
          <li
            key={exp._id}
            className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center"
          >
            {editId === exp._id ? (
              <form
                onSubmit={(e) => handleUpdate(e, exp._id)}
                className="flex flex-col sm:flex-row sm:items-center gap-2 w-full"
              >
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                />
                <input
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="w-24 p-2 border rounded-md"
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </form>
            ) : (
              <>
                <div>
                  <p className="text-lg font-medium">{exp.title}</p>
                  <p className="text-gray-500">
                    ${exp.amount}{' '}
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full font-semibold
                      ${exp.category.toLowerCase() === 'food' ? 'bg-yellow-200 text-yellow-800' :
                        exp.category.toLowerCase() === 'travel' ? 'bg-green-200 text-green-800' :
                        'bg-gray-200 text-gray-800'}`}>
                      {exp.category}
                    </span>
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => startEdit(exp)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
};

export default Dashboard;