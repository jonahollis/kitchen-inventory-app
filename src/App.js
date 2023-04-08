import { useState, useEffect } from 'react';
import Header from './components/Header';
import Foods from './components/Foods';
import AddFood from './components/AddFood';
import Button from './components/Button';
import ReplenishList from './components/ReplenishList';
//

function App() {
  const [showAddFood, setShowAddFood] = useState(false)
  const [foods, setFoods] = useState([]) 
  const [replenishFilter, setReplenishFilter] = useState(false);
  const [newQuantities, setNewQuantities] = useState({});

  useEffect(() => {
    const getFoods = async () => {
      const foodsFromServer = await fetchFoods()
      setFoods(foodsFromServer)
    }

    getFoods()
  }, [])

  // Fetch Foods
  const fetchFoods = async () => {
    // const res = await fetch('http://localhost:5000/food')
    const res = await fetch('/food')
    const data = await res.json()

    return data
  }

  // Fetch Single Food
  const fetchFood = async (_id) => {
    // const res = await fetch(`http://localhost:5000/food/${_id}`)
    const res = await fetch(`/food/${_id}`)
    const data = await res.json()

    return data
  }

  // Add Food Item
  const addFood = async (food) => {
    // const res = await fetch('http://localhost:5000/food/add', {
      const res = await fetch('/food/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(food)
    })

    const data = await res.json()

    setFoods([...foods, data]);
    setNewQuantities({...newQuantities, [data._id]: data.quantity });
  }

  // Delete Food Item
  const deleteFood = async (_id) => {
    // await fetch(`http://localhost:5000/${_id}`, {
      await fetch(`/${_id}`, {
      
      method: 'DELETE',
    })
    setFoods(foods.filter((food) => food._id !== _id))
  }
  
  // Toggle Replenish
  const toggleReplenish = async (_id) => {
    const foodToToggle = await fetchFood(_id)
    const updFood = { ...foodToToggle, replenish: !foodToToggle.replenish }
    console.log("foodToToggle:", foodToToggle)
    console.log("updFood:", updFood)
    // const res = await fetch (`http://localhost:5000/update/${_id}`, {
      const res = await fetch (`/update/${_id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updFood),
    })

    const data = await res.json()
    console.log("response from server:", data)
    console.log("replenish value from server:", data.replenish)

    setFoods(
      foods.map((food) => 
        food._id === _id ? {...food, replenish: data.replenish} : food
      )
    );

  }

  // Update New Quantity of Foods, only if grocery quantity changes
  const onQuantityChange = async (foodId, newQuantity) => {
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      try {
        // Fetch the food first
        const foodToUpdate = await fetchFood(foodId);
        // Update the quantity of the food
        const updatedFood = { ...foodToUpdate, quantity: newQuantity , replenish: false, groceryQuantity: 0 };
        // Update the food in the database
        // const res = await fetch(`http://localhost:5000/update/${foodId}`, {
          const res = await fetch(`/update/${foodId}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(updatedFood)
        });
        const data = await res.json();
        console.log('Updated quantity in database:', data);
  
        // Update the quantity value in the UI
        setFoods(foods.map((food) =>
          food._id === foodId ? { ...food, quantity: newQuantity , replenish: false, groceryQuantity: 0 } : food
        ));
      } catch (error) {
        console.log('Error updating quantity in database:', error);
      }
    }
  };


  // Filter Replenish Foods
  const replenishFoods = foods.filter((food) => food.replenish === true);

  return (
    <div className='container'>
      <Header onAdd={() => setShowAddFood(!showAddFood)} 
        showAdd={showAddFood}
        replenishFilter={replenishFilter}
        setReplenishFilter={setReplenishFilter} 
      />
      {showAddFood && 
        <AddFood 
          onAdd={addFood} />}
      {foods.length > 0 ? (
      <div>
        {replenishFilter ? (<h3>Grocery List</h3>) : (<h3>Kitchen Inventory</h3>)}
        {/* {replenishFilter ? (
        <Foods 
          key={replenishFoods.length} 
          foods={replenishFoods} 
          onDelete={deleteFood} 
          onToggle={toggleReplenish}
          onQuantityChange={onQuantityChange} 
        />
        ) : (
        <Foods 
          key={foods.length} 
          foods={foods} 
          onDelete={deleteFood} 
          onToggle={toggleReplenish}
          onQuantityChange={onQuantityChange} 
        />
        )} */}
        {replenishFilter ? (
          replenishFoods.length > 0 ? (
            <Foods 
              key={replenishFoods.length} 
              foods={replenishFoods} 
              onDelete={deleteFood} 
              onToggle={toggleReplenish}
              onQuantityChange={onQuantityChange} 
            />
          ) : (
            <p>Your Grocery List is Empty! Return to the Kitchen Inventory to Add Items to your Grocery List.</p>
          )
        ) : (
          foods.length > 0 ? (
            <Foods 
              key={foods.length} 
              foods={foods} 
              onDelete={deleteFood} 
              onToggle={toggleReplenish}
              onQuantityChange={onQuantityChange} 
            />
          ) : (
            <p>Empty</p>
          )
        )}
        {replenishFilter && 
          <ReplenishList
            foods={foods} 
            onDelete={deleteFood} 
            onQuantityChange={onQuantityChange} 
          />}
    </div>
    ) : (
    'No Foods in Stock'
    )}
    </div>
    );
    }

export default App;
