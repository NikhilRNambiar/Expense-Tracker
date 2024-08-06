import React, { useState, useEffect } from 'react';
import Wallet from "../Wallet/Wallet";
import Expense from '../Expense/Expense';
import Piechart from '../Piechart/Piechart';
import './ExpenseTracker.css';
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import Modal from 'react-modal';
import Expenseform from "../Expenseform/Expenseform";
import TopExpenses from '../TopExpenses/TopExpenses';

Modal.setAppElement('#root');


const customStyles = {
  content: {
    width: '538px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'linear-gradient(90deg, #B5DC52 0%, #89E148 85%, #EFEFEF 85%)',
    padding: '20px',
    borderRadius: '10px',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

function ExpenseTracker() {
  const [balance, setBalance] = useState(() => {
    const balance = localStorage.getItem('balance');
    return balance ? JSON.parse(balance) : 5000;
  });

  const [expenses, setExpenses] = useState(() => {
    const expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
  });

  const [totalExpenses, setTotalExpenses] = useState(() => {
    const total = localStorage.getItem('totalExpenses');
    return total ? JSON.parse(total) : 0;
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('totalExpenses', JSON.stringify(totalExpenses));
  }, [totalExpenses]);

  const addExpense = (expense) => {
    if (expense.price > balance) {
      alert('Insufficient balance');
      return;
    }
    setExpenses([...expenses,expense]);
    console.log(expenses);
    setTotalExpenses(totalExpenses + expense.price);
    setBalance(balance - expense.price);
  };

  const addBalance = (amount) => {
    setBalance(balance + amount);
  };

  const handleDelete = (transactionKey) => {
    setExpenses(prevExpenses => {
      const updatedExpenses = prevExpenses.filter(exp => (exp.date + exp.title) !== transactionKey);
      setTotalExpenses(updatedExpenses.reduce((total, exp) => total + exp.price, 0));
      return updatedExpenses;
    });
  };

  const handleEdit = (transactionKey, updatedTransaction) => {
    setExpenses(prevExpenses => {
      const updatedExpenses = prevExpenses.map(exp => 
        (exp.date + exp.title) === transactionKey ? updatedTransaction : exp
      );
      setTotalExpenses(updatedExpenses.reduce((total, exp) => total + exp.price, 0));
      return updatedExpenses;
    });
    setModalIsOpen(false);
  };

  const toggleModal = (expense = null) => {
    setCurrentExpense(expense);
    setModalIsOpen(!modalIsOpen);
  };



  const aggregateExpensesByCategory = () => {
    const categories = expenses.reduce((acc, expense) => {
      const { category, price } = expense;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += price;
      return acc;
    }, {});

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
    }));
  };

 
  // console.log(aggregatedData);

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <h2 style={{ color: "white",fontSize:'32px',fontWeight:'700',marginBottom:'3px' }}>Expense Tracker</h2>
      
      <div className='expense'>
        
        <Wallet balance={balance} onAddBalance={addBalance} />
        <Expense expenses={expenses} addExpense={addExpense} totalExpenses={totalExpenses} />
        <Piechart data={aggregateExpensesByCategory()} />
      </div>
      <div style={{display:'flex'}}>
      <RecentTransactions transactions={expenses}  onDelete={handleDelete} onEdit={toggleModal} />
      <TopExpenses data={aggregateExpensesByCategory()}/>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => toggleModal(null)} contentLabel="Edit Expense" style={customStyles}>
        <h2>{currentExpense ? 'Edit Expense' : 'Add Expense'}</h2>
        <Expenseform onSave={currentExpense ? (expense) => handleEdit(currentExpense.date + currentExpense.title, expense) : addExpense} onCancel={() => toggleModal(null)} initialData={currentExpense} />
      </Modal>
      
    </div>
  );
}

export default ExpenseTracker;
