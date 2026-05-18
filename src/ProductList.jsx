import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const [addedToCart, setAddedToCart] = useState({}); // Track locally added items

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items); // Access global cart

  const plantsArray = [ /* ... your existing plantsArray ... */ ];

  const styleObj = { /* ... existing navbar styles ... */ };
  const styleObjUl = { /* ... existing styles ... */ };
  const styleA = { /* ... existing styles ... */ };

  const handleHomeClick = (e) => { e.preventDefault(); onHomeClick(); };
  const handleCartClick = (e) => { e.preventDefault(); setShowCart(true); };
  const handlePlantsClick = (e) => { e.preventDefault(); setShowPlants(true); setShowCart(false); };
  const handleContinueShopping = (e) => { e.preventDefault(); setShowCart(false); };

  // Add to Cart functionality
  const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Add product to Redux store
    setAddedToCart(prev => ({ ...prev, [product.name]: true })); // Mark as added locally
  };

  // Total quantity in cart
  const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
            <a href="/" onClick={handleHomeClick}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={styleObjUl}>
          <div>
            <a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a>
          </div>
          <div>
            <a href="#" onClick={handleCartClick} style={styleA}>
              Cart ({calculateTotalQuantity()})
            </a>
          </div>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>{category.category}</h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">{plant.cost}</div>
                    <button
                      className="product-button"
                      disabled={addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;