import { JSX } from "react";
import { Show, SimpleShowLayout, TextField } from "react-admin";

const UserShow = (): JSX.Element => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source={"name"} label={"Username"} />
        <TextField source={"email"} label={"Email"} />
        <TextField source={"account_creation_date"} label={"Member since"} />
        <TextField source={"role"} label={"Role"} />
      </SimpleShowLayout>
    </Show>
  );
};

export default UserShow;
