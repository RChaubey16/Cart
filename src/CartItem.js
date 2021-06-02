import React from "react";

class CartItem extends React.Component {
  render() {
    const { price, title, qty } = this.props.product; // Object Destructuring
    return (
      <div className="cart-item">
        <div className="left-block">
          <img style={styles.image} />
        </div>
        <div className="right-block">
          <div style={{ fontSize: 25 }}> {title} </div>{" "}
          {/* Created the styling using JS object right away */}
          <div style={{ color: "grey" }}>Rs {price} </div>
          <div id="qty" style={{ color: "grey" }}>
            Qty: {qty}{" "}
          </div>
          <div className="cart-item-actions">
            {/* Buttons */}
            <img
              alt="increase"
              className="action-icons"
              src="https://image.flaticon.com/icons/png/512/992/992651.png"
              onClick={() => this.props.onIncreaseQty(this.props.product)}
            />
            <img
              alt="decrease"
              className="action-icons"
              src="https://image.flaticon.com/icons/png/512/992/992683.png"
              onClick={() => this.props.onDecreaseQty(this.props.product)}
            />
            <img
              alt="delete"
              className="action-icons"
              src="https://image.flaticon.com/icons/png/512/1214/1214428.png"
            />
          </div>
        </div>
      </div>
    );
  }
}

// Styling using objects in JSX
const styles = {
  image: {
    // Do not need to write px as JSX adds it automatically
    height: 130,
    width: 130,
    borderRadius: 4,
    background: "#ccc",
  },
};

export default CartItem;
