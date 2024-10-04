'use client'

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import CreateCompanyDialog from '../../(dashboaard)/companies/CreateDialog';
import CreateCustomerDialog from '../../(dashboaard)/customers/CreateDialog';

export default function GlobalBreadcrumbs() {
    const paths = usePathname().split('/').filter( path => path );
    const [open, setOpen] = React.useState(false);
    const createButton = React.useCallback(() => {
        if(paths.length === 1) {
            switch(paths[0]) {
                case ('companies'): {
                    return (<Button variant='outlined' onClick={() => setOpen(true)}>Create Companies</Button>)
                }
                case ('customers'): {
                    return (<Button variant='outlined' onClick={() => setOpen(true)}>Create Customers</Button>)
                }
                default: {
                    return (<></>)
                }
            }
        }
        return (<></>);
    }, [paths])
    const createDialog = React.useCallback(() => {
        if(paths.length === 1) {
            switch(paths[0]) {
                case ('customers'): {
                    return (<CreateCustomerDialog open={open} onClick={setOpen} />)
                }
                case ('companies'): {
                    return (<CreateCompanyDialog open={open} onClick={setOpen} />)
                }
                default: {
                    return (<></>)
                }
            }
        }
        return (<></>);
    }, [paths])
    return (
        <Box mb={2}>
            <Stack mb={1} direction="row" justifyContent="space-between" alignItems="center">
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
                    <Link underline="hover" color="inherit" href="/">
                        Dashboard
                    </Link>
                    {
                        paths.map((path, index) => (
                            <Link
                                key={path}
                                underline="hover"
                                color="inherit"
                                href={`/${paths.slice(0, index + 1).join('/')}`}
                                sx={{ textTransform: 'capitalize' }}
                            >
                                {path}
                            </Link>
                        ))
                    }
                </Breadcrumbs>
                {createButton()}
                {createDialog()}
            </Stack>
            <Divider />
        </Box>
    )
}