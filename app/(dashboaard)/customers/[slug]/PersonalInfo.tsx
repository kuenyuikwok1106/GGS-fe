'use client';

import { Autocomplete, Button, Chip, Divider, FormLabel, Grid2, OutlinedInput, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { useReducer, useState } from "react";
import FormGrid from "../../../components/FormGrid/FormGrid";
import { MuiTelInput } from "mui-tel-input";
import updateCustomer from "../../../serverActions/updateCustomer";

export type TCustomerInfo = {
    id: string
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    note: string;
    tags: string[];
}

enum ActionType {
    CHANGE_EMAIL = 'CHANGE_EMAIL',
    CHANGE_FIRSTNAME = 'CHANGE_FIRSTNAME',
    CHANGE_LASTNAME = 'CHANGE_LASTNAME',
    CHANGE_PHONE = 'CHANGE_PHONE',
    CHANGE_NOTE = 'CHANGE_NOTE',
    CHANGE_TAGS = 'CHANGE_TAGS',
    RESET = 'RESET',
}

type UpdateCustomerActionType =
    { type: ActionType.CHANGE_EMAIL, payload: string }
    | { type: ActionType.CHANGE_FIRSTNAME, payload: string }
    | { type: ActionType.CHANGE_LASTNAME, payload: string }
    | { type: ActionType.CHANGE_PHONE, payload: string }
    | { type: ActionType.CHANGE_NOTE, payload: string }
    | { type: ActionType.CHANGE_TAGS, payload: string[] }
    | {
        type: ActionType.RESET, payload: {
            firstName: string,
            lastName: string,
            email: string,
            phone: string
            note: string,
            tags: string[]
        }
    }

function reducer(state: Omit<TCustomerInfo, 'id'>, action: UpdateCustomerActionType) {
    switch (action.type) {
        case ActionType.CHANGE_FIRSTNAME: {
            return {
                ...state,
                firstName: action.payload
            };
        }
        case ActionType.CHANGE_LASTNAME: {
            return {
                ...state,
                lastName: action.payload
            };
        }
        case ActionType.CHANGE_PHONE: {
            return {
                ...state,
                phone: action.payload
            };
        }
        case ActionType.CHANGE_EMAIL: {
            return {
                ...state,
                email: action.payload
            };
        }
        case ActionType.CHANGE_NOTE: {
            return {
                ...state,
                note: action.payload
            };
        }
        case ActionType.CHANGE_TAGS: {
            return {
                ...state,
                tags: action.payload
            };
        }
        case ActionType.RESET: {
            return {
                ...action.payload
            };
        }
        default: {
            return state
        }
    }
}

export default function PersonalInfo({
    id,
    firstName,
    lastName,
    email,
    phone,
    note,
    tags,
}: Readonly<TCustomerInfo>) {
    const updateCustomerWithId = updateCustomer.bind(null, id);

    const [editMode, setEditMode] = useState(false);
    const [state, dispatch] = useReducer(reducer, {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        phone: phone || '',
        note: note || '',
        tags: tags || [],
    });

    const handleOnCancel = () => {
        setEditMode(false);
        dispatch({ type: ActionType.RESET, payload: { firstName, lastName, email, phone, note, tags } });
    }

    return (
        <Box my={1}>
            <form action={updateCustomerWithId}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} mb={2}>
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
                        <FormLabel htmlFor="first-name" required>
                            First name
                        </FormLabel>
                        <OutlinedInput
                            disabled={!editMode}
                            id="first-name"
                            name="firstName"
                            type="name"
                            placeholder="John"
                            autoComplete="first name"
                            required
                            size="small"
                            value={state.firstName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch({ type: ActionType.CHANGE_FIRSTNAME, payload: event.target.value });
                            }}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="last-name" required>
                            Last name
                        </FormLabel>
                        <OutlinedInput
                            disabled={!editMode}
                            id="last-name"
                            name="lastName"
                            type="name"
                            placeholder="Doe"
                            autoComplete="last name"
                            required
                            size="small"
                            value={state.lastName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch({ type: ActionType.CHANGE_LASTNAME, payload: event.target.value });
                            }}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="phone-number" required>
                            Phone number
                        </FormLabel>
                        <MuiTelInput
                            disabled={!editMode}
                            id="phone-number"
                            name="phone"
                            defaultCountry="CA"
                            value={state.phone}
                            onChange={(event) => {
                                dispatch({ type: ActionType.CHANGE_PHONE, payload: event });
                            }}
                            required
                            size='small'
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="email" required>
                            Email
                        </FormLabel>
                        <OutlinedInput
                            disabled={!editMode}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john.doe@sth.com"
                            autoComplete="email"
                            required
                            size="small"
                            value={state.email}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch({ type: ActionType.CHANGE_EMAIL, payload: event.target.value });
                            }}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12 }}>
                        <FormLabel htmlFor="note" required>
                            Note
                        </FormLabel>
                        <OutlinedInput
                            rows={3}
                            multiline
                            disabled={!editMode}
                            id="note"
                            name="note"
                            type="note"
                            size="small"
                            placeholder={state.note || 'Write something here ...'}
                            value={state.note}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch({ type: ActionType.CHANGE_NOTE, payload: event.target.value });
                            }}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12 }}>
                        <Autocomplete
                            disabled={!editMode}
                            value={state.tags}
                            clearIcon={false}
                            options={[]}
                            freeSolo
                            multiple
                            renderInput={(params) => <TextField label="Add Tags" {...params} />}
                            onChange={(event, value) => (
                                dispatch({ type: ActionType.CHANGE_TAGS, payload: value })
                            )}

                        />
                    </FormGrid>
                    <Box display="none">
                        {state.tags.length && state.tags.map((tag, index) => (
                            <input
                                key={index}
                                type="hidden"
                                name="tags"
                                value={tag}
                            />
                        ))}
                    </Box>
                </Grid2>
            </form>
        </Box>
    )
}