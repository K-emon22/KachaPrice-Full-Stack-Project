import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import React from "react";
import {useParams} from "react-router";
import PaymentForm from "./PaymentForm";

const ProductPayment = () => {
  const {id} = useParams();
  console.log(id);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm productId={id}></PaymentForm>
    </Elements>
  );
};

export default ProductPayment;
