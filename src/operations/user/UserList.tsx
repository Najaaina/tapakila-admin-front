import { JSX } from 'react';
import { Datagrid, DateField, Identifier, List, SimpleList, TextField } from 'react-admin';
import { Theme, useMediaQuery } from '@mui/material';
/*
const userFilters: JSX.Element[] = [<SearchInput label={'Search'} source={'q'} alwaysOn={true} />, <TextInput source={'role'} alwaysOn={true} />];*/

const UserList = (): JSX.Element => {
    const isSmall: boolean = useMediaQuery((theme: Theme): string => theme.breakpoints.down('sm'));
    return (
        <List /*filters={userFilters}*/>
            {isSmall ? (
                <SimpleList
                    primaryText={(record): string => record.name}
                    secondaryText={(record): string => record.role}
                    tertiaryText={(record): string => new Date(record.account_creation_date).toLocaleDateString()}
                    rowClick={(_id: Identifier, _resource: string, record): 'edit' | 'show' => (record.canEdit ? 'edit' : 'show')}
                />
            ) : (
                <Datagrid>
                    <TextField source={'name'} label={'Username'} />
                    <TextField source={'email'} label={'Email'} />
                    <DateField source={'account_creation_date'} label={'Member Since'} />
                    <TextField source={'role'} label={'Role'} />
                </Datagrid>
            )}
        </List>
    );
};

export default UserList;
