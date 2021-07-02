import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom'
import useStyles from './styles'


const Cart = ({
    cart,
    handleEmptyCart,
    handleUpdateCartQty,
    handleRemoveCartQty
}) => {
    const classes = useStyles();
    console.log(cart)
    const EmptyCart = () => (

        <Typography variant="subtitle1">
            You have no items in your shopping cart. <Link to="/" className={classes.link}>Start Adding Some!</Link>
        </Typography>
    )


    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={6} key={item.id}>
                        <CartItem
                            item={item}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveCartQty={handleRemoveCartQty}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    SubTotal: {cart.subtotal.formatted_with_symbol}
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}> Empty Cart</Button>
                        <Button className={classes.checkputButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                    </div>
                </Typography>
            </div>
        </>
    )
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your SHopping Cart</Typography>
            {cart.total_items === 0 ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
