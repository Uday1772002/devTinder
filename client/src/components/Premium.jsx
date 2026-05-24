import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      {
        withCredentials: true,
      },
    );

    const { amount, currency, keyId, notes, orderId } = order.data;
    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount, // Amount is in currency subunits.
      currency,
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: orderId, // This is the order_id created in the backend
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.email,
        contact: 9999999999,
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
      {/* Silver */}
      <div className="flex flex-col gap-4 rounded-xl p-6 border border-gray-200 bg-white">
        <div>
          <h3 className="text-xl font-semibold">Silver</h3>
          <p className="text-sm text-gray-500 mt-1">
            A solid start for individuals exploring the basics.
          </p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-medium">₹499</span>
          <span className="text-sm text-gray-400">/ month</span>
        </div>
        <hr className="border-gray-100" />
        <ul className="flex flex-col gap-2 flex-1 text-sm text-gray-500">
          <li>✓ 5 projects</li>
          <li>✓ 10 GB storage</li>
          <li>✓ Email support</li>
          <li>✓ Basic analytics</li>
        </ul>
        <button
          onClick={() => handleBuyClick("silver")}
          className="mt-auto w-full py-2.5 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition"
        >
          Select Silver
        </button>
      </div>

      {/* Gold */}
      <div className="flex flex-col gap-4 rounded-xl p-6 border-2 border-blue-500 bg-white">
        <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-md w-fit">
          Most popular
        </span>
        <div>
          <h3 className="text-xl font-semibold">Gold</h3>
          <p className="text-sm text-gray-500 mt-1">
            For professionals who need more power and support.
          </p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-medium">₹999</span>
          <span className="text-sm text-gray-400">/ month</span>
        </div>
        <hr className="border-gray-100" />
        <ul className="flex flex-col gap-2 flex-1 text-sm text-gray-500">
          <li>✓ 25 projects</li>
          <li>✓ 50 GB storage</li>
          <li>✓ Priority email & chat</li>
          <li>✓ Advanced analytics</li>
          <li>✓ Custom integrations</li>
        </ul>
        <button
          onClick={() => handleBuyClick("gold")}
          className="mt-auto w-full py-2.5 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition"
        >
          Select Gold
        </button>
      </div>

      {/* Platinum */}
      <div className="flex flex-col gap-4 rounded-xl p-6 border border-gray-200 bg-white">
        <div>
          <h3 className="text-xl font-semibold">Platinum</h3>
          <p className="text-sm text-gray-500 mt-1">
            Full access for teams that demand the very best.
          </p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-medium">₹1,999</span>
          <span className="text-sm text-gray-400">/ month</span>
        </div>
        <hr className="border-gray-100" />
        <ul className="flex flex-col gap-2 flex-1 text-sm text-gray-500">
          <li>✓ Unlimited projects</li>
          <li>✓ 500 GB storage</li>
          <li>✓ 24/7 dedicated support</li>
          <li>✓ Full analytics suite</li>
          <li>✓ Custom integrations</li>
          <li>✓ SLA guarantee</li>
        </ul>
        <button
          onClick={() => handleBuyClick("platinum")}
          className="mt-auto w-full py-2.5 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition"
        >
          Select Platinum
        </button>
      </div>
    </div>
  );
};

export default Premium;
