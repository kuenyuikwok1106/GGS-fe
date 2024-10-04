'use client';
import { Button, DialogActions, styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormLabel from "@mui/material/FormLabel";
import Grid2 from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import React, { useState } from "react";
import createCompany from '../../serverActions/createCompany';

const FormGrid = styled(Grid2)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

type CreateDialog = {
    open: boolean,
    onClick: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateDialog({
    open,
    onClick
}: Readonly<CreateDialog>) {
    const [name, setName] = useState('');

    return (
        <Dialog
            open={open}
            onClose={() => onClick(false)}
        >
            <form action={createCompany}>
                <DialogTitle>Create New Company</DialogTitle>
                <DialogContent>
                    <DialogContentText mb={2}>
                        Please enter the necessary data to create a company
                    </DialogContentText>
                    <Grid2 container spacing={3}>
                        <FormGrid size={{ xs: 12 }}>
                            <FormLabel htmlFor="name" required>
                                Name
                            </FormLabel>
                            <OutlinedInput
                                id="name"
                                name="name"
                                type="name"
                                placeholder="John"
                                autoComplete="first name"
                                required
                                size="small"
                                value={name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(event.target.value);
                                }}
                            />
                        </FormGrid>
                    </Grid2>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClick(false)}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </form>
        </Dialog >
    )
}