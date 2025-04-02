import { Admin, EditGuesser, ListGuesser, LoginWithEmail, Resource, ShowGuesser } from 'react-admin';
import { JSX } from 'react';
import UserShow from './operations/user/UserShow.tsx';
import UserList from './operations/user/UserList.tsx';
import authProvider from './security/authProvider.ts';

export default function App(): JSX.Element {
    return (
        <Admin authProvider={authProvider} loginPage={LoginWithEmail}>
            <Resource name={'users'} list={UserList} show={UserShow} />
            <Resource name={'events'} list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
            <Resource name={'ticket'} list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
        </Admin>
    );
}
