'use client';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, TextField } from "@mui/material";
import { useState } from "react";
import attachCustomerToCompany from "../../../serverActions/attachCustomerToCompany";

type AddCompanyDialog = {
    open: boolean;
    onClick: React.Dispatch<React.SetStateAction<boolean>>;
    value: { id: string, label: string } | null;
    options: { id: string, label: string }[];
    customerId: string;
}

export default function AddCompanyDialog({
    open,
    onClick,
    options,
    value,
    customerId
}: Readonly<AddCompanyDialog>) {
    const attachCustomerToCompanyWithCustomerId = attachCustomerToCompany.bind(null, customerId);

    const [added, setAdded] = useState<{ id: string, label: string }>(value || options[0]);

    const handleClose = () => {
        setAdded(value || options[0])
        onClick(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <form action={attachCustomerToCompanyWithCustomerId} onSubmit={handleClose}>
                <DialogTitle>{ value ? ' Change' : 'Add' } Company</DialogTitle>
                <DialogContent>
                    <DialogContentText mb={2}>
                        Please select the company you want to relate with.
                    </DialogContentText>
                    <Grid2 container spacing={3}>
                        <Autocomplete
                            fullWidth
                            filterSelectedOptions
                            options={options}
                            renderInput={(params) => <TextField label={`${ value ? ' Change' : 'Add' }  Company`} {...params} />}
                            value={added}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => (
                                setAdded(value as {
                                    id: string;
                                    label: string;
                                })
                            )}
                        />
                    </Grid2>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">{ value ? ' Change' : 'Add' }</Button>
                </DialogActions>
                <Box>
                    {
                        added && added !== value ?
                            (
                                <input
                                    key={added.id}
                                    type="hidden"
                                    name="company"
                                    value={added.id}
                                />
                            ) : (
                                <input
                                    type="hidden"
                                    name="company"
                                    value={[]}
                                />
                            )
                    }
                </Box>
            </form>
        </Dialog >
    )
}