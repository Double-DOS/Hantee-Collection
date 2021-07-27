import React from 'react';
import { Typography, ListItem, List, ListItemText } from "@material-ui/core";

const Review = ({ checkoutToken }) => {
    return (
        <>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product) => (
                    <ListItem style={{ padding: '10px 0' }} key={product.id}>
                        {product.selected_options.length === 0 ? (<ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />) : (<ListItemText primary={`${product.selected_options[0].group_name} ${product.selected_options[0].option_name} of ${product.name}`} secondary={`Quantity: ${product.quantity}`} />)}

                        <Typography variant="body2">{product.line_total_formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0' }}>
                    <ListItemText primary='Total' />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}

export default Review
