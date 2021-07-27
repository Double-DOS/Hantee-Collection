import React from "react"
import { AppBar, Toolbar, Typography, useMediaQuery, MenuItem, Badge, ListItemIcon, IconButton } from "@material-ui/core"
import * as mCore from "@material-ui/core"
import logo from '../../assets/hantee_logo.png';
import { useTheme } from "@material-ui/core/styles";
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

import { Home, ShoppingCart, MenuOpen, Menu } from "@material-ui/icons/";

const Header = ({ cartItemCount }) => {
    /* Creating 2 variables for opening and closing the menu for mobile version */
    const [anchor, setAnchor] = React.useState(null);
    const open = Boolean(anchor);
    const classes = useStyles();
    const location = useLocation();



    /* Creating a function to handle menu: */
    const handleMenu = (event) => {
        setAnchor(event.currentTarget);
    };
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    console.log(isMobile);
    return (
        <AppBar className={classes.appBar} elevation={8} id="header">
            <Toolbar>
                <img src={logo} alt="HanTee Collections" height="25px" className={classes.image} component={Link} to="/" />
                <Typography component={Link} to="/" variant="h6" color="inherit" className={classes.title}>
                    HANTEE COLLECTIONS
                </Typography>


                {isMobile ? (<>
                    <IconButton onClick={handleMenu}>
                        <Menu />
                    </IconButton>
                    <mCore.Menu
                        id="menu-appbar"
                        /* to open the anchor at the top below the cursor */
                        anchorEl={anchor}
                        /* anchor origin so that it open it that location */
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        // KeepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={open}
                    >
                        <MenuItem
                            onClick={() => setAnchor(null)}
                        >
                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                                <Typography>
                                    Go To Cart
                                </Typography>
                                <Badge badgeContent={cartItemCount} color="secondary">
                                    <ShoppingCart />
                                </Badge>

                            </IconButton>
                        </MenuItem>
                    </mCore.Menu>
                </>) : (
                    <>

                        <Typography className={classes.grow} component={Link} to="/products" variant="button" color="inherit">
                            About
                        </Typography>
                        <Typography className={classes.grow} component={Link} to="/for-men" variant="button" color="inherit">
                            For Men
                        </Typography>
                        <Typography className={classes.grow} component={Link} to="/for-women" variant="button" color="inherit">
                            For Women
                        </Typography>
                        <div className={classes.grow}>
                            {
                                location.pathname !== '/cart' && (
                                    <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                                        <Typography>
                                            Go To Cart
                                        </Typography>
                                        <Badge badgeContent={cartItemCount} color="secondary">
                                            <ShoppingCart />
                                        </Badge>

                                    </IconButton>

                                )

                            }


                        </div>


                    </>
                )
                }
            </Toolbar>
        </AppBar>
    )
}
export default Header;