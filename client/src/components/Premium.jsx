import { useState } from "react";

export default function Premium() {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "9",
      description: "Perfect for getting started",
      features: [
        "50 likes per day",
        "View 10 profiles per day",
        "Basic matching",
        "Standard support",
      ],
      color: "primary",
    },
    {
      id: "pro",
      name: "Pro",
      price: "19",
      description: "Most popular plan",
      features: [
        "Unlimited likes",
        "Unlimited profile views",
        "Advanced matching",
        "Priority support",
        "See who liked you",
        "Message read receipts",
      ],
      color: "secondary",
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "29",
      description: "Maximum features",
      features: [
        "Everything in Pro",
        "Verified badge",
        "Ad-free experience",
        "Premium profile boost",
        "Monthly super likes (10)",
        "24/7 VIP support",
        "Advanced filters",
      ],
      color: "accent",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100">
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-3">
          Unlock Premium Features
        </h1>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Find meaningful connections with our premium plans. Choose the perfect
          plan for you.
        </p>
      </div>

      {/* Plans Container */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card transition-all duration-300 ${
                selectedPlan === plan.id
                  ? "ring-2 ring-offset-2 ring-primary"
                  : ""
              } ${plan.popular ? "md:scale-105 shadow-2xl" : "shadow-lg"}`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-primary to-secondary text-primary-content px-4 py-2 text-center font-semibold text-sm">
                  Most Popular
                </div>
              )}

              <div className="card-body">
                {/* Plan Header */}
                <h2 className="card-title text-2xl font-bold text-base-content">
                  {plan.name}
                </h2>
                <p className="text-base-content/60 text-sm">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="my-4">
                  <span className="text-5xl font-bold text-base-content">
                    ${plan.price}
                  </span>
                  <span className="text-base-content/60 ml-2">/month</span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`btn w-full mb-6 ${
                    plan.popular ? "btn-primary" : "btn-outline btn-primary"
                  }`}
                >
                  {selectedPlan === plan.id ? "Current Plan" : "Choose Plan"}
                </button>

                {/* Divider */}
                <div className="divider my-2"></div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-base-content/80 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <h3 className="text-2xl font-bold text-center mb-8 text-base-content">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes! You can cancel your subscription at any time with no questions asked.",
            },
            {
              q: "Is there a free trial?",
              a: "We offer a 7-day free trial for all premium plans. No credit card required.",
            },
            {
              q: "Do you offer refunds?",
              a: "We offer a 30-day money-back guarantee if you're not satisfied.",
            },
            {
              q: "Can I upgrade my plan?",
              a: "Of course! You can upgrade or downgrade your plan at any time.",
            },
          ].map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-base-200">
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />
              <div className="collapse-title font-semibold text-base-content">
                {faq.q}
              </div>
              <div className="collapse-content text-base-content/80">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-primary text-primary-content py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to connect?</h2>
          <p className="mb-6 opacity-90">
            Join thousands of users who found meaningful connections
          </p>
          <button className="btn btn-ghost btn-lg text-primary-content hover:bg-white hover:text-primary">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}
