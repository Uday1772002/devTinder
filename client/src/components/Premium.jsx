import React, { useState } from "react";

const plans = [
  {
    id: "silver",
    name: "Silver",
    badge: null,
    price: { monthly: 9, quarterly: 24 },
    color: "from-slate-400 to-slate-600",
    borderColor: "border-slate-400",
    btnClass:
      "btn-outline border-slate-400 text-slate-300 hover:bg-slate-500 hover:border-slate-500",
    icon: "🥈",
    features: [
      { text: "100 Connection Requests / day", included: true },
      { text: "Blue Tick Verified Badge", included: true },
      { text: "See who viewed your profile", included: true },
      { text: "Advanced Filters & Search", included: true },
      { text: "Priority in Feed", included: false },
      { text: "AI-powered Match Suggestions", included: false },
      { text: "Unlimited Super Likes", included: false },
      { text: "Dedicated Support", included: false },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    badge: "Most Popular",
    price: { monthly: 19, quarterly: 49 },
    color: "from-yellow-400 to-amber-600",
    borderColor: "border-yellow-400",
    btnClass: "btn-warning text-black font-bold shadow-lg shadow-yellow-500/30",
    icon: "👑",
    features: [
      { text: "Unlimited Connection Requests", included: true },
      { text: "Blue Tick Verified Badge", included: true },
      { text: "See who viewed your profile", included: true },
      { text: "Advanced Filters & Search", included: true },
      { text: "Priority in Feed", included: true },
      { text: "AI-powered Match Suggestions", included: true },
      { text: "Unlimited Super Likes", included: false },
      { text: "Dedicated Support", included: false },
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    badge: "Best Value",
    price: { monthly: 29, quarterly: 69 },
    color: "from-violet-500 to-purple-700",
    borderColor: "border-violet-500",
    btnClass: "btn-primary shadow-lg shadow-violet-500/30",
    icon: "💎",
    features: [
      { text: "Unlimited Connection Requests", included: true },
      { text: "Blue Tick Verified Badge", included: true },
      { text: "See who viewed your profile", included: true },
      { text: "Advanced Filters & Search", included: true },
      { text: "Priority in Feed", included: true },
      { text: "AI-powered Match Suggestions", included: true },
      { text: "Unlimited Super Likes", included: true },
      { text: "Dedicated Support", included: true },
    ],
  },
];

const Premium = () => {
  const [billing, setBilling] = useState("monthly");

  return (
    <div className="min-h-screen bg-base-200 py-16 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="badge badge-warning badge-lg mb-4 px-4 py-3 font-semibold tracking-wide uppercase text-xs">
          ✨ Upgrade Your Experience
        </div>
        <h1 className="text-5xl font-extrabold text-base-content mb-4 leading-tight">
          Find Your Perfect{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
            Match Faster
          </span>
        </h1>
        <p className="text-base-content/60 text-lg max-w-xl mx-auto">
          Unlock premium features and connect with more developers around the
          world. Cancel anytime.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span
            className={`text-sm font-medium ${billing === "monthly" ? "text-base-content" : "text-base-content/40"}`}
          >
            Monthly
          </span>
          <input
            type="checkbox"
            className="toggle toggle-warning"
            checked={billing === "quarterly"}
            onChange={() =>
              setBilling((b) => (b === "monthly" ? "quarterly" : "monthly"))
            }
          />
          <span
            className={`text-sm font-medium flex items-center gap-2 ${billing === "quarterly" ? "text-base-content" : "text-base-content/40"}`}
          >
            Quarterly
            <span className="badge badge-success badge-sm font-bold">
              Save 30%
            </span>
          </span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-3xl border-2 ${plan.borderColor} bg-base-100 shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden`}
          >
            {/* Popular Badge */}
            {plan.badge && (
              <div
                className={`absolute top-4 right-4 badge ${plan.id === "gold" ? "badge-warning" : "badge-primary"} font-bold text-xs px-3 py-3`}
              >
                {plan.badge}
              </div>
            )}

            {/* Gradient Header */}
            <div
              className={`bg-gradient-to-br ${plan.color} p-8 flex flex-col items-center`}
            >
              <span className="text-5xl mb-3">{plan.icon}</span>
              <h2 className="text-2xl font-extrabold text-white tracking-wide">
                {plan.name}
              </h2>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-5xl font-black text-white">
                  ${plan.price[billing]}
                </span>
                <span className="text-white/70 mb-2 text-sm">
                  /{billing === "monthly" ? "mo" : "3 mo"}
                </span>
              </div>
              {billing === "quarterly" && (
                <p className="text-white/70 text-xs mt-1">
                  ${(plan.price.quarterly / 3).toFixed(2)}/month billed
                  quarterly
                </p>
              )}
            </div>

            {/* Features */}
            <div className="flex flex-col flex-1 p-8">
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <span className="text-success text-lg font-bold shrink-0">
                        ✓
                      </span>
                    ) : (
                      <span className="text-base-content/25 text-lg shrink-0">
                        ✕
                      </span>
                    )}
                    <span
                      className={`text-sm ${feature.included ? "text-base-content" : "text-base-content/30"}`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn w-full mt-8 rounded-xl text-sm ${plan.btnClass}`}
              >
                Get {plan.name}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Bar */}
      <div className="mt-16 max-w-3xl mx-auto">
        <div className="divider text-base-content/30 text-sm">
          Trusted by 50,000+ developers worldwide
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-6">
          {[
            { icon: "🔒", label: "Secure Payments" },
            { icon: "🔄", label: "Cancel Anytime" },
            { icon: "⚡", label: "Instant Activation" },
            { icon: "🎯", label: "10x More Matches" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="text-xs text-base-content/50 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Premium;
