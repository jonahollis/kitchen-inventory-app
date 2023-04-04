import React from 'react'
import Food from './Food'

const Foods = ({ foods, onDelete, onToggle}) => {

  return (
    <>
     {foods.map((food, index) => (
     <Food 
        key={index} 
        food={food} 
        onDelete={onDelete}
        onToggle={onToggle} />
     ))}
    </>
  )
}

export default Foods