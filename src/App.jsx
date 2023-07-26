import { useState } from "react";
import { Card, Cart } from "./components";
import courses from "./data/db.json";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const onAddItem = item => {
    const existItem = cartItems.find(c => c.id === item.id);

    if (existItem) {
      const newData = cartItems.map(c => (c.id === item.id ? { ...existItem, quantity: existItem.quantity + 1 } : c));
      setCartItems(newData);
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newData);
    }
  };

  const onRemoveItem = item => {
    const existItem = cartItems.find(c => c.id === item.id);

    if (existItem.quantity > 1) {
      const newData = cartItems.map(c => (c.id === item.id ? { ...existItem, quantity: existItem.quantity - 1 } : c));
      setCartItems(newData);
    } else {
      const newData = cartItems.filter(c => c.id !== item.id);
      setCartItems(newData);
    }
  };

  return (
    <main className="main-content">
      <h1 className="heading">WebEdu Kurslar</h1>
      <Cart cartItems={cartItems} />
      <div className="cards container">
        {courses.map(course => (
          <Card key={course.id} onAddItem={onAddItem} onRemoveItem={onRemoveItem} course={course} />
        ))}
      </div>
    </main>
  );
};

export default App;
