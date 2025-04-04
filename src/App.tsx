import { Admin, EditGuesser, radiantDarkTheme, radiantLightTheme, Resource } from 'react-admin';
import { JSX } from 'react';
import UserShow from './operations/user/UserShow.tsx';
import UserList from './operations/user/UserList.tsx';
import authProvider from './security/authProvider.ts';
import EventList from './operations/event/EventList.tsx';
import { dataProvider } from './providers/dataProvider.ts';
import { EventShow } from './operations/event/EventShow.tsx';
import UserIcon from '@mui/icons-material/Group';
import { TapakilaLoginPage } from './components/TapakilaLoginPage.tsx';
import EventCreate from './operations/event/EventCreate.tsx';

export default function App(): JSX.Element {
    return (
        <Admin
            authProvider={authProvider}
            loginPage={TapakilaLoginPage}
            dataProvider={dataProvider}
            lightTheme={radiantLightTheme}
            darkTheme={radiantDarkTheme}
        >
            <Resource name={'accounts'} list={UserList} show={UserShow} icon={UserIcon} />
            <Resource name={'events'} list={EventList} show={EventShow} edit={EditGuesser} create={EventCreate} />
            {/*
            <Resource name={'ticket'} list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
*/}
        </Admin>
    );
}
