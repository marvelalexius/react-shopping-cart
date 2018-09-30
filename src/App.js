import React, { Component } from 'react';

import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';

class App extends Component {
    state = {
        products: [],
        cartItems: []
    }

    handleAddItemToCart = product => {
        let cartData = this.state.cartItems;

        const itemExisted = cartData.findIndex(
            cartItem => cartItem.product.id === product.id
        );

        if (itemExisted === -1) {
            cartData.push({
                product: product,
                quantity: 1
            });
        } else {
            cartData[itemExisted].quantity = cartData[itemExisted].quantity + 1;
        }

        this.setState({cartItems: cartData});
    }

    handleRemoveItemFromCart = product => {
        const cartData = this.state.cartItems;

        const selectedItemIndex = cartData.findIndex(cartItem => cartItem.product.id === product.id);

        const selectedItem = cartData[selectedItemIndex];

        if (selectedItem.quantity > 1) {
            selectedItem.quantity--
        } else {
            cartData.splice(selectedItemIndex, 1);
        }

        this.setState({cartItems: cartData})
    }

    componentDidMount() {
        fetch("https://product-list.glitch.me/")
        .then(response => response.json())
        .then(data => this.setState({products: data}))
        .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="container">
                <Header />
                <div className="columns">
                    <div className="column is-two-thirds">
                        <div>
                            <h3 className="title">Our Products</h3>
                            <div className="columns">
                                {this.state.products.map(product => (<
                                    ProductCard key={product.id} product={product} addToCart={this.handleAddItemToCart} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <Cart 
                        cartItems={this.state.cartItems}
                        removeItemFromCart={this.handleRemoveItemFromCart}
                    />
                </div>
            </div>
        );
    }
}

export default App;