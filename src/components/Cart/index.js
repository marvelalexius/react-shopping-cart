import React from 'react';

export default function Cart(props) {
    const total = props.cartItems.reduce((carrier, item) => {
        return carrier + (item.quantity * item.product.price)
    }, 0);

    return (
        <div className="column">
            <h3 className="title is-4">Shopping Cart</h3>
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {props.cartItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product.name}</td>
                            <td>{item.product.price}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <button className="button is-danger is-small" onClick={event => {
                                    event.preventDefault();
                                    props.removeItemFromCart(item.product);
                                }}>-</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Total : Rp {total}</h3>
        </div>
    )
}