'use client';

import { Autocomplete, Box, Button, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import AddCompanyDialog from "./AddCompanyDialog";
import attachRoleToCustomer from "../../../serverActions/attachRoleToCustomer";

type TCompanyInfo = {
    companies: any[];
    companyInfo: any[];
    customerRoles: any[];
    customerId: string
}

export default function CompanyInfo({
    companies,
    companyInfo,    // for Dialog AutoSelect
    customerId,
    customerRoles
}: Readonly<TCompanyInfo>) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const attachRoleToCustomerWithCustomerId = attachRoleToCustomer.bind(null, customerId);


    const allCompanyRoles = useMemo(() => (companies[0].companyRoles.map(({ id, name }) => ({ id, label: name }))), [companies]);
    const customerInitialRole = useMemo(() => (
        allCompanyRoles.filter((role) => customerRoles.find((cr) => role.id === cr.id))
    ), [customerRoles])

    const [appendRole, setAppendRole] = useState(customerInitialRole);
    const handleOnCancel = () => { setEditMode(false); };

    const briefCompanyInfo = useMemo(() => {
        return companyInfo.map(({ id, name }) => ({
            id, label: name
        }))
    }, [companyInfo])

    const briefValue = companies[0] ? {
        id: companies[0].id,
        label: companies[0].name
    } : null

    return (
        <Box my={2}>
            <form action={attachRoleToCustomerWithCustomerId}>
                <Stack direction={{ xs: "column", md: "row" }} alignItems={{ md: "center" }} justifyContent="space-between">
                    <Typography variant="h6">Company</Typography>
                    <Stack spacing={{ xs: 1, md: 2 }} direction="row" justifyContent={{ xs: "flex-start", md: 'flex-end' }} useFlexGap sx={{ flexWrap: "wrap " }}>
                        {
                            editMode
                                ? (
                                    <>
                                        <Button onClick={handleOnCancel}>Cancel</Button>
                                        <Button type="submit">Confirm</Button>
                                    </>
                                ) : (
                                    <Button variant="contained" disabled onClick={() => setEditMode(true)} >Edit</Button>
                                )
                        }
                        <Button
                            variant="outlined"
                            onClick={() => setOpen(true)}
                        >
                            {companies.length ? 'Change Company' : 'Add Company'}
                        </Button>
                    </Stack>
                </Stack>
                <Divider sx={{ mb: 2, mt: 1 }} />
                <TableContainer sx={{ maxHeight: '70vh', px: 2 }}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Name</TableCell>
                                <TableCell>Role Taken</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                companies.length
                                    ? (
                                        companies.map(({ name, id }) => (
                                            <TableRow key={id} sx={{ '&:hover': { cursor: 'pointer' } }}>
                                                <TableCell onClick={() => router.push(`/companies/${id}`)} >
                                                    {name || '-'}
                                                </TableCell>
                                                <TableCell>
                                                    <Autocomplete
                                                        disabled={!editMode}
                                                        fullWidth
                                                        multiple
                                                        filterSelectedOptions
                                                        options={allCompanyRoles}
                                                        value={appendRole}
                                                        getOptionLabel={(option) => option.label}
                                                        renderInput={(params) => <TextField label="Attach Role" {...params} />}
                                                        onChange={(e, v) => {
                                                            setAppendRole(v)
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                <Typography variant='subtitle1' textAlign="center"> Sorry, the customer does not belong to any company yet. </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                            }
                            {
                                appendRole && appendRole.length
                                    ? (
                                        appendRole.map((role) => (
                                            <input
                                                key={role.id}
                                                type="hidden"
                                                name="role"
                                                value={role.id}
                                            />
                                        ))
                                    ) : (
                                        <input
                                            type="hidden"
                                            name="role"
                                            value={[]}
                                        />
                                    )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
            <AddCompanyDialog
                open={open}
                onClick={setOpen}
                value={briefValue}
                options={briefCompanyInfo}
                customerId={customerId}
            />
        </Box >
    )
}