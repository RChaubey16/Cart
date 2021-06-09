import React from "react";

function Navbar(props) {
  return (
    <div style={styles.nav}>
      <div style={styles.cartIconContainer}>
        {/* image of cart */}
        <img
          style={styles.cartIcon}
          src="https://image.flaticon.com/icons/png/512/1170/1170678.png"
          alt="Cart-Icon"
        />
        {/* the count of products in cart */}
        <span style={styles.cartCount}> {props.count} </span>
      </div>
    </div>
  );
}

const styles = {
  cartIcon: {
    height: 32,
    marginRight: 40,
    cursor: "pointer",
  },
  nav: {
    height: 70,
    background: "#4267b2",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cartIconContainer: {
    position: "relative",
  },
  cartCount: {
    background: "yellow",
    borderRadius: "50%",
    padding: "4px 8px",
    position: "absolute",
    right: 20,
    top: -9,
  },
};

export default Navbar;
