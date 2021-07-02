import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from "@material-ui/icons";
import logo from '../../assets/hantee_logo.png';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ cartItemCount }) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" color="inherit" className={classes.title}>
                        <img src={logo} alt="HanTee Collections" height="25px" className={classes.image} />
                        HanTee Collections
                    </Typography>
                    <div className={classes.grow}>
                        {location.pathname === '/' && (
                            <div className={classes.button}>
                                <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                                    <Badge badgeContent={cartItemCount} color="secondary">
                                        <ShoppingCart />

                                    </Badge>
                                </IconButton>

                            </div>
                        )}

                    </div>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar
