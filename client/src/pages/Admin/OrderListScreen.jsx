import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from "@nextui-org/react";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/UI/Message";
import Loader from "../../components/UI/Loader";
import { useGetOrdersQuery } from "../../redux/ordersApiSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          aria-label="Example table with static content"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>ID</Table.Column>
            <Table.Column>USER</Table.Column>
            <Table.Column>DATE</Table.Column>
            <Table.Column>TOTAL</Table.Column>
            <Table.Column>PAID</Table.Column>
            <Table.Column>DELIVERED</Table.Column>
            <Table.Column></Table.Column>
          </Table.Header>
          <Table.Body>
            {orders &&
              orders.map((order) => (
                <Table.Row key={order._id} className="hover: bg-slate-300">
                  <Table.Cell>{order._id}</Table.Cell>
                  <Table.Cell>{order.user && order.user.name}</Table.Cell>
                  <Table.Cell>{order.createdAt.substring(0, 10)}</Table.Cell>
                  <Table.Cell>{order.totalPrice}</Table.Cell>
                  <Table.Cell>
                    {" "}
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {" "}
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
