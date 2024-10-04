import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import deleteCustomer from "../../serverActions/deleteCustomer";
import { TRemoveDialog } from "../companies/RemoveDialog";

export default function RemoveDialog({
    state,
    setState,
    id,
    name
}: Readonly<TRemoveDialog>) {
    const deleteCustomerWithId = deleteCustomer.bind(null, id);    
    const handleClick = (e: React.MouseEvent<HTMLElement>, id?: string) => {
        e.stopPropagation();
       if(id) setState(id);
       else setState('')
    }

    return (
        <Dialog
            open={state !== ''}
            onClose={handleClick}
            onClick={handleClick}
        >
            <form action={deleteCustomerWithId}>
                <DialogTitle>Delete Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText mb={2}>
                        Are you sure you want to remove {name} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleClick(e)}>Cancel</Button>
                    <Button type="submit">Delete</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}