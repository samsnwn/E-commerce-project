import ExpressError from "../utils/ExpressError.js";
import asyncHandler from "express-async-handler";
import generateAccessToken from "../utils/paypal.js";
import { post } from "axios";

const environment = process.env.ENVIRONMENT || "sandbox";
const endpoint_url =
  environment === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";


async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

export async function createPayPalOrderController(req, res) {
  const {cart} = req.body

  // use the cart information passed from the front-end to calculate the purchase unit details
  
  const accessToken = await generateAccessToken();
  const url = `${endpoint_url}/v2/checkout/orders`;
  const order = {
    intent: "CAPTURE",
    purchase_units: [ // make dynamic with req.map and iterate the array
      {
        amount: {
          currency_code: "EUR",
          value: "100.00",
        },
      },
    ],
    application_context: {
      brand_name: "Oldies but Goodies DE",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: `http://localhost:5000/capture-order`,
      cancel_url:`http://localhost:5000/cancel-order`
    }

  };

  const response = await post(url,order, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // "PayPal-Request-Id": generate_random_uuid()
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    }
  });
  // return handleResponse(response)
  res.send(response.data)
  console.log(response)
}


/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
export async function captureOrder(orderID) {
  const accessToken = await generateAccessToken();
  const url = `${endpoint_url}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });
  return handleResponse(response);
  // res.send("capture order")
}

export function capturePayPalOrderController(req, res) {
  res.send("capture order")
  
}

export function cancelPayPalOrderController(req, res) {

}


export function completePayPalOrderController(req, res) {
  generateAccessToken().then(access_token => {
    fetch(`${endpoint_url}/v2/checkout/orders/${req.body.orderId}/${req.body.intent}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      }
    }).then(res => res.json()).then(json => res.send(json))
  }).catch(err => res.status(500).send(err))
}


