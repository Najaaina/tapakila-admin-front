import { JSX } from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';
import RoleButton from '../../components/RoleButton';
const UserShow = (): JSX.Element => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source={'name'} label={'Username'} />
                <TextField source={'email'} label={'Email'} />
                <TextField source={'account_creation_date'} label={'Member since'} />
                <RoleButton />
            </SimpleShowLayout>
        </Show>
    );
};

export default UserShow;
