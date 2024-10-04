'use client';
import { OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Dispatch, SetStateAction } from 'react';

type TPageHeader = {
    header: string;
    subtitle: string;
    query: string;
    onChangeQuery: Dispatch<SetStateAction<string>>;
}

export default function PageHeader({
    header,
    subtitle,
    query,
    onChangeQuery,
}: Readonly<TPageHeader>) {

    return (
        <>
            <Box padding={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant='h5'>{ header }</Typography>
                        <Typography variant='subtitle1'>{ subtitle }</Typography>
                    </Box>
                    <Box>
                        <OutlinedInput
                            size="small"
                            startAdornment={<SearchIcon />}
                            value={query}
                            onChange={(e) => {
                                onChangeQuery(e.target.value)
                            }}
                        />
                    </Box>
                </Stack>
            </Box>
        </>
    )
}