import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";

class App extends React.Component {
  constructor() {
    super();
    // Adding state to the component to store the local data of the component
    this.state = {
      products: [
        {
          price: 99,
          title: "Watch",
          qty: 5,
          img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=759&q=80",
          id: 1,
        },
        {
          price: 999,
          title: "Phone",
          qty: 10,
          img: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          id: 2,
        },
        {
          price: 1999,
          title: "Laptop",
          qty: 2,
          img: "https://images.unsplash.com/photo-1523398845774-0d176ba6fd41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80",
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

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  };

  getTotalPrice = () => {
    const { products } = this.state;
    let Total = 0;

    products.map((product) => {
      Total = Total + product.qty * product.price;
    });

    return Total;
  };

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL : {this.getTotalPrice()}
        </div>
      </div>
    );
  }
}

export default App;
