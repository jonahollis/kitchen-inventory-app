import { useState, useEffect } from 'react';
import Header from './components/Header';
import Foods from './components/Foods';
import AddFood from './components/AddFood';

function App() {
  const [showAddFood, setShowAddFood] = useState(false)
  const [foods, setFoods] = useState([]) 

  useEffect(() => {
    const getFoods = async () => {
      const foodsFromServer = await fetchFoods()
      setFoods(foodsFromServer)
    }

    getFoods()
  }, [])

  // Fetch Foods
  const fetchFoods = async () => {
    const res = await fetch('http://localhost:5000/food')
    const data = await res.json()

    return data
  }

  // Fetch Single Food
  const fetchFood = async (_id) => {
    const res = await fetch(`http://localhost:5000/food/${_id}`)
    const data = await res.json()

    return data
  }

  // Add Food Item
  const addFood = async (food) => {
    const res = await fetch('http://localhost:5000/food/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(food)
    })

    const data = await res.json()

    setFoods([...foods, data])
  }

  // Delete Food Item
  const deleteFood = async (_id) => {
    await fetch(`http://localhost:5000/${_id}`, {
      method: 'DELETE',
    })
    setFoods(foods.filter((food) => food._id !== _id))
  }
  
  // Toggle Replenish
  const toggleReplenish = async (_id) => {
    const foodToToggle = await fetchFood(_id)
    const updFood = { ...foodToToggle, replenish: !foodToToggle.replenish }
    console.log(foodToToggle)
    const res = await fetch (`http://localhost:5000/update/${_id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updFood),
    })

    const data = await res.json()
    console.log(data)

    setFoods(
      foods.map((food) => 
        food._id === _id ? {...food, replenish: data.replenish} : food
      )
    )

  }

  return (
    <div className="container">
      <Header 
        onAdd={() => setShowAddFood(!showAddFood)} 
        showAdd={showAddFood}/>
      {showAddFood && 
        <AddFood 
          onAdd={addFood}/>}
      {foods.length > 0 ? 
        <Foods 
          foods={foods} 
          onDelete={deleteFood} 
          onToggle={toggleReplenish}/> : 'No Foods in Stock'}
    </div>
  );
}

export default App;
