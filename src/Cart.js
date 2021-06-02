import React from "react";
import CartItem from "./CartItem";

class Cart extends React.Component {
  constructor() {
    super();
    // Adding state to the component to store the local data of the component
    this.state = {
      products: [
        {
          price: 99,
          title: "Watch",
          qty: 5,
          img: "",
          id: 1,
        },
        {
          price: 999,
          title: "Phone",
          qty: 10,
          img: "",
          id: 2,
        },
        {
          price: 1999,
          title: "Laptop",
          qty: 2,
          img: "",
          id: 3,
        },
      ],
    };
  }

  render() {
    const { products } = this.state;
    return (
      <div className="cart">
        {/* Usage of the CartItem Component inside Cart Component */}

        {products.map((product) => {
          return <CartItem product={product} key={product.id} />;
        })}

        {/* map function used to iterate over the array calling the function */}
        {/* {arr.map((item) => {
          return item + 5;
        })} */}
      </div>
    );
  }
}

export default Cart;
