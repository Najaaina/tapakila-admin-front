// components/EventReservations.tsx
import { useRecordContext } from 'react-admin';
import { Box, Typography } from '@mui/material';
import { ReservationList } from './ReservationList';
import { JSX } from 'react';

// const EventReservations = (): JSX.Element | null => {
//     const record = useRecordContext();
//     if (!record) return null;
//
//     return (
//         <Box mt={2}>
//             <Typography variant="h6">Reservations</Typography>
//             <ReservationList eventId={record.id_event} />
//     </Box>
// );
// };

const EventReservations = (): JSX.Element | null => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <Box>
            <Typography variant='h6'> Reservations </Typography>
            <ReservationList eventId={record.id.toString()} />
        </Box>
    );
};

export default EventReservations;
