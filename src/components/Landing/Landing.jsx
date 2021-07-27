import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Collapse, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        minHeight: '100vh',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    toolbar: theme.mixins.toolbar,
    root: {
        minHeight: '90vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + 'backgroung.png'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

    },
    mainFeaturedPostContent: {
        color: '#FFFFFF',
        position: 'relative',
        padding: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
}));

export default function MainFeaturedPost(props) {
    const classes = useStyles();
    const post = {
        title: 'HANTEE COLLECTIONS',
        description:
            "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
        image: 'https://source.unsplash.com/random',
        imgText: 'Hantee Collections',
        linkText: 'Start Shopping',
    };

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true);
    }, [])

    return (
        <>
            <div className={classes.toolbar} />

            <Paper className={classes.root}>
                <CssBaseline />
                {/* Increase the priority of the hero background image */}
                {/* <img style={{ display: 'none', height: '100%' }} src={`url(${process.env.PUBLIC_URL + 'backgroung.png'})`} alt={post.imageText} /> */}
                <div className={classes.overlay} />
                <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
                    <Grid container>
                        <Grid item md={6}>
                            <div className={classes.mainFeaturedPostContent}>
                                <Typography component="h1" variant="h1" color="primary" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography variant="h5" paragraph>
                                    {post.description}
                                </Typography>
                                <Typography component="h6" variant="h6" color="primary" gutterBottom>
                                    {post.linkText}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Collapse>
            </Paper>
        </>
    );
}