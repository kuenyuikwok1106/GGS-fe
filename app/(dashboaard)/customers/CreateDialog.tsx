'use client';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormLabel from "@mui/material/FormLabel";
import Grid2 from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import React, { useReducer } from "react";
import createCustomer from "../../serverActions/createCustomer";
import { Button, DialogActions, styled } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import FormGrid from "../../components/FormGrid/FormGrid";

enum ActionType {
    CHANGE_EMAIL = 'CHANGE_EMAIL',
    CHANGE_FIRSTNAME = 'CHANGE_FIRSTNAME',
    CHANGE_LASTNAME = 'CHANGE_LASTNAME',
    CHANGE_PHONE = 'CHANGE_PHONE',
}

type NewCustomerActionType = {
    type: ActionType,
    payload: string,
}

type TNewCustomer = {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

function reducer(state: TNewCustomer, action: NewCustomerActionType) {
    switch (action.type) {
        case ActionType.CHANGE_EMAIL: {
            return {
                ...state,
                email: action.payload
            };
        }
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
    }
}

type CreateDialog = {
    open: boolean,
    onClick: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateDialog({
    open,
    onClick
}: Readonly<CreateDialog>) {
    const [state, dispatch] = useReducer(reducer, {
        email: 'johnnnn@example.com',
        firstName: 'John',
        lastName: 'Doeee',
        phone: '+16475283121',
    });

    return (
        <Dialog
            open={open}
            onClose={() => onClick(false)}
        >
            <form action={createCustomer}>
                <DialogTitle>Create New Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText mb={2}>
                        Please enter the necessary data to create a customer
                    </DialogContentText>
                    <Grid2 container spacing={3}>
                        <FormGrid size={{ xs: 12, md: 6 }}>
                            <FormLabel htmlFor="first-name" required>
                                First name
                            </FormLabel>
                            <OutlinedInput
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
                                id="last-name"
                                name="lastName"
                                type="name"
                                placeholder="Wick"
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
                                id="email"
                                name="email"
                                type="email"
                                placeholder="something@gmail.com"
                                autoComplete="email"
                                required
                                size="small"
                                value={state.email}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    dispatch({ type: ActionType.CHANGE_EMAIL, payload: event.target.value });
                                }}
                            />
                        </FormGrid>
                    </Grid2>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClick(false)}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </form>
        </Dialog >
    )
}