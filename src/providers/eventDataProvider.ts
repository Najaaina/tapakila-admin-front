import {
    CreateParams,
    CreateResult,
    DeleteParams,
    DeleteResult,
    GetListParams,
    GetListResult,
    GetOneParams,
    GetOneResult,
    HttpError,
    QueryFunctionContext,
    RaRecord,
    UpdateParams,
    UpdateResult,
} from 'react-admin';
import { Event } from '../types/Event.ts';
import { TicketType } from '../types/TicketType.ts';

const API_URL: string = `${import.meta.env.VITE_API_URL}/api/admin`;

const eventDataProvider = {
    // Get the list of events with pagination and sorting
    getList: async function <RecordType extends RaRecord = never>(params: GetListParams & QueryFunctionContext): Promise<GetListResult<RecordType>> {
        const { pagination, sort } = params;
        const page: number = pagination?.page ?? 1;
        const perPage: number = pagination?.perPage ?? 10;
        const sortField: string = sort?.field ?? 'event_date';
        const sortOrder: string = sort?.order ?? 'DESC';
        const query = `?page=${page}&limit=${perPage}&sortBy=${sortField}&order=${sortOrder}`;

        const response: Response = await fetch(`${API_URL}/event${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        });
        const { data, total } = await response.json();
        const mappedData = data.map((event: Event) => ({
            ...event,
            id: event.id_event,
        }));

        return {
            data: mappedData,
            total: total,
        };
    },

    // Get a single event by ID
    getOne: async function <RecordType extends RaRecord = never>(params: GetOneParams<RecordType> & QueryFunctionContext): Promise<GetOneResult<RecordType>> {
        const { id } = params;
        const response: Response = await fetch(`${API_URL}/event${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        });
        if (!response.ok) {
            return Promise.reject(new HttpError('Event not found', response.status));
        }
        const data = await response.json();
        return {
            data: {
                ...data,
                id: data.id_event,
            },
        };
    },

    // Create a new event
    /*create: async (resource, params) => {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data),
        });
        const event = await response.json();
        return { data: event };
    },*/
    create: async function <RecordType extends RaRecord = never>(params: CreateParams<RecordType>): Promise<CreateResult<RecordType>> {
        const response: Response = await fetch(`${API_URL}/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(params.data),
        });
        if (!response.ok) {
            return Promise.reject(new HttpError('Failed to create record event ', response.status));
        }

        const createdResult = await response.json();
        return {
            data: {
                ...createdResult,
                id: createdResult.id_event,
            },
        };
    },

    // Update an existing event
    update: async function <RecordType extends RaRecord = never>(params: UpdateParams<RecordType>): Promise<UpdateResult<RecordType>> {
        const { id, data } = params;

        if (Object.keys(data).length === 0) {
            return Promise.reject(new HttpError('No valid data provided for update', 400));
        }

        if ('status' in data && Object.keys(data).length === 1) {
            //     Update the status of an event (to PUBLISHED or CANCELLED
            const response: Response = await fetch(`${API_URL}/event/${id}/${data.status}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ status: data.status }),
            });
            if (!response.ok) {
                return Promise.reject(new HttpError('Failed to update the status of event ', response.status));
            }
            const updatedEvent = await response.json();
            return {
                data: {
                    ...updatedEvent,
                    id: updatedEvent.id_event,
                },
            };
        }

        if ('ticket_type' in data && Object.keys(data).length === 1) {
            const response: Response = await fetch(`${API_URL}/event/${id}/ticket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(data.ticket_type),
            });
            if (!response.ok) {
                return Promise.reject(new HttpError('Failed to assign a ticket to the event', response.status));
            }
            const createdTicket = await response.json();

            // Verify ticket assignment
            const eventResponse: Response = await fetch(`${API_URL}/event/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
            });

            if (!eventResponse.ok) {
                return Promise.reject(new HttpError('Failed to fetch event for verification', eventResponse.status));
            }

            const eventData = await eventResponse.json();

            const ticketExists = eventData.ticket_type?.some((ticket: TicketType) => ticket.id_ticket === createdTicket.id_ticket);

            if (!ticketExists) {
                return Promise.reject(new HttpError('Ticket was not properly assigned to event', 500));
            }

            return {
                data: {
                    ...createdTicket,
                    id: createdTicket.id_ticket,
                },
            };
        }

        const { status, ticket_type, ...updateData } = data;
        console.log(status, ticket_type);

        if (Object.keys(updateData).length === 0) {
            return Promise.reject(new HttpError('Invalid update parameters: No updatable fields', 400));
        }

        const response: Response = await fetch(`${API_URL}/event/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            return Promise.reject(new HttpError('Failed to update event details', response.status));
        }

        const updatedEvent = await response.json();
        return {
            data: {
                ...updatedEvent,
                id: updatedEvent.id_event,
            },
        };
    },

    // Delete an event
    delete: async function <RecordType extends RaRecord = never>(params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType>> {
        const { id, previousData } = params;

        const response: Response = await fetch(`${API_URL}/event/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        });

        if (!response.ok) {
            return Promise.reject(new HttpError('Failed to delete event', response.status));
        }

        return {
            data: previousData as RecordType,
        };
    },

    // Upload event image
    /*uploadImage: async (resource, params) => {
        const formData = new FormData();
        formData.append('file', params.data);

        const response = await fetch(`/api/events/${params.id}/image`, {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();
        return { data: result };
    },*/

    // Set event status (Draft, Published, Cancelled)
    /*updateStatus: async (resource, params) => {
        const { id, status } = params;
        const response = await fetch(`/api/events/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        const event = await response.json();
        return { data: event };
    },*/
};

export default eventDataProvider;
