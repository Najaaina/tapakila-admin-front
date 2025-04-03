import { Admin, EditGuesser, LoginWithEmail, radiantDarkTheme, radiantLightTheme, Resource } from 'react-admin';
import { JSX } from 'react';
import UserShow from './operations/user/UserShow.tsx';
import UserList from './operations/user/UserList.tsx';
import authProvider from './security/authProvider.ts';
import EventList from './operations/event/EventList.tsx';
import { dataProvider } from './providers/dataProvider.ts';
import { EventShow } from './operations/event/EventShow.tsx';

export default function App(): JSX.Element {
    return (
        <Admin authProvider={authProvider} loginPage={LoginWithEmail} dataProvider={dataProvider} theme={radiantLightTheme} darkTheme={radiantDarkTheme}>
            <Resource name={'accounts'} list={UserList} show={UserShow} />
            <Resource name={'events'} list={EventList} show={EventShow} edit={EditGuesser} />
            {/*
            <Resource name={'ticket'} list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
*/}
        </Admin>
    );
}
