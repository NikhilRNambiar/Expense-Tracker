import React, { useState } from 'react'
import "./Wallet.css";
import Modal from 'react-modal';
import BalanceForm from '../Balanceform/Balanceform';



// const customStyles = {
//   content: {
//     width:'538px',
//     height:'168px',
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor:'linear-gradient(90deg, #B5DC52 0%, #89E148 85%, #EFEFEF 85%)' ,
//     padding: '20px',
//     borderRadius: '10px',
//     border: 'none',
//   },
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', 
//   },
// };
function Wallet({balance,onAddBalance}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => setModalIsOpen(!modalIsOpen);
  const handleSave = (amount) => {
    if (amount !== null) {
      onAddBalance(amount);
    }
  }
  console.log("wallet")
  return (
    <div>
        <div className='wallet'>
            <h3 className='text'>Wallet Balance:<span>₹{balance}</span></h3>
            <button className='wallet-button' onClick={toggleModal}>+Add Income</button>
            {/* <Modal isOpen={modalIsOpen} onRequestClose={toggleModal} contentLabel="Add Balance" style={customStyles}>
              <h2 style={{fontFamily:'ubuntu',fontSize:'30px',fontWeight:'700'}}>Add Balance</h2>
                <BalanceForm onSave={handleSave} onCancel={toggleModal} />
                
            </Modal> */}
        </div>
    </div>
  )
}

export default Wallet