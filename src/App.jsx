import { useCallback, useEffect, useState } from "react";
import { Card, Cart } from "./components";
import courses from "./data/db.json";
import axios from "axios";

const telegram = window.Telegram.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    telegram.ready();
  }, []);

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

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish";
    telegram.MainButton.show();
  };

  const onSendData = useCallback(() => {
    const queryId = telegram.initDataUnSave?.query_id;

    if (queryId) axios.post("https://sbk-web-bot-c7d8c058770d.herokuapp.com/web-bot", { courses: cartItems, queryId });
    else telegram.sendData(JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);

    return () => telegram.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);

  return (
    <main className="main-content">
      <h1 className="heading">WebEdu Kurslar</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards container">
        {courses.map(course => (
          <Card key={course.id} onAddItem={onAddItem} onRemoveItem={onRemoveItem} course={course} />
        ))}
      </div>
    </main>
  );
};

export default App;
