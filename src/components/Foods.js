// Function based component

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

// Class based component
// import React, { Component } from 'react';
// import Food from './Food';

// class Foods extends Component {
//   render() {
//     const { foods, onDelete, onToggle } = this.props;

//     return (
//       <>
//         {foods.map((food, index) => (
//           <Food
//             key={index}
//             food={food}
//             onDelete={onDelete}
//             onToggle={onToggle}
//           />
//         ))}
//       </>
//     );
//   }
// }

// export default Foods;