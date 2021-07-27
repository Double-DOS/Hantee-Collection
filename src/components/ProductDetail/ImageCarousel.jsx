import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons'
import { IconButton } from '@material-ui/core';
import { useState } from 'react';

const ImageCarousel = ({ product }) => {
    const [currImg, setCurrImg] = useState(0)
    let images = product.assets;

    const useStyles = makeStyles((theme) => ({

        carousel: {
            flex: "50%",
            height: "100vh",

            // backgroundColor: "black"

        },
        carouselInner: {
            height: "100%",
            width: "100%",
            [theme.breakpoints.down('xs')]: {
                height: "30vh"
            },
            display: "flex",
            backgroundImage: `url(${images[currImg].url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        },
        left: {
            flex: "10%",
            height: "100%",
            color: "red",
            backgroundColor: "rbga(0,0,0,.3)",
            display: "grid",
            placeItems: "center"

        },
        center: {
            flex: "80%",
            height: "100%",
            margin: "auto"

        },
        right: {
            flex: "10%",
            height: "100%",
            backgroundColor: "rbga(0,0,0,.6)",
            color: "red",
            display: "grid",
            placeItems: "center"
        },
    }))


    const classes = useStyles();
    return (
        <div className={classes.carousel}>
            <div className={classes.carouselInner}>
                <div className={classes.left}>
                    <IconButton onClick={() => { currImg > 0 && setCurrImg(currImg - 1) }}>
                        <ArrowBackIos color="primary" style={{ fontSize: 30 }} />
                    </IconButton>
                </div>
                <div className={classes.center}>
                </div>
                <div className={classes.right}>
                    <IconButton onClick={() => { currImg < images.length - 1 && setCurrImg(currImg + 1) }}>
                        <ArrowForwardIos color="primary" style={{ fontSize: 30 }} />
                    </IconButton>

                </div>
            </div>
        </div>
    )
}

export default ImageCarousel