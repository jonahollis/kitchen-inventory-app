import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Food = ({ food, onDelete, onToggle }) => {
  return (
    <div className={`food ${food.replenish ? 'replenish' : ''}`} onDoubleClick={() => onToggle(food._id)}>
      <h3>
        {food.text} 
        <FaTimes 
          style={{ color: 'red', cursor: 'pointer'}} 
          onClick={() => onDelete(food._id)}/>
      </h3>
      <table className='table table-responsive'>
        <thead>
          <tr>
            <th scope='col'  width='25%'>Expires</th>
            <th scope='col' width='25%'>Quantity</th>
            <th scope='col' width='25%'>Unit</th>
            <th scope='col' width='25%'>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='align-middle'>{food.expiration}</td>
            <td className='align-middle'>{food.quantity}</td>
            <td className='align-middle'>{food.unit}</td>
            <td className='align-middle'>{food.location}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Food
