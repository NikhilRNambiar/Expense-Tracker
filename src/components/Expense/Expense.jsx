import React, { useState } from 'react'
import "./Expense.css";
import Modal from 'react-modal';
import ExpenseForm from '../Expenseform/Expenseform';


const customStyles = {
    content: {
      width:'538px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor:'linear-gradient(90deg, #B5DC52 0%, #89E148 85%, #EFEFEF 85%)' ,
      padding: '20px',
      borderRadius: '10px',
      border: 'none',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
  };

function Expense({expenses,addExpense,totalExpenses}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);
  const handleSave = (expense) => {
    addExpense(expense);
    toggleModal();
  };
  return (
    <div>
        <div className='expense'>
            <h3 className='text-expense'>Expenses:<span>₹{totalExpenses}</span></h3>
            <button className='expensebutton' onClick={toggleModal}>+Add Expense</button>
            <Modal isOpen={modalIsOpen} onRequestClose={toggleModal} contentLabel="Add Expense" style={customStyles}>
                <h2>Add Expenses</h2>
                <ExpenseForm onSave={handleSave} onCancel={toggleModal}  />
                
            </Modal>
        </div>
    </div>
  )
}

export default Expense