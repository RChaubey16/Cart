import React from 'react';

class CartItem extends React.Component{
    constructor () {
        super();
        // Adding state to the component to store the local data of the component
        this.state = {
            price: 1999,
            title: 'Mobile Phone',
            qty: 1,
            img: ''
        }
    }
    render() {
        const { price, title, qty } = this.state                                          // Object Destructuring
        return (
            <div className="cart-item">
                
                <div className="left-block">
                    <img style={styles.image} />
                </div>
                <div className="right-block">
                    <div style={ { fontSize: 25 } }> {title} </div>                            {/* Created the styling using JS object right away */}
                    <div style={ { color: "grey" } }>Rs {price} </div>
                    <div style={ { color: "grey" } }>Qty: {qty} </div>
                    <div className="cart-item-actions">
                        {/* Buttons */}
                        <img alt="increase" className="action-icons" src="https://image.flaticon.com/icons/png/512/992/992651.png" />
                        <img alt="decrease" className="action-icons" src="https://image.flaticon.com/icons/png/512/992/992683.png" />
                        <img alt="delete" className="action-icons" src="https://image.flaticon.com/icons/png/512/1214/1214428.png" />
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
        height: 140,
        width: 140,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;
