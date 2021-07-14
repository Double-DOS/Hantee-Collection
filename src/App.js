import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, NavBar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('');


    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCarts = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
        console.log(cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        console.log(cart);
        setCart(cart);
    }

    const handleRemoveCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.remove(productId);
        console.log(cart);
        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        console.log(cart);

        setCart(cart);

    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);

        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCarts();
    }, [])

    return (
        <Router>
            <div>
                <NavBar cartItemCount={cart && cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart} />

                    </Route>
                    <Route exact path="/cart">
                        <Cart
                            cart={cart}
                            handleEmptyCart={handleEmptyCart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveCartQty={handleRemoveCartQty}
                        />

                    </Route>
                    <Route exact path="/checkout">
                        <Checkout
                            cart={cart}
                            order={order}
                            onCaptureCheckout={handleCaptureCheckout}
                            error={errorMessage}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App