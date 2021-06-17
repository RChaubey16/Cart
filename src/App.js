import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from "firebase";

class App extends React.Component {
  constructor() {
    super();
    // Adding state to the component to store the local data of the component
    this.state = {
      products: [],
      // loading is true because it loads untill all the products are fetched
      loading: true,
    };
  }

  componentDidMount() {
    //Method 1 : fetching products from firebase using function chaining
    // firebase
    //   .firestore()
    //   .collection("products")
    //   .get()
    //   .then((snapshot) => {
    //     // snapshot means the shot of content in database at that point of time
    //     console.log(snapshot);

    //     // snapshot.docs contain the products in an array, hence we are using map on docs
    //     snapshot.docs.map((doc) => {
    //       // each doc is a product
    //       console.log(doc.data);
    //     });

    //     const products = snapshot.docs.map((doc) => {
    //       // we are adding an unique id to each of our products
    //       const data = doc.data();
    //       data["id"] = doc.id;
    //       return data;
    //     });

    //     // as the products array is now changed, calling setState is necessary for re-rendering of page
    //     this.setState({
    //       products: products,
    //       // stops the webpage from loading once the products are fetched
    //       loading: false,
    //     });
    //   });

    // Method 2: fetching products from firebase and adding a listener to update the webpage without refresh
    firebase
      .firestore()
      .collection("products")
      // onSnapshot is the listener which listens to the products collection in firestore
      .onSnapshot((snapshot) => {
        // snapshot means the shot of content in database at that point of time
        console.log(snapshot);

        // snapshot.docs contain the products in an array, hence we are using map on docs
        snapshot.docs.map((doc) => {
          // each doc is a product
          console.log(doc.data);
        });

        const products = snapshot.docs.map((doc) => {
          // we are adding an unique id to each of our products
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });

        // as the products array is now changed, calling setState is necessary for re-rendering of page
        this.setState({
          products: products,
          // stops the webpage from loading once the products are fetched
          loading: false,
        });
      });
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
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {/* Below is a shorthand or JSX way of conditional rendering */}
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL : {this.getTotalPrice()}
        </div>
      </div>
    );
  }
}

export default App;
