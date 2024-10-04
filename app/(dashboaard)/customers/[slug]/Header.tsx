'use client';
import { Stack, Typography, Button, Tooltip, Box, IconButton } from "@mui/material";
import { use, useEffect, useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import RemoveDialog from "../RemoveDialog";

type THeader = {
    name: string;
    canDelete: boolean;
    id: string;
    verifiedEmail: boolean;
    validEmailAddress: boolean;
}

export default function Header({
    name, canDelete, id, verifiedEmail, validEmailAddress
}: Readonly<THeader>) {
    const [open, setOpen] = useState('');
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" spacing={1}>
                <Typography variant="h3">
                    {name}
                    <Tooltip title={validEmailAddress ? 'Valid email' : 'Invalid email'}>
                        <IconButton color={validEmailAddress ? "success" : "warning"}>
                            {
                                validEmailAddress ? (<EmailIcon />) : (<EmailOutlinedIcon />)
                            }

                        </IconButton>
                    </Tooltip>
                    <Tooltip title={verifiedEmail ? 'Verified email' : 'Verify now'}>
                        <IconButton color={verifiedEmail ? "success" : "warning"}>
                            {
                                verifiedEmail ? (<VerifiedIcon />) : (<VerifiedOutlinedIcon />)
                            }
                        </IconButton>
                    </Tooltip>
                </Typography>            {
                canDelete
                    ? (<Button variant="contained" color="error" onClick={() => setOpen(id)}>Delete</Button>)
                    : (
                        <Tooltip title="Sorry you can not delete the company as it has existing order.">
                            <Box>
                                <Button variant="contained" color="error" disabled>Delete</Button>
                            </Box>
                        </Tooltip>
                    )
            }
            <RemoveDialog
                state={open}
                setState={setOpen}
                id={id}
                name={name}
            />
        </Stack>
    )
}