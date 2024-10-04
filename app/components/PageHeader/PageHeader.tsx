'use client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, Grid2, OutlinedInput, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MuiTelInput } from 'mui-tel-input';
import React, { useReducer, useState } from 'react';
import CreateCustomerDialog from '../../(dashboaard)/customers/CreateDialog';
import CreateCompanyDialog from '../../(dashboaard)/companies/CreateDialog';



type TPageHeader = {
    header: string;
    subtitle: string;
    createButtonText: string;
}

export default function PageHeader({
    header,
    subtitle,
    createButtonText,
}: Readonly<TPageHeader>) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Box padding={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant='h5'>{ header }</Typography>
                        <Typography variant='subtitle1'>{ subtitle }</Typography>
                    </Box>
                    <Box>
                        <Button onClick={() => setOpen(true)}>{createButtonText}</Button>
                    </Box>
                </Stack>
            </Box>
            {
                header === 'Customers'
                ? (<CreateCustomerDialog open={open} onClick={setOpen} />)
                : (<CreateCompanyDialog open={open} onClick={setOpen} />)
            }
        </>
    )
}