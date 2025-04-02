import { JSX } from 'react';
import { Datagrid, DateField, Identifier, List, SimpleList, TextField } from 'react-admin';
import { Theme, useMediaQuery } from '@mui/material';

const EventList = (): JSX.Element => {
    const isSmall: boolean = useMediaQuery((theme: Theme): string => theme.breakpoints.down('sm'));

    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record): string => record.title}
                    secondaryText={(record): string => record.status}
                    tertiaryText={(record): string => new Date(record.event_date).toLocaleDateString()}
                    rowClick={(_id: Identifier, _resource: string, record): 'edit' | 'show' => (record.canEdit ? 'edit' : 'show')}
                />
            ) : (
                <Datagrid>
                    <TextField source={'title'} label={'Title'} />
                    <DateField source={'event_date'} label={'Date'} />
                    <TextField source={'location'} label={'Location'} />
                    <TextField source={'category'} label={'Category'} />
                    <TextField source={'status'} label={'Status'} />
                </Datagrid>
            )}
        </List>
    );
};

export default EventList;
