'use client';

import { Box, Typography, Divider, Stack, Tooltip, Chip, TableBody, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useRouter } from "next/navigation";

type TCustomerInfo = {
    customers: any[]
}

export default function CustomerInfo({
    customers,
}: Readonly<TCustomerInfo>) {
    const router = useRouter();
    return (
        <Box my={1}>
            <Typography variant="h6">Customers</Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer sx={{ maxHeight: '70vh', px: 2 }}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Name</TableCell>
                            <TableCell>Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            customers && customers.length
                                ? (
                                    customers.map(({ companyRoles, id, firstName, lastName }) => (
                                        <TableRow key={id} sx={{ '&:hover': { cursor: 'pointer' } }}>
                                            <TableCell onClick={() => router.push(`/customers/${id}`)} >
                                                {
                                                    firstName && lastName
                                                        ? `${firstName} ${lastName}`
                                                        : '-'
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    companyRoles.length
                                                        ? (
                                                            companyRoles.map((role) => (
                                                                <Chip key={role.name} sx={{ m: 1 }} label={role.name} />
                                                            ))
                                                        ) : (
                                                            <Typography variant="subtitle1">No role is attached to this customer.</Typography>
                                                        )
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2}>
                                            <Typography variant='subtitle1' textAlign="center"> Sorry, the company do not have any customer yet. </Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    )
}