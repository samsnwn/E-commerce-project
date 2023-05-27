import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../redux/ordersApiSlice";
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";
import OrderSummary from "../components/OrderSummary";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message />
  ) : (
    <>
      <h1>Order: {order._id}</h1>
      <div className="flex justify-around">
        <div>
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong>
              {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>
              {order.user.email}
            </p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode} {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message>Delivered on {order.deliveredAt}</Message>
            ) : (
              <Message>Not delivered</Message>
            )}
          </div>
          <div>
            <h2>Payment method:</h2>
            <p>
              {" "}
              <strong>Method:</strong>
            </p>
            {order.paymentMethod}
            {order.isPaid ? (
              <Message>Paid on {order.paidAt}</Message>
            ) : (
              <Message>Not Paid</Message>
            )}
          </div>
          <div>
            <h2>Order Items:</h2>
            {order.orderItems.map((item, index) => (
              <div key={index}>
                <div>
                  <div>
                    <Link to={`/product/${item.product}`}> {item.title}</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <OrderSummary/>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
