import React, { useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { MdCancel } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoGiftOutline } from "react-icons/io5";
import { CiRollingSuitcase } from "react-icons/ci";
import './RecentTransactions.css';

const iconMapping = {
    food: <IoFastFoodOutline />,
    entertainment: <IoGiftOutline />,
    travel: <CiRollingSuitcase />,
  };



const RecentTransactions = ({ transactions ,onDelete,onEdit}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 3;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(transactions.length / transactionsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div >
      <h2 style={{color:'white',fontSize:'28px',fontStyle:'italic',fontWeight:'700'}}>Recent Transactions</h2>
      <div className='transaction-container'style={{backgroundColor:'white'}}>
      <div className="transaction-list">
        {currentTransactions.map((transaction) => (
          <div>
          <div className="transaction-item" key={transaction.date + transaction.title}>
            <div className="transaction-icon">
                {iconMapping[transaction.category.toLowerCase()] }
            </div>
            
            
            <div className="transaction-details">
              <div className="transaction-title">{transaction.title}</div>
              <div className="transaction-date">{transaction.date}</div>
            </div>
            <div className="transaction-amount">₹{transaction.price}</div>
            <div className="transaction-actions">
              <button className="delete-button" onClick={() => onDelete(transaction.date + transaction.title)}><MdCancel /></button>
              <button className="edit-button" onClick={() => onEdit(transaction)}><CiEdit /></button>
            </div>

          </div>
          <hr/>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}><MdArrowBack /></button>
        <span style={{backgroundColor:'#43967B',width:'37px',height:'37px',color:'white',borderRadius:'5px',display:'flex',
            alignItems:'center',justifyContent:'center'
        }}>{currentPage}</span>
        
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(transactions.length / transactionsPerPage)}><MdArrowForward /></button>
      </div>
      </div>
      
    </div>
  );
};

export default RecentTransactions;
