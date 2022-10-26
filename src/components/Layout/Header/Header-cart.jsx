import React,{useContext, useEffect, useState} from "react";
import "./header-cart.css";
import CartIcon from "../../Cart/CartIcon";
import CartContext from "../../../store/CartContext";


function HeaderButton(props) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  
  const cartCtx = useContext(CartContext);
  const {items}=cartCtx
  
  const numberOfCartItems= items.reduce((curNumber,items)=>{
    return curNumber + items.amount;
  },0)
  
  const btnClasses= `button ${isHighlighted?" bump":""}`
  
  useEffect(()=>{
    if(items.length===0){
      return;
    }
    setIsHighlighted(true);

    const timer= setTimeout(()=>{
      setIsHighlighted(false)
    },300)

    return ()=>{
      clearTimeout(timer)
    }
  },[items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className="icon">
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className="badge">{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderButton;
