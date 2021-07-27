import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { AddShoppingCart, ImageRounded } from '@material-ui/icons'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    description: {
        flex: "50%",
        padding: "20px",
    },
    variations: {},
    buttons: {
        display: 'flex',
        alignItems: 'center',
    },
    secondPart: {
        display: "grid",
        placeItems: "start"
    },
    sizeVariations: {},
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        // width: "90%",
        padding: theme.spacing(2, 4, 1),
    },
    colorVariations: {}
}));



const ProductDescription = ({ product, onAddToCart, handleUpdateCartQty, handleAddVariantToCart }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        if (product.variant_groups.length === 0) {
            onAddToCart(product.id, 1);
        } else {
            setOpen(true);

        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    var variantOption;

    return (

        <div className={classes.description}>
            <div sm={12} xs={12}>
                <Typography variant="h5" component="h1">
                    {product.name}
                </Typography>

                <Typography variant="h4">
                    {product.price.formatted_with_symbol}

                </Typography>
                <br />
                <Divider />
                <br />
                <Divider />
            </div>
            <br />

            <div sm={12} xs={12} className={classes.secondPart}>
                <div>
                    <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" />
                    {product.variant_groups.length !== 0 && (<div>
                        <Typography variant="h5" component="h1" align="center">
                            VARIATIONS AVAILABLE
                        </Typography>
                        <Grid container spacing={2}>
                            {product.variant_groups.map((group) => (
                                <Grid item >
                                    <Typography>{group.name.toUpperCase()}:</Typography>
                                    <br />
                                    {group.options.map((option) => (
                                        <Button color="secondary" type="button" onClick={handleOpen}>
                                            {option.name}
                                        </Button>
                                    ))}

                                </Grid>
                            ))}

                        </Grid>
                    </div>)}
                </div>
                <br />
                <Button type="button" color="primary" onClick={handleOpen}>
                    Add to cart
                    <AddShoppingCart />
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 1000,
                    }}
                >
                    <Fade in={open}>
                        <Paper className={classes.paper}>
                            <h2 id="transition-modal-title">Please select a variant</h2>
                            <div>
                                {product.variant_groups.map((group) => (
                                    <List>
                                        {group.name}:
                                        {
                                            group.options.map(
                                                (option) => (
                                                    <ListItem dense divider>
                                                        <ListItemAvatar>
                                                            {/* <Avatar>
                                                                <ImageRounded />
                                                            </Avatar> */}
                                                        </ListItemAvatar>
                                                        <ListItemText primary={option.name} />
                                                        <Button type="button" color="primary" onClick={() => handleAddVariantToCart(product.id, 1, `{"${group.id}":"${option.id}"}`)}>
                                                            <AddShoppingCart />
                                                        </Button>
                                                    </ListItem>
                                                )
                                            )
                                        }
                                    </List>
                                ))}
                            </div>

                        </Paper>
                    </Fade>
                </Modal>
            </div>
        </div >



    )
}

export default ProductDescription
