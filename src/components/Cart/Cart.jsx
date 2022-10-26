import React, { useContext } from "react";
import Modal from "../UI/Modal";
import "./cart.css";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";

function Cart(props) {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.amount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount:1})
  };
  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null,item.id)}
          onAdd={cartItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal toCloseModal={props.onHideCart}>
      {cartItems}
      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className="actions">
        <button className="button--alt" onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button className="button">Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
