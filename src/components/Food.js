import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Food = ({ food, onDelete, onToggle }) => {
  return (
    <div className={`food ${food.replenish ? 'reminder' : ''}`} onDoubleClick={() => onToggle(food._id)}>
        <h3>
            {food.text} 
            <FaTimes 
                style={{ color: 'red', cursor: 'pointer'}} 
                onClick={() => onDelete(food._id)}/>
        </h3>
        <span>Expires:</span> 
        <p>{food.expiration}</p>
    </div>
  )
}

export default Food