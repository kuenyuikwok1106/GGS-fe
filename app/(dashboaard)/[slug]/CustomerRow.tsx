'use client'

import Image from 'next/image';
import React, { useState } from "react";
import { TBasicCustomerInfo } from "./page";

import DeleteIcon from '@mui/icons-material/Delete';
import { Chip, IconButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { DateTime } from "luxon";
import { useRouter } from 'next/navigation';
import RemoveDialog from '../customers/RemoveDialog';

export default function CustomerRow({
    id,
    firstName,
    lastName,
    createdAt,
    imageSrc,
    canDelete,
    tags,
    companies
}: Readonly<TBasicCustomerInfo>) {
    const router = useRouter();
    const [open, setOpen] = useState('');

    const name = firstName && lastName ? `${firstName} ${lastName}` : '-'
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
            onClick={() => { router.push(`/customers/${id}`); console.log('bye') }}
        >
            <TableCell component="th" scope="row" >
                {
                    imageSrc
                    && (
                        <Box p={2} sx={{ position: 'relative' }}>
                            <Image
                                alt="user image"
                                src={imageSrc}
                                height={32}
                                width={32}
                                // fill={true}
                                style={{ objectFit: "contain" }}
                            />
                        </Box>
                    )
                }
            </TableCell>
            <TableCell component="th" scope="row">
                {`${name}`}
            </TableCell>
            <TableCell component="th" scope="row">
                {
                    companies.length 
                    ? (
                        companies.map(({ name }) => <Chip key={name} label={name} />)
                    ) : (
                        '-'
                    )
                }
            </TableCell>
            {/* <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>
                {
                    phone 
                    ? (
                        PhoneNumberUtil.getInstance()
                            .format(
                                PhoneNumberUtil.getInstance().parseAndKeepRawInput(phone),
                                PhoneNumberFormat.INTERNATIONAL
                            )
                    ) : (
                        '-'
                    )
                }
            </TableCell> */}
            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>
                {DateTime.fromISO(createdAt).toFormat('MMMM dd, yyyy')}
            </TableCell>
            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>
                {
                    tags && tags.length 
                    ? (
                        <Stack direction="row" spacing={1} alignItems="center" useFlexGap sx={{ flexWrap: 'wrap' }}>
                            {
                                tags.split(',').map((tag) => (
                                    <Chip key={tag} label={tag} />
                                ))
                            }
                        </Stack>
                    )
                    : ('-')
                }
            </TableCell>
            <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' }}}>
                <IconButton disabled={!canDelete} onClick={(e) => handleClick(e, id)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>

            <RemoveDialog
                state={open}
                setState={setOpen}
                id={id}
                name={name}            
            />
        </TableRow>
    )
}