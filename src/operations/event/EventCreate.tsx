import { Create, DateTimeInput, ImageField, ImageInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin';

const EventCreate = () => (
    <Create title='Create a new Event'>
        <SimpleForm>
            <ImageInput source='image' label='Image'>
                <ImageField source='src' title='title' />
            </ImageInput>

            <TextInput source='title' label='Title' validate={[required()]} />
            <TextInput source='description' label='Description' multiline />
            <TextInput source={'organizer'} />
            <DateTimeInput source='event_date' label='Date' />
            <TextInput source='location' label='Location' />
            <SelectInput
                source='category'
                label='Category'
                choices={[
                    { id: 'sport', name: 'Sport' },
                    { id: 'conference', name: 'Conference' },
                    { id: 'exposition', name: 'Exposition' },
                    { id: 'concert', name: 'Concert' },
                    { id: 'theatre', name: 'Theatre' },
                    { id: 'cinema', name: 'Cinema' },
                    { id: 'other', name: 'Other' },
                ]}
            />
        </SimpleForm>
    </Create>
);

export default EventCreate;
