// import React, {useContext, useEffect, useState} from "react";
// import Banner from "../Banner/Banner";
// import SortedSix from "../SortedSix/SortedSix";
// import OfferSection from "../OfferSection/OfferSection";
// import NewsSection from "../NewsSection/NewsSection";
// import NewsletterSection from "../NewsletterSection/NewsletterSection";
// import Loader from "../../../Loader/Loader";
// import {AuthContext} from "../../../ContextFiles/AuthContext";
// const Home = () => {
//   const [loading2, setLoading2] = useState(true);

//   const {loading} = useContext(AuthContext);

//   useEffect(() => {
//     window.scrollTo({top: 0, behavior: "smooth"});
//   }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading2(false);
//     }, 300);
//   }, []);

//   if (loading) {
//     return <Loader></Loader>;
//   }

//   return (
//     <div>
//       <Banner></Banner>
//       <SortedSix></SortedSix>
//       <OfferSection></OfferSection>
//       <NewsSection></NewsSection>
//       <NewsletterSection></NewsletterSection>
//     </div>
//   );
// };

// export default Home;
import React, { useContext, useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import SortedSix from "../SortedSix/SortedSix";
import OfferSection from "../OfferSection/OfferSection";
import NewsSection from "../NewsSection/NewsSection";
import NewsletterSection from "../NewsletterSection/NewsletterSection";
import Loader from "../../../Loader/Loader";
import { AuthContext } from "../../../ContextFiles/AuthContext";

const Home = () => {
  const [loading2, setLoading2] = useState(true);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading2(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (loading || loading2) {
    return <Loader />;
  }

  return (
    <div>
      <Banner />
      <SortedSix />
      <OfferSection />
      <NewsSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;