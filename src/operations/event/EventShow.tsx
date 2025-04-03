import { ArrayField, BooleanField, Datagrid, DateField, ImageField, NumberField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const EventShow = () => (
    <Show>
        <SimpleShowLayout>
            <ImageField source='url' title='Image' src={'url'} />
            <TextField source='title' />
            <TextField source='description' />
            <DateField source='event_date' />
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
        </SimpleShowLayout>
    </Show>
);
