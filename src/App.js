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

    // this.db represents the command "firebase.firestore()"
    this.db = firebase.firestore();
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
      // .where is used for querying the data which is useful for sorting and filtering products
      // .where("price", "==", 45000)
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

    // products[index].qty += 1;
    // this.setState({
    //   products: products,
    // });

    // fetching the product whose qty has to be increased
    const docRef = this.db.collection("products").doc(products[index].id);

    docRef
      // updating the qty
      .update({
        qty: products[index].qty + 1,
      })
      .then(() => {
        console.log("Updated Successfully");
      })
      .catch((err) => {
        console.log("Error in updating data: ", err);
      });
  };

  // function to decrease the qty
  handleDecreaseQuantity = (product) => {
    console.log("Hey pls decrease the qty of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty -= 1;
    // this.setState({
    //   products: products,
    // });

    const docRef = this.db.collection("products").doc(products[index].id);

    if (products[index].qty === 0) {
      return;
    }

    docRef
      .update({
        qty: products[index].qty - 1,
      })
      .then(() => {
        console.log("Quantity decreased successfully");
      })
      .catch((err) => {
        console.log("Error in decreasing quantity: ", err);
      });
  };

  handleDeleteProduct = (id) => {
    const { products } = this.state;
    //const items = products.filter((item) => item.id !== id);

    // this.setState({
    //   products: items,
    // });

    const docRef = this.db.collection("products").doc(id);

    docRef
      .delete()
      .then(() => {
        console.log("Product Deleted Successfully");
      })
      .catch((err) => {
        console.log("Error in deleting product: ", err);
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

  addProduct = () => {
    this.db
      .collection("products")
      .add({
        // .add will create and add a product in firestore. It will automatically convert the JavaScript Object to document in firebase.
        price: 14999,
        qty: 2,
        img: "",
        title: "Washing Machine",
      })
      .then((docRef) => {
        // the docRef will refer to the newly created document in collection 'Products'.
        console.log("Product Added Successfully: ", docRef);
      })
      .catch((err) => {
        // .catch will get the error, if any occured
        console.log("Error in adding a product to firestore: ", err);
      });
  };

  sortProducts = () => {
    const { products } = this.state;

    this.db
      .collection("products")
      // .orderBy will sort the products using price in ascending oder by default (descending can be set as the next argument)
      .orderBy("price")
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => {
          console.log(doc.data());
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });

        this.setState({
          products: products,
          // stops the webpage from loading once the products are fetched
          loading: false,
        });
      });
  };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* Adding a button to add product from react into the db */}
        <button
          onClick={this.addProduct}
          style={{
            padding: 20,
            borderRadius: 20,
            border: 0,
            marginLeft: 10,
            fontSize: 20,
          }}
        >
          Add Product
        </button>
        <button
          onClick={this.sortProducts}
          style={{
            padding: 20,
            marginLeft: 10,
            borderRadius: 20,
            border: 0,
            marginTop: 10,
            fontSize: 20,
          }}
        >
          Sort Products
        </button>

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
