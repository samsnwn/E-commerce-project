import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Text, Button, Grid, Link } from '@nextui-org/react';


const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.data.isAdmin ? (
    <>
      {" "}
      <Container className="flex justify-center">
        <Button.Group size="md">
          <Button bordered as="a"  href="/admin/user-list" >
            Users
          </Button>
          <Button bordered as="a" href="/admin/product-list">
            Products
          </Button>
          <Button bordered as="a" href="/admin/order-list">
            Orders
          </Button>
        </Button.Group>
      </Container>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminRoute;
