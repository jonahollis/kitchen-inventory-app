import React, { useState } from 'react';

const ReplenishList = ({ foods, onDelete, onQuantityChange }) => {
  const [newQuantities, setNewQuantities] = useState({});

  const handleQuantityChange = (foodId, event) => {
    setNewQuantities({
      ...newQuantities,
      [foodId]: event.target.value,
    });
  };

const handleSaveClick = (foodId) => {
    const newGroceryQuantity = parseInt(newQuantities[foodId]) || foods.find(food => food._id === foodId).groceryQuantity || 0;
    const newQuantity = isNaN(newGroceryQuantity) ? foods.find(food => food._id === foodId).quantity : newGroceryQuantity + foods.find(food => food._id === foodId).quantity;
    
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      // Call the onQuantityChange function here with the new quantity value
      onQuantityChange(foodId, newQuantity, 0);
      setNewQuantities({
        ...newQuantities,
        [foodId]: 0,
      });
    }
  };




  return (
    <div className='mt-5'>
        <div className='mb-1'>
            <h3>Manage Your Inventory While Shopping</h3>
        </div>
        <table className='table mt-3'>
        <thead>
            <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Expiration</th>
            <th scope='col'>Location</th>
            <th scope='col'>Current Qty</th>
            <th scope='col'>Qty Change</th>
            <th scope='col'>Actions</th>
            </tr>
        </thead>
        <tbody>
            {foods.map((food) => (
            <tr
                key={food._id}
                className='food'
            >
                <td className='align-middle'>{food.text}</td>
                <td className='align-middle'>{food.expiration}</td>
                <td className='align-middle'>{food.location}</td>
                <td className='align-middle'>
                    {food.quantity}
                </td>
                <td>
                    <input
                    type='number'
                    className='form-control'
                    value={newQuantities[food._id] ?? food.groceryQuantity}
                    onChange={(event) => handleQuantityChange(food._id, event)}
                    />
                </td>
                <td className='align-middle'>
                <button 
                    className='btn btn-success' 
                    onClick={() => handleSaveClick(food._id)}>
                        Update
                </button>
                <button 
                    className="btn btn-danger" 
                    onClick={() => onDelete(food._id)}>
                    Delete
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default ReplenishList;



