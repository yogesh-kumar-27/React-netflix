import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
const PlanScreen = () => {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const user = useSelector(selectUser);
 
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start
              .seconds,
          });
        });
      });
  }, [user.uid]);
  
  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        toast.error(`An error occured: ${error.message}`, {
          position:"top-center",
          transition:Zoom,
        });
      }

      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe

        const stripe = await loadStripe(
         "pk_test_51JCRJzSATfjmaH3cSMEtJEbcyjAvfesGWi6YtbEYw3Ir60QC4RYYXAI1uFKbYKAOB9fbdVPTJbk2lWr5Qz8jLEYR00ibPp0kwR"
         

        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  return (
    <>

      <div className="planScreen">
      <br />
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
        {Object.entries(products).map(([productId, productData]) => {
             const isCurrentPackage = productData.name
             ?.toLowerCase()
             .includes(subscription?.role);
          return (
            <div
            key={productId}
            className={`${  
              isCurrentPackage && "plansScreen__plan--disabled"
            } plansScreen__plan`}
          >
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </>
  );
};

export default PlanScreen;
