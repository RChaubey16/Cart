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

  // function to increase the qty
  handleIncreaseQuantity = (product) => {
    console.log("Hey please increase the qty of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;
    this.setState({
      products: products,
    });
  };

  // function to decrease the qty
  handleDecreaseQuantity = (product) => {
    console.log("Hey pls decrease the qty of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    products[index].qty -= 1;
    this.setState({
      products: products,
    });
  };

  handleDeleteProduct = (id) => {
    const { products } = this.state;
    const items = products.filter((item) => item.id !== id);

    this.setState({
      products: items,
    });
  };

  render() {
    const { products } = this.state;
    return (
      <div className="cart">
        {/* Usage of the CartItem Component inside Cart Component */}

        {products.map((product) => {
          return (
            <CartItem
              product={product}
              key={product.id}
              onIncreaseQty={this.handleIncreaseQuantity}
              onDecreaseQty={this.handleDecreaseQuantity}
              onDeleteProduct={this.handleDeleteProduct}
            />
          );
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
