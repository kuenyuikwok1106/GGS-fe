'use client'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
import deleteCompany from '../../serverActions/deleteCompany';
import React from "react";

export type TRemoveDialog = {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    id: string;
    name: string;
}

export default function RemoveDialog({
    state,
    setState,
    id,
    name
}: Readonly<TRemoveDialog>) {
    const deleteCompanyWithId = deleteCompany.bind(null, id);
    const handleClick = (e: React.MouseEvent<HTMLElement>, id?: string) => {
        e.stopPropagation();
       if(id) setState(id);
       else setState('')
    }

    return (
        <Dialog
            open={state !== ''}
            onClose={handleClick}
            onClick={handleClick}
        >
            <form action={deleteCompanyWithId}>
                <DialogTitle>Delete Company</DialogTitle>
                <DialogContent>
                    <DialogContentText mb={2}>
                        Are you sure you want to remove {name} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleClick(e)}>Cancel</Button>
                    <Button type="submit">Delete</Button>
                </DialogActions>
            </form>
        </Dialog>

    )
}