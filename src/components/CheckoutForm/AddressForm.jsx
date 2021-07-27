import React, { useEffect, useState } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { commerce } from '../../lib/commerce';



const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .required('Email is required'),
    firstName: yup
        .string('Enter your firstname')
        .required('First name is required'),
    lastName: yup
        .string('Enter your lastname')
        .required('First name is required'),
    address: yup
        .string('Enter your address')
        .required('Address is required'),
    city: yup
        .string('Enter your city')
        .required('City is required'),
    zip: yup
        .string('Enter your Zip Code')
        .required('Zip/Postal Code is required'),
    shippingCountry: yup
        .string('Selec your country')
        .required('Country is required'),
    shippingSubDivision: yup
        .string('Select your state')
        .required('State is required'),
    shippingOption: yup
        .string('Selected Option')
        .required('Option is required'),
});



const AddressForm = ({ checkoutToken, next }) => {



    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
    const [shippingOptions, setShippingOptions] = useState([]);


    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zip: '',
            shippingCountry: '',
            shippingOption: '',
            shippingSubDivision: '',

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            next(values);

        },
    });









    useEffect(() => {
        const fetchShippingCountries = async (checkoutTokenId) => {
            const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

            setShippingCountries(countries);
            formik.values.shippingCountry = Object.keys(countries)[0];
            // setShippingCountry(Object.keys(countries)[0]);
        };
        fetchShippingCountries(checkoutToken.id);
    }, [checkoutToken, formik.values]);

    useEffect(() => {
        const fetchSubDivisions = async (countryCode) => {
            const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
            console.log('hereer');
            setShippingSubDivisions(subdivisions);
            formik.values.shippingSubDivision = Object.keys(subdivisions)[0];

            // setShippingSubDivision(Object.keys(subdivisions)[0]);
        };
        if (formik.values.shippingCountry !== '') fetchSubDivisions(formik.values.shippingCountry);
    }, [formik.values]);

    useEffect(() => {
        const fetchShippingOptions = async (checkoutTokenId, country, stateProvince) => {
            const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
            console.log('Console ====> ', options);
            setShippingOptions(options);
            formik.values.shippingOption = options[0].id;

            // setShippingOption(options[0].id);
        };
        if (formik.values.shippingSubDivision !== '') fetchShippingOptions(checkoutToken.id, formik.values.shippingCountry, formik.values.shippingSubDivision);
    }, [formik.values, checkoutToken]);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Addresss
            </Typography>

            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="city"
                            name="city"
                            label="City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="zip"
                            name="zip"
                            label="Zip/Postal Code"
                            value={formik.values.zip}
                            onChange={formik.handleChange}
                            error={formik.touched.zip && Boolean(formik.errors.zip)}
                            helperText={formik.touched.zip && formik.errors.zip}
                        />
                    </Grid>




                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={formik.values.shippingCountry} fullWidth onChange={formik.handleChange} id="shippingCountry" name="shippingCountry">
                            {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={formik.values.shippingSubDivision} fullWidth onChange={formik.handleChange} id="shippingSubDivision" name="shippingSubDivision">
                            {Object.entries(shippingSubDivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={formik.values.shippingOption} fullWidth onChange={formik.handleChange} id="shippingOption" name="shippingOption">
                            {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                </Grid>
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
                    <Button type="submit" variant="contained" color="primary">Next</Button>
                </div>
            </form>


        </>
    );
}

export default AddressForm


