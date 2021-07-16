import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import  PlanScreen from './PlanScreen'
import { db } from "../../firebase";


const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
          });
        });
      });
  }, [user.uid]);
  console.log()
  return (
    <>
      <div className="profileScreen">
        <Navbar />
        <div className="profileScreen__body">
          <h1>Edit Profile</h1>
          <div className="profileScreen__info">
            <img
              src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
              alt="" 
            />      
            <div className="profileScreen__details">
              <h2>{user.email}</h2>                               
              <div className="profileScreen__plans">
                <h3>Plan (Current {subscription && (subscription.role)})</h3>
                <PlanScreen />
              <button
                className="profileScreen__signOut"
                onClick={() => auth.signOut()}
              >
                Sign Out
              </button>
            </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
