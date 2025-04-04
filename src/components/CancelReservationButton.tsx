import { Button, useNotify, useRefresh } from 'react-admin';
import CancelIcon from '@mui/icons-material/Cancel';
import { reservationProvider } from '../providers/reservationProvider';
import { JSX } from 'react';

type Props = {
    record?: any;
};

export const CancelReservationButton = ({ record }: Props): JSX.Element | null => {
    const notify = useNotify();
    const refresh = useRefresh();

    if (!record || record.status === 'cancelled') return null;

    const handleClick = async () => {
        try {
            await reservationProvider.cancelReservation(record.id_reservation);
            notify('Reservation cancelled successfully', { type: 'info' });
            refresh();
        } catch (error: any) {
            notify(error.message, { type: 'error' });
        }
    };

    return (
        <Button label='Cancel' onClick={handleClick}>
            <CancelIcon />
        </Button>
    );
};
