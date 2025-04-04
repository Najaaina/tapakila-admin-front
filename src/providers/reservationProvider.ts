import { HttpError } from 'react-admin';

const API_URL: string = `${import.meta.env.VITE_API_URL}/api/admin`;

export const reservationProvider = {
    getReservationsByEvent: async (eventId: string) => {
        const response = await fetch(`${API_URL}/reservation/event/${eventId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        });

        if (!response.ok) {
            throw new HttpError('Failed to fetch reservations', response.status);
        }

        const reservations = await response.json();

        return {
            data: reservations.map((reservation: any) => ({
                ...reservation,
                id: reservation.id_reservation,
            })),
        };
    },
    cancelReservation: async (reservationId: string) => {
        const response = await fetch(`${API_URL}/reservation/${reservationId}/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        });

        if (!response.ok) {
            throw new HttpError('Failed to cancel reservation', response.status);
        }

        const cancelled = await response.json();
        return {
            data: {
                ...cancelled,
                id: cancelled.id_reservation,
            },
        };
    },
};
