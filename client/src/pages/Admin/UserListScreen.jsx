import React from "react";
import { useGetUsersQuery } from "../../redux/userApiSlice";
import Message from "../../components/UI/Message";
import Loader from "../../components/UI/Loader";
import { Table } from "@nextui-org/react";

const UserListScreen = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table
            aria-label="Example table with static content"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header>
              <Table.Column>NAME</Table.Column>
              <Table.Column>EMAIL</Table.Column>
              <Table.Column>STATUS</Table.Column>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user._id}>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.active ? <h3>Active</h3> : <h3>Not Active</h3> }</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      )}
    </>
  );
};

export default UserListScreen;
