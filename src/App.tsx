import {Admin, ListGuesser, Resource} from "react-admin";



const App = () => (
    <Admin>
        <Resource name="events" list={ListGuesser} />
        <Resource name="comments" list={ListGuesser} />
    </Admin>
);

export default App;