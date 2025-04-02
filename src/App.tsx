import { Admin, Resource } from "react-admin";
import { JSX } from "react";
import UserShow from "./operations/user/UserShow.tsx";
import UserList from "./operations/user/UserList.tsx";

export default function App(): JSX.Element {
  return (
    <Admin>
      <Resource name={"users"} list={UserList} show={UserShow} />
    </Admin>
  );
}
