import { List, Datagrid, EmailField, TextField, ListProps } from 'react-admin';

export function ToDoList(props: ListProps) {
    return (
        <List title="All users" {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="completed" />
                <EmailField source="userId" />
            </Datagrid>
        </List>
    );
};
