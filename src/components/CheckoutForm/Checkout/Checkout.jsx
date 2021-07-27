import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import useStyles from './styles';
import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
const steps = ['Shipping Addresss', 'Payment Details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setcheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    console.log(order);



    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm
            shippingData={shippingData}
            back={backStep}
            checkoutToken={checkoutToken}
            onCaptureCheckout={onCaptureCheckout}
            next={nextStep}
        />;

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">
                    Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle1">
                    Order Ref: {order.customer_reference}
                </Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back To Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>

    );


    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                console.log(token);
                setcheckoutToken(token);
            } catch (error) {
                console.log('error')
            }
        }
        generateToken();
    }, [cart.id]);

    if (error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} to="/">Back To Home</Button>
        </>
    }

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        console.log(data)
        setShippingData(data);
        nextStep();
    }

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(
                            (step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            )
                        )}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>

            </main>
        </>

    )
}

export default Checkout
