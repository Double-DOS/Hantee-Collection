import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, NavBar, Cart, Checkout, Header, Landing, ProductDetail } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import useWindowPosition from './hooks/useWindowPosition';
import '@fontsource/roboto';
// importing paper and container from core
import { Paper, Container } from "@material-ui/core";

// these are for customizing the theme
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
/* material shell also provide the colors we can import them like these */
import { red } from "@material-ui/core/colors";

let theme = createMuiTheme({
    palette: {
        // type: 'dark',
        primary: {
            main: '#e53935',
        },
        secondary: {
            main: '#4fc3f7',
        },
    },
    typography: {
        palette: {
            primary: {
                main: '#e53935',
            },
            secondary: {
                main: '#4fc3f7',
            },
        }
    }
});

theme = responsiveFontSizes(theme);


const App = () => {
    const [products, setProducts] = useState([]);
    const [menProducts, setMenProducts] = useState([]);
    const [womenProducts, setWomenProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('');
    const [productDetail, setProductDetail] = useState({});


    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        console.log(data);
        setProducts(data);
    }


    const fetchMenProducts = async () => {
        const { data } = await commerce.products.list(

            {
                category_slug: ['for-men']
            }
        );
        console.log(data);
        setMenProducts(data);
    }


    const fetchWomenProducts = async () => {
        const { data } = await commerce.products.list(

            {
                category_slug: ['for-women']
            }
        );
        console.log("women", data);
        data && setWomenProducts(data);
    }

    const fetchCarts = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
        console.log(cart);
    }

    const handleAddVariantToCart = async (productId, quantity, variantData) => {
        console.log(variantData);
        const variantJson = JSON.parse(variantData);
        const { cart } = await commerce.cart.add(productId, quantity, variantJson);
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
        fetchMenProducts();
        fetchWomenProducts();
        fetchCarts();
    }, [])

    const checked = useWindowPosition('header');


    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div>
                    {/* <NavBar cartItemCount={cart && cart.total_items} /> */}
                    <Header cartItemCount={cart && cart.total_items} />
                    <main>
                        <Switch>
                            <Route exact path="/">
                                <Landing />
                                {/* <Landing /> */}
                                <Products products={products} checked={checked} setProductDetail={setProductDetail} />

                            </Route>
                            <Route exact path="/products">
                                <Products products={products} checked={true} setProductDetail={setProductDetail} />
                            </Route>
                            <Route exact path="/for-men">
                                <Products products={menProducts} checked={true} setProductDetail={setProductDetail} />
                            </Route>
                            <Route exact path="/for-women">
                                <Products products={womenProducts} checked={true} setProductDetail={setProductDetail} />
                            </Route>
                            <Route exact path="/cart">
                                <Cart
                                    cart={cart}
                                    handleEmptyCart={handleEmptyCart}
                                    handleUpdateCartQty={handleUpdateCartQty}
                                    handleRemoveCartQty={handleRemoveCartQty}
                                />

                            </Route>
                            <Route exact path="/product-detail">
                                <ProductDetail product={productDetail} onAddToCart={handleAddToCart} handleAddVariantToCart={handleAddVariantToCart} handleUpdateCartQty={handleUpdateCartQty} />
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
                    </main>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App