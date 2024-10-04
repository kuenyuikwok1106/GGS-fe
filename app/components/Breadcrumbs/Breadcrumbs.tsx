'use client'

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { usePathname } from 'next/navigation';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function GlobalBreadcrumbs() {
    const paths = usePathname().split('/').filter( path => path );
    return (
        <Box mb={2}>
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
            <Divider />
        </Box>
    )
}