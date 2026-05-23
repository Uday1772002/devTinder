import { useNavigate } from "react-router-dom";
import { Check, Star, Zap, Heart } from "lucide-react";

export default function Premium() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Star,
      title: "Unlimited Likes",
      description: "Like as many profiles as you want",
    },
    {
      icon: Zap,
      title: "Priority Messaging",
      description: "Your messages appear first in inboxes",
    },
    {
      icon: Heart,
      title: "See Who Liked You",
      description: "Know who's interested before you decide",
    },
    {
      icon: Check,
      title: "Advanced Filters",
      description: "Filter by interests, location, and more",
    },
  ];

  const handleUpgrade = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-amber-500" fill="currentColor" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Premium
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock premium features and connect with more people
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <IconComponent className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-8 sm:px-8">
            <div className="text-center">
              <p className="text-white/90 text-sm font-medium mb-2">
                Special Launch Offer
              </p>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold text-white">₹499</span>
                <span className="text-white/80 line-through">₹999</span>
              </div>
              <p className="text-white/90 text-sm">per month, cancel anytime</p>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8">
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature.title}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Upgrade Now
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              No commitments. Cancel anytime from your account settings.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Common Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes! Cancel from your account settings with just one click. No questions asked.",
              },
              {
                q: "Is my payment secure?",
                a: "Absolutely. We use industry-standard encryption and trusted payment processors.",
              },
              {
                q: "What if I'm not satisfied?",
                a: "Contact our support team within 7 days for a full refund.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-100"
              >
                <p className="font-semibold text-gray-900 mb-2">{faq.q}</p>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
