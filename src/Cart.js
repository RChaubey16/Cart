import React from "react";
import CartItem from "./CartItem";

class Cart extends React.Component {
  render() {
    const arr = [1, 2, 3, 4, 5]; // arr for testing map function for iterations
    return (
      <div className="cart">
        {/* Usage of the CartItem Component inside Cart Component */}
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />

        {/* map function used to iterate over the array calling the function */}
        {/* {arr.map((item) => {
          return item + 5;
        })} */}
      </div>
    );
  }
}

export default Cart;
