import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../../redux/ordersApiSlice";
import Loader from "../../components/UI/Loader";
import Message from "../../components/UI/Message";
import OrderSummary from "../../components/OrderSummary";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": payload.clientId,
            currency: "EUR",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  const onApproveTest = async() => {
    await payOrder({orderId, details: {payer: {}}})
    refetch()
    toast.success("test payment successful")
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice
          }
        }
      ]
    }).then((orderId) => {
      return orderId
    })
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async(details) => {
      try {
        await payOrder({orderId, details})
        refetch()
        toast.success("payment successful")
      } catch(error) {
        toast.error(error?.data?.message || error.message)
      }
    })
  };
  const onError = (err) => {
    toast.error( err.message)
  };

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
        <div className="bg-white h-50 w-1/2 border">
          <div>
            {!order.isPaid && (
              <div>
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <div>
                    {/* <button onClick={onApproveTest}>Test pay order</button> */}
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
