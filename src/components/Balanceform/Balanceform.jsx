import React, { useState } from 'react';
import "./Balanceform.css";

const BalanceForm = ({ onSave,onCancel }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount) {
      onSave(parseFloat(amount));
      setAmount('');
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className='container'>
      
      
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className='income'
          placeholder='Income Amount'
        />
      </div>
      <button type="submit" className='add'>Add Balance</button>
      <button type="button" onClick={onCancel} className='cancel'>Cancel</button>
    </form>
    
  );
};

export default BalanceForm;
