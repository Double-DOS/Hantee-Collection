import React from 'react'
import ImageCarousel from './ImageCarousel'
import { makeStyles } from '@material-ui/core/styles';
import ProductDescription from './ProductDescription';
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    root: {
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column"
        },
        // backgroundColor: "rgba(0, 0, 0, .3)",
    },
}));
const ProductDetail = ({ product, onAddToCart, handleUpdateCartQty, handleAddVariantToCart }) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.toolbar} />

            <main className={classes.root}>

                <ImageCarousel product={product} />
                <ProductDescription product={product} onAddToCart={onAddToCart} handleUpdateCartQty={handleUpdateCartQty} handleAddVariantToCart={handleAddVariantToCart} />
            </main>
            <CssBaseline />
        </>
    )
}

export default ProductDetail
