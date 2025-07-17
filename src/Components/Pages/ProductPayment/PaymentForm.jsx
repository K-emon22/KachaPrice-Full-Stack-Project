// import React, {useState, useContext, useEffect} from "react";
// import {
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import {toast} from "react-toastify";
// import {AuthContext} from "../../ContextFiles/AuthContext";
// import axios from "axios";

// import {motion} from "framer-motion";
// import Loader from "../../Loader/Loader";

// const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       fontSize: "16px",
//       color: "#1a202c",
//       "::placeholder": {
//         color: "#a0aec0",
//       },
//       fontFamily: "Inter, sans-serif",
//     },
//     invalid: {
//       color: "#e53e3e",
//     },
//   },
// };

// const fadeUp = {
//   hidden: {opacity: 0, y: 20},
//   visible: {opacity: 1, y: 0, transition: {duration: 1.2, ease: "easeOut"}},
// };

// const PaymentForm = ({productId}) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const {accessToken, user} = useContext(AuthContext);
//   const [processing, setProcessing] = useState(false);
//   const [cardErrors, setCardErrors] = useState({
//     number: "",
//     expiry: "",
//     cvc: "",
//   });
//   const [cardComplete, setCardComplete] = useState({
//     number: false,
//     expiry: false,
//     cvc: false,
//   });
//   const [clientSecret, setClientSecret] = useState("");
//   const [paymentSucceeded, setPaymentSucceeded] = useState(false);

//   const [price, setPrice] = useState(null);
//   const [productName, setProductName] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!productId || !accessToken) return;

//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `http://localhost:3000/product/${productId}`,
//           {
//             headers: {Authorization: `Bearer ${accessToken}`},
//           }
//         );
//         setPrice(res.data.price);
//         setProductName(res.data.name);
//       } catch {
//         toast.error("Failed to fetch product info");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId, accessToken]);

//   useEffect(() => {
//     if (!price) return;

//     const createPaymentIntent = async () => {
//       try {
//         const res = await axios.post(
//           `http://localhost:3000/create-payment-intent`,
//           {price}
//         );
//         setClientSecret(res.data.clientSecret);
//       } catch {
//         toast.error("Failed to initialize payment");
//       }
//     };

//     createPaymentIntent();
//   }, [price]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !stripe ||
//       !elements ||
//       !cardComplete.number ||
//       !cardComplete.expiry ||
//       !cardComplete.cvc ||
//       cardErrors.number ||
//       cardErrors.expiry ||
//       cardErrors.cvc ||
//       !clientSecret
//     ) {
//       toast.error("Please fill valid card info");
//       return;
//     }

//     setProcessing(true);

//     try {
//       const {paymentIntent, error} = await stripe.confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: {
//             card: elements.getElement(CardNumberElement),
//             billing_details: {
//               name: user?.displayName,
//               email: user?.email,
//             },
//           },
//         }
//       );

//       if (error) {
//         toast.error(error.message);
//       } else if (paymentIntent.status === "succeeded") {
//         toast.success("Payment successful!");
//         setPaymentSucceeded(true);
//         elements.getElement(CardNumberElement).clear();
//         elements.getElement(CardExpiryElement).clear();
//         elements.getElement(CardCvcElement).clear();
//       }
//     } catch (err) {
//       toast.error("Payment failed: " + err.message);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleCardInputChange = (field) => (event) => {
//     setCardErrors((prev) => ({
//       ...prev,
//       [field]: event.error ? event.error.message : "",
//     }));
//     setCardComplete((prev) => ({...prev, [field]: event.complete}));
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="px-[2%] lg:px-[5%] py-10 flex flex-col justify-center bg-white">
//       <motion.h1
//         className="text-3xl sm:text-5xl font-bold text-center text-green-600 mb-6"
//         variants={fadeUp}
//         initial="hidden"
//         animate="visible"
//       >
//         Secure Payment
//       </motion.h1>

//       <motion.form
//         onSubmit={handleSubmit}
//         variants={fadeUp}
//         initial="hidden"
//         animate="visible"
//         className="flex flex-col justify-center items-center bg-green-50 p-6 sm:p-10 rounded-xl shadow-xl w-full md:w-3/4 lg:max-w-2xl mx-auto gap-6"
//       >
//         <h2 className="text-xl font-semibold text-black">
//           Pay <span className="text-green-600">{price ?? "..."}</span>৳
//         </h2>

//         <div className="w-full bg-white border border-green-200 rounded-lg shadow-sm p-5 text-green-900">
//           <p className="text-lg font-bold text-green-700 mb-3">Order Summary</p>
//           <div className="space-y-1 text-sm sm:text-base leading-relaxed">
//             <p>
//               <span className="font-semibold">Product:</span>{" "}
//               <span className="text-green-800">{productName}</span>
//             </p>
//             <p>
//               <span className="font-semibold">Customer:</span>{" "}
//               <span className="text-green-800">{user?.displayName}</span>
//             </p>
//             <p>
//               <span className="font-semibold">Email:</span>{" "}
//               <span className="text-green-800">{user?.email}</span>
//             </p>
//           </div>
//         </div>

//         <div className="w-full">
//           <label className="block mb-1 font-medium text-green-700">
//             Card Number
//           </label>
//           <div className="border-2 border-green-300 p-3 rounded-md bg-white shadow-sm transition">
//             <CardNumberElement
//               options={CARD_ELEMENT_OPTIONS}
//               onChange={handleCardInputChange("number")}
//             />
//           </div>
//           {cardErrors.number && (
//             <p className="text-red-500 text-sm mt-1">{cardErrors.number}</p>
//           )}
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4 w-full">
//           <div className="flex-1">
//             <label className="block mb-1 font-medium text-green-700">
//               Expiry Date
//             </label>
//             <div className="border-2 border-green-300 p-3 rounded-md bg-white shadow-sm">
//               <CardExpiryElement
//                 options={CARD_ELEMENT_OPTIONS}
//                 onChange={handleCardInputChange("expiry")}
//               />
//             </div>
//             {cardErrors.expiry && (
//               <p className="text-red-500 text-sm mt-1">{cardErrors.expiry}</p>
//             )}
//           </div>

//           <div className="flex-1">
//             <label className="block mb-1 font-medium text-green-700">CVC</label>
//             <div className="border-2 border-green-300 p-3 rounded-md bg-white shadow-sm">
//               <CardCvcElement
//                 options={CARD_ELEMENT_OPTIONS}
//                 onChange={handleCardInputChange("cvc")}
//               />
//             </div>
//             {cardErrors.cvc && (
//               <p className="text-red-500 text-sm mt-1">{cardErrors.cvc}</p>
//             )}
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={
//             paymentSucceeded ||
//             !stripe ||
//             !cardComplete.number ||
//             !cardComplete.expiry ||
//             !cardComplete.cvc ||
//             processing ||
//             !!cardErrors.number ||
//             !!cardErrors.expiry ||
//             !!cardErrors.cvc ||
//             !clientSecret
//           }
//           className="btn-primary w-full !rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {paymentSucceeded
//             ? "Paid"
//             : processing
//             ? "Processing..."
//             : "Confirm Payment"}
//         </button>
//       </motion.form>
//     </div>
//   );
// };

// export default PaymentForm;
import React, { useState, useContext, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { AuthContext } from "../../ContextFiles/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "../../Loader/Loader";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1a202c",
      "::placeholder": {
        color: "#a0aec0",
      },
      fontFamily: "Inter, sans-serif",
    },
    invalid: {
      color: "#e53e3e",
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

const PaymentForm = ({ productId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { accessToken, user } = useContext(AuthContext);

  const [processing, setProcessing] = useState(false);
  const [cardErrors, setCardErrors] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });
  const [cardComplete, setCardComplete] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });

  const [clientSecret, setClientSecret] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const [price, setPrice] = useState(null);
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch product info
  useEffect(() => {
    if (!productId || !accessToken) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/product/${productId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setPrice(res.data.price);
        setProductName(res.data.name);
      } catch {
        toast.error("Failed to fetch product info");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, accessToken]);

  // ✅ Create payment intent
  useEffect(() => {
    if (!price || !accessToken) return;

    const createPaymentIntent = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/create-payment-intent`,
          { price },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setClientSecret(res.data.clientSecret);
      } catch {
        toast.error("Failed to initialize payment");
      }
    };

    createPaymentIntent();
  }, [price, accessToken]);

  const handleCardInputChange = (field) => (event) => {
    setCardErrors((prev) => ({
      ...prev,
      [field]: event.error ? event.error.message : "",
    }));
    setCardComplete((prev) => ({ ...prev, [field]: event.complete }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !stripe ||
      !elements ||
      !cardComplete.number ||
      !cardComplete.expiry ||
      !cardComplete.cvc ||
      cardErrors.number ||
      cardErrors.expiry ||
      cardErrors.cvc ||
      !clientSecret
    ) {
      toast.error("Please fill valid card info");
      return;
    }

    setProcessing(true);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        setPaymentSucceeded(true);

        // ✅ Optional: Save payment to backend
        try {
          await axios.post(
            "http://localhost:3000/payments",
            {
              transactionId: paymentIntent.id,
              email: user.email,
              name: user.displayName,
              amount: price,
              productId,
              status: "succeeded",
            },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
        } catch {
          toast.error("Payment saved failed (but payment was successful)");
        }

        // ✅ Clear card fields
        elements.getElement(CardNumberElement).clear();
        elements.getElement(CardExpiryElement).clear();
        elements.getElement(CardCvcElement).clear();
      }
    } catch (err) {
      toast.error("Payment failed: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="px-[2%] lg:px-[5%] py-10 flex flex-col justify-center bg-white">
      <motion.h1
        className="text-3xl sm:text-5xl font-bold text-center text-green-600 mb-6"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        Secure Payment
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center items-center bg-green-50 p-6 sm:p-10 rounded-xl shadow-xl w-full md:w-3/4 lg:max-w-2xl mx-auto gap-6"
      >
        <h2 className="text-xl font-semibold text-black">
          Pay <span className="text-green-600">{price ?? "..."}</span>৳
        </h2>

        <div className="w-full bg-white border border-green-200 rounded-lg shadow-sm p-5 text-green-900">
          <p className="text-lg font-bold text-green-700 mb-3">Order Summary</p>
          <div className="space-y-1 text-sm sm:text-base leading-relaxed">
            <p>
              <span className="font-semibold">Product:</span>{" "}
              <span className="text-green-800">{productName}</span>
            </p>
            <p>
              <span className="font-semibold">Customer:</span>{" "}
              <span className="text-green-800">{user?.displayName}</span>
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <span className="text-green-800">{user?.email}</span>
            </p>
          </div>
        </div>

        <div className="w-full">
          <label className="block mb-1 font-medium text-green-700">
            Card Number
          </label>
          <div className="border-2 border-green-300 p-3 rounded-md bg-white shadow-sm transition">
            <CardNumberElement
              options={CARD_ELEMENT_OPTIONS}
              onChange={handleCardInputChange("number")}
            />
          </div>
          {cardErrors.number && (
            <p className="text-red-500 text-sm mt-1">{cardErrors.number}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-green-700">
              Expiry Date
            </label>
            <div className="border-2 border-green-300 p-3 rounded-md bg-white shadow-sm">
              <CardExpiryElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleCardInputChange("expiry")}
              />
            </div>
            {cardErrors.expiry && (
              <p className="text-red-500 text-sm mt-1">{cardErrors.expiry}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium text-green-700">CVC</label>
            <div className="border-2 border-green-300 p-3 rounded-md bg-white shadow-sm">
              <CardCvcElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleCardInputChange("cvc")}
              />
            </div>
            {cardErrors.cvc && (
              <p className="text-red-500 text-sm mt-1">{cardErrors.cvc}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={
            paymentSucceeded ||
            !stripe ||
            !cardComplete.number ||
            !cardComplete.expiry ||
            !cardComplete.cvc ||
            processing ||
            !!cardErrors.number ||
            !!cardErrors.expiry ||
            !!cardErrors.cvc ||
            !clientSecret
          }
          className="btn-primary w-full !rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {paymentSucceeded
            ? "Paid"
            : processing
            ? "Processing..."
            : "Confirm Payment"}
        </button>
      </motion.form>
    </div>
  );
};

export default PaymentForm;