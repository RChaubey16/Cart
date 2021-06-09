import React from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { products } = props;
  return (
    <div className="cart">
      {/* Usage of the CartItem Component inside Cart Component */}

      {products.map((product) => {
        return (
          <CartItem
            product={product}
            key={product.id}
            onIncreaseQuantity={props.onIncreaseQuantity}
            onDecreaseQuantity={props.onDecreaseQuantity}
            onDeleteProduct={props.onDeleteProduct}
          />
        );
      })}

      {/* map function used to iterate over the array calling the function */}
      {/* {arr.map((item) => {
          return item + 5;
        })} */}
    </div>
  );
};

export default Cart;
