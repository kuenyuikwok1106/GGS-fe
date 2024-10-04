import * as React from 'react';
import Box from '@mui/material/Box';

export default function CustomersPagesLayout(props: { children: React.ReactNode }) {
  return (
    <Box padding={0}>
      {props.children}
    </Box>
  );
}
