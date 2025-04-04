import { JSX, useEffect, useState } from 'react';
import { Datagrid, List, TextField, useNotify } from 'react-admin';
import { reservationProvider } from '../providers/reservationProvider';

type ReservationListProps = {
    eventId: string;
};

export const ReservationList = ({ eventId }: ReservationListProps): JSX.Element => {
    const notify = useNotify();
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        reservationProvider
            .getReservationsByEvent(eventId)
            .then(response => setReservations(response.data))
            .catch(error => {
                notify(error.message, { type: 'error' });
            });
    }, [eventId, notify]);

    return (
        <List>
            <Datagrid data={reservations}>
                <TextField source='id_reservation' label='ID' />
                <TextField source='user_name' label='User' />
                <TextField source='status' label='Status' />
                <TextField source='ticket_type' label='Ticket Type' />
            </Datagrid>
        </List>
    );
};
