import { JSX } from "react";
import {
  Datagrid,
  DateField,
  List,
  SearchInput,
  SimpleList,
  TextField,
  TextInput,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const userFilters: JSX.Element[] = [
  <SearchInput label={"Search"} source={"q"} alwaysOn={true} />,
  <TextInput source={"role"} alwaysOn={true} />,
];

const UserList = (): JSX.Element => {
  const isSmall: boolean = useMediaQuery((theme) =>
    theme.breakpoints.down("sm"),
  );
  return (
    <List filters={userFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.role}
          tertiaryText={(record) =>
            new Date(record.account_creation_date).toLocaleDateString()
          }
          rowClick={(_id, _resource, record) =>
            record.canEdit ? "edit" : "show"
          }
        />
      ) : (
        <Datagrid>
          <TextField source={"name"} label={"Username"} />
          <TextField source={"email"} label={"Email"} />
          <DateField source={"account_creation_date"} label={"Member Since"} />
          <TextField source={"role"} label={"Role"} />
        </Datagrid>
      )}
    </List>
  );
};

export default UserList;
