
import React, { useState } from 'react';
import "./Expenseform.css";

const ExpenseForm = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !category || !date) {
      alert('Please fill in all fields');
      return;
    }

    const expense = {
      title,
      price: parseFloat(price),
      category,
      date
    };

    onSave(expense);
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <div>
       
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          className='input'
        />
      </div>
      <div>
        
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Price'
           className='input'
        />
      </div>
      </div>
      
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
           className='input'
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
        </select>
      </div>
      <div>
        
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder='dd/mm/yyyy'
           className='input'
        />
      </div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <button type="submit" style={{width:'223px',height:'51px',borderRadius:'15px',backgroundColor:'#F4BB4A',border:'none',color:'#FFFFFF'}}>Add Expense</button>
      
      <button type="button" onClick={onCancel} style={{width:'112px',height:'51px',borderRadius:'15px',boxShadow: '0px 4px 4px 0px #00000040',border:'none'
      }}>Cancel</button>
      </div>
      
    </form>
  );
};

export default ExpenseForm;
