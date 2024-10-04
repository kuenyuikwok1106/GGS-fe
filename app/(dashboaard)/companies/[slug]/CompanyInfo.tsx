'use client';
import { Box, Divider, Stack, Tooltip, Chip, Grid2, FormLabel, OutlinedInput, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FormEventHandler, useReducer, useState, useTransition } from "react";
import FormGrid from "../../../components/FormGrid/FormGrid";
import updateCompany from "../../../serverActions/updateCompany";
import { useRouter, useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";

type TCompanyInfo = {
    info: any
}

type State = {
    name: string,
    note: string
}

enum ActionType {
    CHANGE_NAME = 'CHANGE_NAME',
    CHANGE_NOTE = 'CHANGE_NOTE',
    RESET = 'RESET',
}

type UpdateCompanyActionType =
    { type: ActionType.CHANGE_NAME, payload: string }
    | { type: ActionType.CHANGE_NOTE, payload: string }
    | { type: ActionType.RESET, payload: { name: string, note: string } }


function reducer(state: State, action: UpdateCompanyActionType) {
    switch (action.type) {
        case ActionType.CHANGE_NAME: {
            return {
                ...state,
                name: action.payload
            };
        }
        case ActionType.CHANGE_NOTE: {
            return {
                ...state,
                note: action.payload
            };
        }
        case ActionType.RESET: {
            return action.payload;
        }
        default: {
            return state
        }
    }
}

export default function CompanyInfo({
    info: {
        id,
        gid,
        contactCount,
        joinDate,
        name,
        note,
        ordersCount,
        createdAt,
        updatedAt
    }
}: Readonly<TCompanyInfo>) {
    const updateCompanyWithId = updateCompany.bind(null, id);

    const [editMode, setEditMode] = useState(false);

    const [state, dispatch] = useReducer(reducer, {
        name: name || '',
        note: note || ''
    })

    const handleOnCancel = () => {
        setEditMode(false);
        dispatch({ type: ActionType.RESET, payload: { name, note } })
    }

    return (
        <Box my={1}>
            <form action={updateCompanyWithId}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h6">Info</Typography>
                    <Box>
                        {
                            editMode
                                ? (
                                    <>
                                        <Button onClick={handleOnCancel}>Cancel</Button>
                                        <Button type="submit">Confirm</Button>
                                    </>
                                ) : (
                                    <Button variant="contained" onClick={() => setEditMode(true)} >Edit</Button>
                                )
                        }
                    </Box>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Grid2 container spacing={3}>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="name" required>
                            Name
                        </FormLabel>
                        <OutlinedInput
                            disabled={!editMode}
                            id="name"
                            name="name"
                            type="name"
                            placeholder={state.name}
                            value={state.name || ''}
                            required
                            size="small"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch({ type: ActionType.CHANGE_NAME, payload: event.target.value });
                            }}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 6, md: 3 }}>
                        <FormLabel htmlFor="contactCount" required>
                            Contact Count
                        </FormLabel>
                        <OutlinedInput
                            disabled
                            placeholder={contactCount}
                            size="small"
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 6, md: 3 }}>
                        <FormLabel htmlFor="ordersCount" required>
                            Order Count
                        </FormLabel>
                        <OutlinedInput
                            disabled
                            placeholder={ordersCount}
                            size="small"
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12 }}>
                        <FormLabel htmlFor="note" required>
                            Note
                        </FormLabel>
                        <OutlinedInput
                            disabled={!editMode}
                            id="name"
                            name="note"
                            type="name"
                            placeholder={state.note}
                            value={state.note || ''}
                            size="small"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch({ type: ActionType.CHANGE_NOTE, payload: event.target.value });
                            }}
                        />
                    </FormGrid>
                </Grid2>
            </form>
        </Box>
    )
}