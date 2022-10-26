import React, { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updateItems;
    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems = state.items.concat(action.item);
    }

    return {
      items: updateItems,
      totalAmount: updateAmount,
    };
  }
  if (action.type === "REMOVE") {
      const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.id
          );
          const existingItem= state.items[existingCartItemIndex];
          const updateTotalAmount= state.totalAmount-existingItem.price;
          let updateItems;
          if(existingItem.amount===1){
            updateItems= state.items.filter((item)=> item.id !== action.id)
          }else{
            const updateItem = {...existingItem, amount: existingItem.amount -1}
            updateItems= [...state.items];
            updateItems[existingCartItemIndex]= updateItem
          }

          return{
            items: updateItems,
            totalAmount: updateTotalAmount
          }

  }
  return defaultCartState;
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    amount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
