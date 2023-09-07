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
          <Button bordered>
          <Link href="/admin/user-list">Users</Link>

          </Button>
          <Button bordered>
          <Link href="/admin/product-list">Products</Link>
          </Button>
          <Button bordered>
            <Link href="/admin/order-list">Orders</Link>
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
