'use client'

import { useState } from "react";
import { TBasicCompanyInfo } from "./page";

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/navigation';
import RemoveDialog from "../companies/RemoveDialog";



export default function CompanyRow({
    id,
    name,
    ordersCount,
    contactCount
}: Readonly<TBasicCompanyInfo>) {
    const router = useRouter();
    const gidArray = id.split('/');
    const companyId = gidArray[gidArray.length - 1];
    const [open, setOpen] = useState('');

    const handleClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
        e.stopPropagation();
        setOpen(id)
    }



    return (
        <TableRow
            sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { cursor: 'pointer' }
            }}
            onClick={() => { router.push(`/companies/${companyId}`) }}
        >
            <TableCell component="th" scope="row">
                {`${name}`}
            </TableCell>
            <TableCell component="th" scope="row">
                {ordersCount}
            </TableCell>
            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>
                {contactCount}
            </TableCell>
            <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' }}}>
                <IconButton disabled={ ordersCount > 0 } onClick={(e) => handleClick(e, id)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
            <RemoveDialog
                state={open}
                setState={setOpen}
                id={companyId}
                name={name}
            />
        </TableRow>
    )
}