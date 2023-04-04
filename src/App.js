import { useState, useEffect } from 'react';
import Header from './components/Header';
import Foods from './components/Foods';
import AddFood from './components/AddFood';

function App() {
  const [showAddFood, setShowAddFood] = useState(false)

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

  const [foods, setFoods] = useState([
    ]) 

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
    await fetch(`http://localhost:5000/food/${_id}`, {
      method: 'DELETE',
    })
    setFoods(foods.filter((food) => food._id !== _id))
  }
  
  // Toggle Replenishment
  const toggleReplenish = (_id) => {
    setFoods(foods.map((food) => food._id === _id ? {...food, replenish: !food.replenish} : food))
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddFood(!showAddFood)} 
        showAdd={showAddFood}/>
        {showAddFood && <AddFood onAdd={addFood}/>}
      {foods.length > 0 ? <Foods foods={foods} 
        onDelete={deleteFood} onToggle={toggleReplenish}/> : 'No Foods in Stock'}
    </div>
  );
}

export default App;
