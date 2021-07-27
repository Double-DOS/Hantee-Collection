import React from "react";
import { Grid, Typography } from '@material-ui/core';
import Product from "./Product/Product";
import useStyle from './styles'
import { useLocation } from 'react-router-dom';



const Products = ({ products, checked, setProductDetail }) => {
    const classes = useStyle();
    const location = useLocation();
    return (
        <main className={classes.content}>


            {location.pathname === "/" && <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                CHECK OUT OUR NEW ARRIVALS
            </Typography>}
            <Grid container spacing={4}>
                {products.length !== 0 && products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} checked={checked} setProductDetail={setProductDetail} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products;
