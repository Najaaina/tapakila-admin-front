import { DateTimeInput, Edit, ImageField, ImageInput, required, SimpleForm, TextInput } from 'react-admin';

export const EventEdit = () => (
    <Edit>
        <SimpleForm>
            <ImageInput source='image' label='Image'>
                <ImageField source='src' title='title' />
            </ImageInput>

            <TextInput source='title' label='Title' validate={[required()]} />
            <TextInput source='description' label='Description' multiline />
            <TextInput source={'organizer'} />
            <DateTimeInput source='event_date' label='Date' />
            <TextInput source='location' label='Location' />
        </SimpleForm>
    </Edit>
);
