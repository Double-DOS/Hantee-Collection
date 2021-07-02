import React from 'react'
import { Typography, Button, Card, CardContent, CardActions, CardMedia } from '@material-ui/core'

import useStyles from './styles';

const CartItem = ({ item, handleUpdateCartQty,
    handleRemoveCartQty }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia image={item.media.source} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">
                    {item.name}
                </Typography>
                <Typography variant="h5">
                    {item.line_total.formatted_with_symbol}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, --item.quantity)}>-</Button>
                    <Typography>
                        {item.quantity}
                    </Typography>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, ++item.quantity)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveCartQty(item.id)}>
                    Remove
                </Button>
            </CardActions>

        </Card>
    )
}
export default CartItem
