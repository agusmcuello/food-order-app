import React, {Fragment} from "react";
import "./header.css";
import image from "../../../assets/food-header.jpg";
import HeaderButton from "./Header-cart";

function Header(props) {
  return (
    <Fragment>
      <header className="header">
        <h1>Food Order App</h1>
        <HeaderButton onClick={props.onShowCart}/>
      </header>
      <div className="main-image">
        <img src={image} alt="img-header" />
      </div>
      </Fragment>
  );
}

export default Header;
