import "./App.css";
import { Container, Button, Card} from 'react-bootstrap'
import groceryCartImg from "./assets/grocery-cart.png";
import { useState, useEffect } from "react";


const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    determineCompletedStatus();
  }, [groceryItems]);

  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const determineCompletedStatus = () => {
    if (!groceryItems.length) {
      return setIsCompleted(false);
    }

    let isAllCompleted = true;

    groceryItems.forEach((item) => {
      if (!item.completed) isAllCompleted = false;
    });

    setIsCompleted(isAllCompleted);
  };

  const handleAddGroceryItem = (e) => {
    if (e.key === "Enter") {
      if (inputValue) {
        const updatedGroceryList = [...groceryItems];

        const itemIndex = updatedGroceryList.findIndex(
          (item) => item.name === inputValue
        );

        if (itemIndex === -1) {
          updatedGroceryList.push({
            name: inputValue,
            quantity: 1,
            completed: false,
          });
        } else {
          updatedGroceryList[itemIndex].quantity++;
        }

        setGroceryItems(updatedGroceryList);
        setInputValue("");
      }
    }
  };

  const handleRemoveItem = (name) => {
    setGroceryItems([...groceryItems].filter((item) => item.name !== name));
  };

  const handleUpdateCompleteStatus = (status, index) => {
    const updatedGroceryList = [...groceryItems];
    updatedGroceryList[index].completed = status;
    setGroceryItems(updatedGroceryList);
  };

  const renderGroceryList = () => {
    return groceryItems.map((item, index) => (
      <div key={item.name}>
        <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                defaultValue=""
                aria-label="Checkbox for following text input"
                onChange={(e) => {
              handleUpdateCompleteStatus(e.target.checked, index);
            }}
            
            value={item.completed}
            checked={item.completed}
            />
          <p>
            {item.name} {item.quantity > 1 && <span>x{item.quantity}</span>}
          </p>
            </div>

            <input
              type="text"
              className="form-control"
              aria-label="Text input with checkbox"
            />  
            <button
                type="button"
                className="remove-button btn btn-outline-warning text-black"
                onClick={() => handleRemoveItem(item.name)}
              >
                X
              </button>        
            </div>
        <div>
          
        </div>
      </div>
    ));
  };

  return (
    <div>
    <div className="container px-4 pt-5">
  <div className="row row-cols-1 row-cols-sm-1 row-cols-lg-2 row-cols-xl-3 row-cols-md-2 justify-content-center align-items-center">
    <div className="col">
      <div className="card-header align-center ">
        {isCompleted &&<h2 className="success pb-2 border-bottom text-center ">You're Done</h2>}
        <h1 className="text-center">Shopping List</h1>
        <img 
          className="mx-auto d-block mb-3"
          src={groceryCartImg}
          width={200}
          height={200}
          alt="Responsive image"
          
        />
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Add Item
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={handleChangeInputValue}
              onKeyDown={handleAddGroceryItem}
              value={inputValue}
            />
        

            <button 
                type="button"
                className="btn btn-outline-warning text-black"
              >
                Enter
              </button>
          </div>
          
          
          </div>
          {renderGroceryList()}
        </div>
      </div>
    </div>
  </div>    
</div>
  )
}

export default App
