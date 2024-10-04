import { Chip, Divider, Stack, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";

type TRoleInfo = {
    roles: {
        id: string;
        gid: string;
        name: string;
        note: string;
        createdAt: string;
        updatedAt: string;
        companyId: string;
    }[]
}

export default function RoleInfo({
    roles
}: Readonly<TRoleInfo>) {
    return (
        <Box my={1}>
            <Typography variant="h6">Roles</Typography>
            <Divider sx={{ mb: 2 }}/>
            {
                roles.length
                ? (
                    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                        {
                            roles.map((role) => 
                                <Tooltip key={role.name} title={role.note}>
                                    <Chip label={role.name} />
                                </Tooltip>
                            )
                        }

                    </Stack>
                ) : (
                    <Typography variant='subtitle1' textAlign="center"> Sorry, the company do not have any role yet. </Typography>
                )
            }
        </Box>
    )
}