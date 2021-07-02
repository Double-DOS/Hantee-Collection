import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, NavBar, Cart } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
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
                </Switch>
            </div>
        </Router>
    );
}

export default App