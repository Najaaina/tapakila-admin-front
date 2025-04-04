import { JSX, useState } from 'react';
import { Button, useDataProvider, useNotify, useRecordContext, useRefresh } from 'react-admin';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const AddTicketButton = (): JSX.Element => {
    const record = useRecordContext();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        ticket_name: '',
        price: '',
        buying_limit: '',
    });

    const notify = useNotify();
    const refresh = useRefresh();
    const dataProvider = useDataProvider();

    const handleSubmit = async () => {
        try {
            await dataProvider.update('events', {
                id: record?.id_event,
                data: {
                    ticket_type: {
                        ticket_name: form.ticket_name,
                        price: parseFloat(form.price),
                        buying_limit: parseInt(form.buying_limit),
                    },
                },
                previousData: record,
            });

            notify('Ticket type added successfully', { type: 'info' });
            refresh();
            setOpen(false);
        } catch (error: any) {
            notify(error.message || 'Failed to add ticket', { type: 'error' });
        }
    };

    return (
        <>
            <Button label='Add Ticket Type' onClick={() => setOpen(true)}>
                <AddIcon />
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Ticket</DialogTitle>
                <DialogContent>
                    <TextField
                        label='Ticket Name'
                        fullWidth
                        margin='dense'
                        value={form.ticket_name}
                        onChange={e => setForm({ ...form, ticket_name: e.target.value })}
                    />
                    <TextField
                        label='Price'
                        type='number'
                        fullWidth
                        margin='dense'
                        value={form.price}
                        onChange={e => setForm({ ...form, price: e.target.value })}
                    />
                    <TextField
                        label='Buying Limit'
                        type='number'
                        fullWidth
                        margin='dense'
                        value={form.buying_limit}
                        onChange={e => setForm({ ...form, buying_limit: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button label='Cancel' onClick={() => setOpen(false)} />
                    <Button label='Save' onClick={handleSubmit} />
                </DialogActions>
            </Dialog>
        </>
    );
};
