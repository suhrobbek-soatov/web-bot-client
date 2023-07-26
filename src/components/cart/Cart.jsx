// style
import "./Cart.scss";

import { Button } from "../";
import { priceOptions } from "../../constants/constants";
import { totalPrice } from "../../helpers/totalPrice";

const telegram = window.Telegram.WebApp;

const Cart = ({ cartItems, onCheckout }) => {
  if (!cartItems.length) telegram.MainButton.hide();

  return (
    <div className="cart">
      <p className="">Umumiy narx: {totalPrice(cartItems).toLocaleString("en-US", priceOptions)}</p>
      <Button
        title={`${cartItems.length ? "Buyurtma berish" : "to'lov"}`}
        type="checkout"
        disabled={!cartItems.length}
        click={onCheckout}
      />
    </div>
  );
};

export default Cart;
