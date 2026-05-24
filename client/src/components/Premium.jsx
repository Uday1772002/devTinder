import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true },
    );
    const { amount, currency, keyId, notes, orderId } = order.data;
    const options = {
      key: keyId,
      amount,
      currency,
      name: "devTinder",
      description: "Premium Membership",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.email,
        contact: 9999999999,
      },
      theme: { color: "#F37254" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4 py-16">
      <p className="text-xs font-medium tracking-widest uppercase text-base-content/40 mb-8">
        Choose your plan
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl">
        {/* Silver */}
        <div className="flex flex-col gap-5 rounded-2xl p-6 border border-base-content/10 bg-base-100">
          <div>
            <div className="text-2xl mb-2">🥈</div>
            <h3 className="text-lg font-semibold text-base-content">Silver</h3>
            <p className="text-sm text-base-content/50 mt-1 leading-relaxed">
              A solid start for individuals exploring the basics.
            </p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-base-content">
              ₹499
            </span>
            <span className="text-sm text-base-content/40">/ month</span>
          </div>
          <hr className="border-base-content/10" />
          <ul className="flex flex-col gap-2.5 flex-1 text-sm text-base-content/60">
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> 5 projects
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> 10 GB storage
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> Email support
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> Basic analytics
            </li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="mt-auto w-full py-3 rounded-xl text-sm font-medium border border-base-content/20 text-base-content hover:bg-base-content/5 transition-all"
          >
            Select Silver
          </button>
        </div>

        {/* Gold — featured */}
        <div className="flex flex-col gap-5 rounded-2xl p-6 border-2 border-info bg-base-100 relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1 rounded-full bg-info text-info-content whitespace-nowrap">
            ⚡ Most popular
          </span>
          <div className="mt-3">
            <div className="text-2xl mb-2">🥇</div>
            <h3 className="text-lg font-semibold text-base-content">Gold</h3>
            <p className="text-sm text-base-content/50 mt-1 leading-relaxed">
              For professionals who need more power and support.
            </p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-base-content">
              ₹999
            </span>
            <span className="text-sm text-base-content/40">/ month</span>
          </div>
          <hr className="border-base-content/10" />
          <ul className="flex flex-col gap-2.5 flex-1 text-sm text-base-content/60">
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> 25 projects
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> 50 GB storage
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> Priority email & chat
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> Advanced analytics
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> Custom integrations
            </li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="mt-auto w-full py-3 rounded-xl text-sm font-medium bg-base-content text-base-100 hover:opacity-85 transition-all"
          >
            Select Gold
          </button>
        </div>

        {/* Platinum */}
        <div className="flex flex-col gap-5 rounded-2xl p-6 border border-base-content/10 bg-base-100">
          <div>
            <div className="text-2xl mb-2">💎</div>
            <h3 className="text-lg font-semibold text-base-content">
              Platinum
            </h3>
            <p className="text-sm text-base-content/50 mt-1 leading-relaxed">
              Full access for teams that demand the very best.
            </p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-base-content">
              ₹1,999
            </span>
            <span className="text-sm text-base-content/40">/ month</span>
          </div>
          <hr className="border-base-content/10" />
          <ul className="flex flex-col gap-2.5 flex-1 text-sm text-base-content/60">
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> Unlimited projects
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> 500 GB storage
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> 24/7 dedicated support
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> Full analytics suite
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> Custom integrations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span> SLA guarantee
            </li>
          </ul>
          <button
            onClick={() => handleBuyClick("platinum")}
            className="mt-auto w-full py-3 rounded-xl text-sm font-medium border border-base-content/20 text-base-content hover:bg-base-content/5 transition-all"
          >
            Select Platinum
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
