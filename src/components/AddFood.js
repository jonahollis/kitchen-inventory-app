import React from 'react'
import { useState } from 'react'

const AddFood = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')
  const [expiration, setExpiration] = useState('')
  const [location, setLocation] = useState('')
  const [replenish, setReplenish] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault()
    if(!text){
        alert('Please add food item.')
    }

    onAdd({ text, quantity, unit, expiration, location, replenish})

    setText('')
    setQuantity('')
    setUnit('')
    setExpiration('')
    setLocation('')
    setReplenish(false)
  }
  
  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Food</label>
            <input type='text' placeholder='Add Food Item' value={text} onChange={(e) => setText(e.target.value)}></input>
        </div>
        <div className='form-control'>
            <label>Quantity:</label>
            <input type='number' placeholder='Enter Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
        </div>
        <div className='form-control'>
            <label>Unit Type:</label>
            <input type='text' placeholder='Enter Unit' value={unit} onChange={(e) => setUnit(e.target.value)}></input>
        </div>
        <div className='form-control'>
            <label>Expiration Date:</label>
            <input type='text' placeholder='Add Expiration Date' value={expiration} onChange={(e) => setExpiration(e.target.value)}></input>
        </div>
        <div className='form-control'>
            <label>Location:</label>
            <input type='text' placeholder='Enter Location' value={location} onChange={(e) => setLocation(e.target.value)}></input>
        </div>
        <div className='form-control form-control-check'>
            <label>Reminder to Replenish:</label>
            <input 
                type='checkbox' 
                checked={replenish}
                value={replenish} 
                onChange={(e) => setReplenish(e.currentTarget.checked)}/>
        </div>

        <input className='btn btn-block' type='submit' value='Save Food'/>
    </form>
    
  )
}

export default AddFood