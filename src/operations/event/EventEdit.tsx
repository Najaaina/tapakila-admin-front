import { DateTimeInput, Edit, SelectInput, SimpleForm, TextInput } from 'react-admin';

export const EventEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source='title' />
            <TextInput source='description' />
            <DateTimeInput source='event_date' />
            <TextInput source='location' />
            <TextInput source='organizer' />
            <TextInput source='category' />
            <TextInput source='image.url' />
            <TextInput source='id_event' />
            <SelectInput
                source='status'
                choices={[
                    { id: 'draft', name: 'Draft' },
                    { id: 'published', name: 'Published' },
                    { id: 'cancelled', name: 'Draft' },
                ]}
            />
        </SimpleForm>
    </Edit>
);
