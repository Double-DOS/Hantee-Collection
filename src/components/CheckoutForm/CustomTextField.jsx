import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'

const TextInput = ({ name, label, required }) => {
    const { control } = useFormContext();
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                control={control}
                name={name}
                label={label}
                fullWidth
                required={required}
                render={({ field: {
                    name, label, required
                } }) => <TextField name={name} label={label} required={required} />}
            />
        </Grid>
    )
}

export default TextInput
