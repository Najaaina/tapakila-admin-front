import { ArrayField, BooleanField, Datagrid, DateField, ImageField, NumberField, Show, SimpleShowLayout, TextField } from 'react-admin';
import { AddTicketButton } from '../../components/AddTicketButton.tsx';
// import { ReservationList } from '../../components/ReservationList.tsx';

export const EventShow = () => (
    <Show>
        <SimpleShowLayout>
            <ImageField source='image.url' label='Image' />
            <TextField source='title' />
            <TextField source='description' />
            <DateField
                source='event_date'
                options={{
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }}
                showTime
                label='Event date'
            />
            <DateField source='event_date' showTime showDate={false} label='Hour' />
            <TextField source='location' />
            <TextField source='organizer' />
            <TextField source='category' />
            <TextField source='status' />
            <ArrayField source='ticket_type'>
                <Datagrid>
                    <TextField source='ticket_name' />
                    <NumberField source='price' />
                    <BooleanField source='disponibility' />
                    <NumberField source='buying_limit' />
                </Datagrid>
            </ArrayField>
            <AddTicketButton />
        </SimpleShowLayout>
    </Show>
);
