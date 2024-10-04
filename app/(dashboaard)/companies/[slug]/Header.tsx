'use client';
import { Stack, Typography, Button, Tooltip, Box } from "@mui/material";
import { use, useEffect, useState } from "react";
import RemoveDialog from "../RemoveDialog";

type THeader = {
    name: string;
    ordersCount: number;
    id: string;
}

export default function Header({
    name, ordersCount, id
}: Readonly<THeader>) {
    const [open, setOpen] = useState('');
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" spacing={1}>
            <Typography variant="h3" mb={2} sx={{ wordBreak: 'break-all' }}>{name}</Typography>
            {
                ordersCount === 0
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